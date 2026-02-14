// .vitepress/theme/popout.js
import { createApp } from 'vue'
import GithubPopout from './components/GithubPopout.vue'

(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init)
    } else {
        init()
    }

    let popoutInstance = null
    let hideTimeout = null
    let currentTrigger = null
    let mountPoint = null

    function init() {
        console.log('✅ Popout initializat')
        
        document.querySelectorAll('.github-profile').forEach(trigger => {
            trigger.addEventListener('mouseenter', function(e) {
                handleTriggerEnter(this)
            })
            
            trigger.addEventListener('mouseleave', function() {
                handleTriggerLeave()
            })
        })

        const observer = new MutationObserver(() => {
            document.querySelectorAll('.github-profile').forEach(trigger => {
                if (!trigger.hasListener) {
                    trigger.hasListener = true
                    trigger.addEventListener('mouseenter', function() {
                        handleTriggerEnter(this)
                    })
                    trigger.addEventListener('mouseleave', function() {
                        handleTriggerLeave()
                    })
                }
            })
        })
        
        observer.observe(document.body, { childList: true, subtree: true })
    }

    function handleTriggerEnter(trigger) {
        console.log('🐭 Mouse pe trigger')
        
        if (popoutInstance && currentTrigger !== trigger) {
            destroyPopout()
        }
        
        currentTrigger = trigger
        
        if (hideTimeout) {
            clearTimeout(hideTimeout)
            hideTimeout = null
        }
        
        const username = trigger.getAttribute('data-username') || 
                        trigger.getAttribute('title') ||
                        extractFromHref(trigger)
        
        if (!username) return
        
        // Poți adăuga repository și owner în data-* atribute
        const repoName = trigger.getAttribute('data-repo') || 'wiki-wildfire-inc'
        const repoOwner = trigger.getAttribute('data-owner') || 'ianncxd'
        
        showPopout(trigger, username, repoName, repoOwner)
    }

    function extractFromHref(trigger) {
        const href = trigger.getAttribute('href')
        if (href && href.includes('github.com/')) {
            const match = href.match(/github\.com\/([^\/\?]+)/)
            return match ? match[1] : null
        }
        return null
    }

    function showPopout(trigger, username, repoName, repoOwner) {
        if (popoutInstance) {
            popoutInstance.instance.username = username
            popoutInstance.instance.targetElement = trigger
            popoutInstance.instance.repoName = repoName
            popoutInstance.instance.repoOwner = repoOwner
            popoutInstance.instance.fetchUserData()
            popoutInstance.instance.fetchContributors()
            popoutInstance.instance.show()
            return
        }

        if (!mountPoint) {
            mountPoint = document.createElement('div')
            mountPoint.style.position = 'fixed'
            mountPoint.style.zIndex = '9999'
            mountPoint.style.top = '0'
            mountPoint.style.left = '0'
            mountPoint.style.width = '100%'
            mountPoint.style.height = '100%'
            mountPoint.style.pointerEvents = 'none'
            document.body.appendChild(mountPoint)
        }

        const app = createApp(GithubPopout, {
            username: username,
            targetElement: trigger,
            repoName: repoName,
            repoOwner: repoOwner,
            onPopoutEnter: () => {
                console.log('📦 Mouse pe popout')
                if (hideTimeout) {
                    clearTimeout(hideTimeout)
                    hideTimeout = null
                }
            },
            onPopoutLeave: () => {
                console.log('📦 Mouse a părăsit popout')
                startHideTimer()
            },
            onClose: () => {
                destroyPopout()
            }
        })

        popoutInstance = {
            app,
            instance: app.mount(mountPoint)
        }

        popoutInstance.instance.show()
    }

    function startHideTimer() {
        if (hideTimeout) return
        
        console.log('⏰ Pornesc timer 500ms...')
        hideTimeout = setTimeout(() => {
            console.log('👋 Ascund popout')
            if (popoutInstance) {
                popoutInstance.instance.hide()
                setTimeout(() => {
                    destroyPopout()
                }, 200)
            }
            hideTimeout = null
        }, 500)
    }

    function destroyPopout() {
        if (popoutInstance) {
            popoutInstance.app.unmount()
            popoutInstance = null
            currentTrigger = null
            console.log('🗑️ Popout distrus')
        }
        
        if (hideTimeout) {
            clearTimeout(hideTimeout)
            hideTimeout = null
        }
    }
})()
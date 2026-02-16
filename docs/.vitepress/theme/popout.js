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
        
        showPopout(trigger, username)
    }

    function handleTriggerLeave() {
        startHideTimer()
    }

    function extractFromHref(trigger) {
        const href = trigger.getAttribute('href')
        if (href && href.includes('github.com/')) {
            const match = href.match(/github\.com\/([^\/\?]+)/)
            return match ? match[1] : null
        }
        return null
    }

    function showPopout(trigger, username) {
        if (popoutInstance) {
            popoutInstance.instance.username = username
            popoutInstance.instance.targetElement = trigger
            popoutInstance.instance.fetchUserData()
            popoutInstance.instance.fetchUserContributions()
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
            onPopoutEnter: () => {
                if (hideTimeout) {
                    clearTimeout(hideTimeout)
                    hideTimeout = null
                }
            },
            onPopoutLeave: () => {
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
        
        hideTimeout = setTimeout(() => {
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
        }
        
        if (hideTimeout) {
            clearTimeout(hideTimeout)
            hideTimeout = null
        }
    }
})()
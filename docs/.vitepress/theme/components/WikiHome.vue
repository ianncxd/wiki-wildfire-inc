<template>
  <div v-if="isHomePage" class="wildfire-home orbitron-font">
    <HomeNavbar v-if="isHomePage" />
    
    <img 
      src="/wallpaper/poza102.webp"
      alt=""
      class="wildfire-wallpaper"
      :class="{ 
        'wildfire-wallpaper-hover': isHovered
      }"
      width="1920"
      height="1080"
      fetchpriority="high"
      loading="eager"
      decoding="async"
      role="presentation"
    />
    
    <img 
      src="/wallpaper/da.webp"
      alt=""
      class="wildfire-wallpaper-overlay"
      :class="{ 
        'wildfire-wallpaper-overlay-loaded': isOverlayLoaded && isHovered 
      }"
      width="1920"
      height="1080"
      fetchpriority="low"
      loading="lazy"
      decoding="async"
      role="presentation"
    />
    
    <div class="wildfire-bg">
      <div class="wildfire-gradient"></div>
      <div class="wildfire-grid-primary"></div>
      <div class="wildfire-grid-secondary"></div>
      <div class="wildfire-scanlines"></div>
      <div class="wildfire-spotlight-tl"></div>
      <div class="wildfire-spotlight-br"></div>
      <div class="scroll-overlay" :style="{ opacity: scrollOverlayOpacity }"></div>
    </div>
    
    <main class="wildfire-hero">
      <div class="wildfire-container">
        <div class="wildfire-logo-container" @mouseenter="triggerBoomEffect">
          <div class="wildfire-logo-glow" :class="{ 'boom-active': isBoomActive }"></div>
          <div class="logo-boom-ring" v-for="n in 3" :key="n" :class="{ 'boom-active': isBoomActive }" :style="{ '--i': n }"></div>
          <img 
            src="/icons/wildfire.webp" 
            alt="Wildfire.ro" 
            class="wildfire-logo"
            :class="{ 'logo-start': logoStart, 'boom-active': isBoomActive }"
            width="150"
            height="150"
            fetchpriority="high"
            decoding="sync"
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false"
            ref="logoImg"
          >
        </div>

        <!-- Titlu cu litere mari, wild alb, fire gradient, ro gradient, docs alb -->
        <h1 class="wildfire-title typing-text orbitron-font" :class="{ 'typing-complete': titleTyped }">
          <span v-if="!titleTyped">
            <span v-for="(char, index) in displayTitleArray" :key="index" :class="getCharClass(index)">
              {{ char }}
            </span>
            <span class="cursor"></span>
          </span>
          <span v-else>
            <span class="wild-white">WILD</span><span class="fire-gradient-text">FIRE</span><span class="dot-orange">.</span><span class="ro-gradient-text">RO</span><span class="docs-white"> DOCS</span>
          </span>
        </h1>

        <!-- Feature badges cu efect de typing -->
        <div class="feature-badges">
          <div class="feature-badge orbitron-font" v-for="(badge, index) in featureBadges" :key="index">
            <span class="feature-icon">{{ badge.icon }}</span>
            <span class="feature-text typing-text orbitron-font" :class="{ 'typing-complete': badgesTyped[index] }">{{ displayBadges[index] }}<span v-if="!badgesTyped[index]" class="cursor"></span></span>
          </div>
        </div>

        <div class="wildfire-button-wrapper">
          <a 
            href="/informatii/about" 
            class="wildfire-button orbitron-font"
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false"
          >
            <span class="typing-text orbitron-font" :class="{ 'typing-complete': buttonTyped }">{{ displayButton }}<span v-if="!buttonTyped" class="cursor"></span></span>
            <span class="wildfire-button-arrow">→</span>
          </a>
        </div>

        <!-- Home Searchbar cu efect de typing ciclic -->
        <div class="home-search">
          <button class="home-search-button orbitron-font" @click="openSearch" type="button">
            <img 
              src="/icons/searchbutton.svg" 
              class="search-icon" 
              alt="search" 
              width="16" 
              height="16"
              loading="eager"
              decoding="async"
            >
            <span class="home-search-text typing-text orbitron-font">{{ displaySearchText }}<span class="cursor"></span></span>
            <span class="home-search-shortcut orbitron-font">CTRL K</span>
          </button>
        </div>

        <div class="community-tag delayed-tag">
          <span class="tag-badge typing-text orbitron-font" :class="{ 'typing-complete': tagTyped }">{{ displayTag }}<span v-if="!tagTyped" class="cursor"></span></span>
          <span class="tag-year orbitron-font">since 2021</span>
        </div>

        <!-- Last Updates -->
        <div class="last-updates-wrapper reveal-element" ref="lastUpdatesRef">
          <LastUpdates />
        </div>

        <!-- About Wiki Component -->
        <AboutWiki :startTyping="startWikiTyping" ref="aboutWikiRef" />

        <!-- Wiki Updates Grid -->
        <div class="updates-grid-section reveal-element" ref="updatesGridRef">
          <WikiUpdatesGrid :updates="recentCommits" :stats="stats" />
        </div>
        
      </div>
    </main>

    <div class="scroll-indicator" :class="{ 'scroll-visible': showScrollIndicator }">
      <div class="scroll-line">
        <div class="scroll-progress" :style="{ height: scrollProgress + '%' }"></div>
      </div>
      <div class="scroll-sections">
        <a href="#wiki-section" class="scroll-dot orbitron-font" :class="{ 'active': activeSection === 'wiki' }">
          <span class="dot"></span>
          <span class="dot-label">Wiki</span>
        </a>
        <a href="#last-updates" class="scroll-dot orbitron-font" :class="{ 'active': activeSection === 'updates' }">
          <span class="dot"></span>
          <span class="dot-label">Updates</span>
        </a>
        <a href="#updates-grid" class="scroll-dot orbitron-font" :class="{ 'active': activeSection === 'updates-grid' }">
          <span class="dot"></span>
          <span class="dot-label">Latest</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted, watch } from 'vue'
import { useData } from 'vitepress'
import LastUpdates from './LastUpdates.vue'
import HomeNavbar from './HomeNavbar.vue'
import WikiUpdatesGrid from './WikiUpdatesGrid.vue'
import AboutWiki from './AboutWiki.vue'

const { page, theme } = useData()

const isHomePage = computed(() => {
  return page.value.relativePath === 'index.md' || page.value.relativePath === 'index'
})

const isHovered = ref(false)
const isOverlayLoaded = ref(false)
const logoStart = ref(false)
const isBoomActive = ref(false)
let boomTimeout: ReturnType<typeof setTimeout> | null = null

// Referințe
const aboutWikiRef = ref<InstanceType<typeof AboutWiki> | null>(null)
const startWikiTyping = ref(false)
const lastUpdatesRef = ref<HTMLElement | null>(null)
const updatesGridRef = ref<HTMLElement | null>(null)

// Titlu 
const displayTitle = ref('')
const displayTitleArray = computed(() => displayTitle.value.split(''))
const titleTyped = ref(false)
const titleOriginal = 'WILDFIRE.RO DOCS'

// ===== FUNCȚII HELPER (MUTATE SUS) =====
const formatCommits = (commits: any[]) => {
  if (!Array.isArray(commits)) return []
  
  const emojis = ['⚡', '🎉', '📚', '🔄', '🔧', '📝', '✨', '🐛', '🚀']
  
  return commits.map((commit, index) => ({
    id: commit.sha.substring(0, 7),
    message: commit.commit.message.split('\n')[0],
    emoji: emojis[index % emojis.length],
    author: commit.author?.login || commit.commit.author.name,
    date: commit.commit.author.date,
    url: commit.html_url
  }))
}

// ===== FETCH GITHUB DATA =====
const recentCommits = ref<any[]>([])
const stats = ref({
  totalCommits: 0,
  contributors: 0,
  totalFiles: 0,
  stars: 0
})

const fetchGitHubData = async () => {
  const owner = 'ianncxd'
  const repo = 'wiki-wildfire-inc'
  const baseUrl = `https://api.github.com/repos/${owner}/${repo}`
  
  try {
    console.log('Fetching GitHub data...')
    
    const [commitsRes, repoRes, contributorsRes, treeRes] = await Promise.all([
      fetch(`${baseUrl}/commits?per_page=4`),
      fetch(baseUrl),
      fetch(`${baseUrl}/stats/contributors`),
      fetch(`${baseUrl}/git/trees/main?recursive=1`)
    ])

    if (!commitsRes.ok || !repoRes.ok || !contributorsRes.ok || !treeRes.ok) {
      throw new Error('GitHub API returned an error')
    }

    const commits = await commitsRes.json()
    const repoData = await repoRes.json()
    const contributorsData = await contributorsRes.json()
    const treeData = await treeRes.json()

    recentCommits.value = formatCommits(commits)

    stats.value = {
      totalCommits: Array.isArray(contributorsData) 
        ? contributorsData.reduce((sum: number, c: any) => sum + c.total, 0) 
        : 0,
      contributors: Array.isArray(contributorsData) ? contributorsData.length : 0,
      totalFiles: treeData.tree?.filter((item: any) => item.type === 'blob').length || 0,
      stars: repoData.stargazers_count || 0
    }

    console.log('GitHub data loaded:', stats.value)

  } catch (error) {
    console.error('Eroare la fetch GitHub:', error)
    // Date de backup în caz de eroare
    recentCommits.value = [
      {
        id: 'a44828c',
        message: 'Repaired some errors at git pushing',
        emoji: '🔧',
        author: 'ianncxd',
        date: new Date().toISOString(),
        url: `https://github.com/${owner}/${repo}/commit/a44828c`
      },
      {
        id: '5ce19a6',
        message: 'Final commit on wildfire`s official wikipedia!',
        emoji: '🎉',
        author: 'ianncxd',
        date: new Date(Date.now() - 86400000).toISOString(),
        url: `https://github.com/${owner}/${repo}/commit/5ce19a6`
      },
      {
        id: '9c4cccb',
        message: 'WikiDocs core phase 1',
        emoji: '📚',
        author: 'ianncxd',
        date: new Date(Date.now() - 172800000).toISOString(),
        url: `https://github.com/${owner}/${repo}/commit/9c4cccb`
      },
      {
        id: 'd475a34',
        message: 'big update la tags si camere',
        emoji: '🔄',
        author: 'ianncxd',
        date: new Date(Date.now() - 259200000).toISOString(),
        url: `https://github.com/${owner}/${repo}/commit/d475a34` // ← AM REPARAT GHILIMEEA
      }
    ]
    stats.value = {
      totalCommits: 33,
      contributors: 1,
      totalFiles: 124,
      stars: 0
    }
  }
}

// Scroll indicator
const showScrollIndicator = ref(false)
const scrollProgress = ref(0)
const activeSection = ref('')
const scrollOverlayOpacity = ref(0)

// Funcție pentru a determina clasa culorii pentru fiecare caracter în timpul typing-ului
const getCharClass = (index: number) => {
  const text = displayTitle.value
  if (index < 4) return 'wild-white'
  if (index >= 4 && index < 8) return 'fire-orange'
  if (index === 8) return 'dot-orange'
  if (index >= 9 && index < 11) return 'ro-orange'
  if (index >= 11) return 'docs-white'
  return ''
}

// ===== EFFECT DE TYPING =====
const featureBadges = [
  { icon: '✓', text: 'Documentatie' },
  { icon: '⚡', text: 'Informatie' },
  { icon: '🛡️', text: 'Features' }
]

const displayBadges = ref(['', '', ''])
const badgesTyped = ref([false, false, false])

const displayButton = ref('')
const buttonTyped = ref(false)
const buttonOriginal = 'Ghid de pornire'

const displayTag = ref('')
const tagTyped = ref(false)
const tagOriginal = '@Wildfire.ro'

const displaySearchText = ref('')
const searchSuggestions = [
  'Caută în documentație...',
  'Regulament Jucatori',
  'Informatii',
  'Knifes',
  'Fire Coins',
  'VIP Tiers',
  'Sisteme',
  'Shop',
  'Stats'
]

let currentSuggestionIndex = 0
let searchTypingTimeout: ReturnType<typeof setTimeout> | null = null
let searchPauseTimeout: ReturnType<typeof setTimeout> | null = null

const typeTitle = async () => {
  for (let i = 0; i <= titleOriginal.length; i++) {
    displayTitle.value = titleOriginal.substring(0, i)
    await new Promise(resolve => setTimeout(resolve, 50))
  }
  titleTyped.value = true
}

const typeBadges = async () => {
  for (let b = 0; b < featureBadges.length; b++) {
    const text = featureBadges[b].text
    for (let i = 0; i <= text.length; i++) {
      const newBadges = [...displayBadges.value]
      newBadges[b] = text.substring(0, i)
      displayBadges.value = newBadges
      await new Promise(resolve => setTimeout(resolve, 30))
    }
    badgesTyped.value[b] = true
    await new Promise(resolve => setTimeout(resolve, 150))
  }
}

const typeButton = async () => {
  for (let i = 0; i <= buttonOriginal.length; i++) {
    displayButton.value = buttonOriginal.substring(0, i)
    await new Promise(resolve => setTimeout(resolve, 40))
  }
  buttonTyped.value = true
}

const typeTag = async () => {
  for (let i = 0; i <= tagOriginal.length; i++) {
    displayTag.value = tagOriginal.substring(0, i)
    await new Promise(resolve => setTimeout(resolve, 40))
  }
  tagTyped.value = true
}

const typeSearchNext = async () => {
  const nextText = searchSuggestions[currentSuggestionIndex]
  
  if (displaySearchText.value.length > 0) {
    for (let i = displaySearchText.value.length; i > 0; i--) {
      displaySearchText.value = displaySearchText.value.substring(0, i - 1)
      await new Promise(resolve => setTimeout(resolve, 15))
    }
  }
  
  for (let i = 0; i <= nextText.length; i++) {
    displaySearchText.value = nextText.substring(0, i)
    await new Promise(resolve => setTimeout(resolve, 25))
  }
  
  currentSuggestionIndex = (currentSuggestionIndex + 1) % searchSuggestions.length
  searchPauseTimeout = setTimeout(typeSearchNext, 1000)
}

const startTypingEffects = () => {
  setTimeout(() => typeTitle(), 100)
  setTimeout(() => typeBadges(), 600)
  setTimeout(() => typeButton(), 1200)
  setTimeout(() => typeTag(), 1500)
  
  setTimeout(() => {
    startWikiTyping.value = true
  }, 1900)
  
  setTimeout(() => {
    displaySearchText.value = ''
    setTimeout(() => {
      currentSuggestionIndex = 0
      typeSearchNext()
    }, 150)
  }, 1000)
}

// ===== FUNCȚII UTILITARE =====
const openSearch = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  
  const searchButton = document.querySelector('.VPNavBarSearch button')
  if (searchButton) {
    ;(searchButton as HTMLElement).click()
    return
  }
  
  const event = new KeyboardEvent('keydown', {
    key: 'k',
    ctrlKey: true,
    metaKey: true,
    bubbles: true,
    cancelable: true
  })
  window.dispatchEvent(event)
}

const toggleDefaultNavbar = (hide: boolean) => {
  const vitepressNavbar = document.querySelector('.VPNav')
  if (vitepressNavbar) {
    (vitepressNavbar as HTMLElement).style.display = hide ? 'none' : ''
  }
  
  const vitepressSidebar = document.querySelector('.VPSidebar')
  if (vitepressSidebar) {
    (vitepressSidebar as HTMLElement).style.display = hide ? 'none' : ''
  }
  
  const vitepressContent = document.querySelector('.VPContent')
  if (vitepressContent) {
    (vitepressContent as HTMLElement).style.marginTop = hide ? '0' : ''
  }
  
  const localNav = document.querySelector('.VPLocalNav')
  if (localNav) {
    (localNav as HTMLElement).style.display = hide ? 'none' : ''
  }
}

const triggerBoomEffect = () => {
  if (boomTimeout) {
    clearTimeout(boomTimeout)
  }
  isBoomActive.value = true
  boomTimeout = setTimeout(() => {
    isBoomActive.value = false
  }, 500)
}

// ===== FUNCȚII PENTRU SCROLL =====
const isElementInViewport = (el: HTMLElement | null) => {
  if (!el) return false
  const rect = el.getBoundingClientRect()
  const windowHeight = window.innerHeight
  return rect.top < windowHeight * 0.85 && rect.bottom > 0
}

const applyRevealEffect = () => {
  const elements = [
    lastUpdatesRef.value,
    updatesGridRef.value
  ].filter(el => el !== null)

  elements.forEach(el => {
    if (isElementInViewport(el)) {
      el.classList.add('revealed')
    } else {
      el.classList.remove('revealed')
    }
  })
}

const handleScroll = () => {
  const scrollY = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  
  scrollProgress.value = (scrollY / (documentHeight - windowHeight)) * 100
  showScrollIndicator.value = scrollY > 200
  
  const isDark = document.documentElement.classList.contains('dark')
  if (isDark) {
    scrollOverlayOpacity.value = Math.min(scrollY / 400, 1)
  } else {
    scrollOverlayOpacity.value = Math.min(scrollY / 800, 0.6)
  }
  
  const wikiSection = document.getElementById('wiki-section')
  const updatesSection = document.querySelector('.last-updates-wrapper')
  const updatesGrid = updatesGridRef.value
  
  if (wikiSection) {
    const wikiRect = wikiSection.getBoundingClientRect()
    if (wikiRect.top < windowHeight/2 && wikiRect.bottom > 0) {
      activeSection.value = 'wiki'
    } else if (activeSection.value === 'wiki') {
      activeSection.value = ''
    }
  }
  
  if (updatesSection) {
    const updatesRect = updatesSection.getBoundingClientRect()
    if (updatesRect.top < windowHeight/2 && updatesRect.bottom > 0) {
      activeSection.value = 'updates'
    } else if (activeSection.value === 'updates') {
      activeSection.value = ''
    }
  }
  
  if (updatesGrid) {
    const gridRect = updatesGrid.getBoundingClientRect()
    if (gridRect.top < windowHeight/2 && gridRect.bottom > 0) {
      activeSection.value = 'updates-grid'
    } else if (activeSection.value === 'updates-grid') {
      activeSection.value = ''
    }
  }

  applyRevealEffect()
}

watch(isHomePage, (newValue) => {
  toggleDefaultNavbar(newValue)
}, { immediate: true })

onMounted(() => {
  toggleDefaultNavbar(isHomePage.value)
  
  // Fetch GitHub data
  fetchGitHubData()
  
  setTimeout(() => {
    const overlayImg = new Image()
    overlayImg.src = '/wallpaper/da.webp'
    overlayImg.fetchPriority = 'low'
    overlayImg.onload = () => {
      isOverlayLoaded.value = true
    }
  }, 2000)
  
  setTimeout(() => {
    logoStart.value = true
  }, 800)
  
  startTypingEffects()
  
  window.addEventListener('scroll', handleScroll)
  handleScroll()
  
  setTimeout(applyRevealEffect, 100)
})

onUnmounted(() => {
  toggleDefaultNavbar(false)
  if (boomTimeout) {
    clearTimeout(boomTimeout)
  }
  if (searchTypingTimeout) {
    clearTimeout(searchTypingTimeout)
  }
  if (searchPauseTimeout) {
    clearTimeout(searchPauseTimeout)
  }
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* TOATE STILURILE TALE ORIGINALE - le păstrezi exact așa cum le ai */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');

.orbitron-font {
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 0.3px;
}

.wildfire-home {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 24px 80px;
  min-height: 100vh;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 0.3px;
}

.wildfire-wallpaper,
.wildfire-wallpaper-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1),
              filter 0.9s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
  transform: translateZ(0);
  backface-visibility: hidden;
  user-select: none;
  pointer-events: none;
}

.wildfire-wallpaper-overlay {
  z-index: -1;
  opacity: 0;
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.wildfire-wallpaper-overlay-loaded {
  opacity: 1 !important;
}

.wildfire-wallpaper-hover {
  transform: scale(1.08) translateZ(0) !important;
  filter: brightness(1.08) contrast(1.08) saturate(1.1);
}

.wildfire-home .wildfire-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
}

:not(.dark) .wildfire-home .wildfire-bg {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(2px);
}

:not(.dark) .wildfire-home .wildfire-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(220, 38, 38, 0.06), rgba(249, 115, 22, 0.03), rgba(255, 255, 255, 0.7));
}

.wildfire-home .wildfire-grid-primary,
.wildfire-home .wildfire-grid-secondary,
.wildfire-home .wildfire-scanlines {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

:not(.dark) .wildfire-home .wildfire-grid-primary {
  opacity: 0.08;
  background-image: 
    linear-gradient(to right, rgba(255, 69, 0, 0.15) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 69, 0, 0.15) 1px, transparent 1px);
  background-size: 40px 40px;
}

:not(.dark) .wildfire-home .wildfire-grid-secondary {
  opacity: 0.05;
  background-image: 
    linear-gradient(to right, rgba(255, 100, 0, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 100, 0, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

:not(.dark) .wildfire-home .wildfire-scanlines {
  opacity: 0.02;
  background-image: repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 2px);
  background-size: 100% 2px;
}

.wildfire-home .wildfire-spotlight-tl,
.wildfire-home .wildfire-spotlight-br {
  position: absolute;
  width: 384px;
  height: 384px;
  border-radius: 50%;
  filter: blur(48px);
  opacity: 0;
  transition: opacity 0.3s ease;
  transform: translateZ(0);
  backface-visibility: hidden;
}

:not(.dark) .wildfire-home .wildfire-spotlight-tl {
  top: 0;
  left: 25%;
  background: rgba(220, 38, 38, 0.06);
}

:not(.dark) .wildfire-home .wildfire-spotlight-br {
  bottom: 0;
  right: 25%;
  background: rgba(249, 115, 22, 0.04);
}

.wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-spotlight-tl,
.wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-spotlight-br {
  opacity: 1;
  animation: spotlight-pulse 2.2s ease-in-out infinite;
}

.wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-spotlight-br {
  animation-delay: 0.3s;
}

.wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-grid-primary {
  animation: grid-pulse 2s ease-in-out infinite;
}

.wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-grid-secondary {
  animation: grid-pulse-slow 2.5s ease-in-out infinite;
}

@keyframes grid-pulse {
  0% { opacity: 0.08; }
  50% { opacity: 0.2; }
  100% { opacity: 0.08; }
}

@keyframes grid-pulse-slow {
  0% { opacity: 0.05; }
  50% { opacity: 0.15; }
  100% { opacity: 0.05; }
}

@keyframes spotlight-pulse {
  0% { 
    opacity: 0.2; 
    transform: scale(1) translateZ(0);
    filter: blur(48px);
  }
  50% { 
    opacity: 0.5; 
    transform: scale(1.2) translateZ(0);
    filter: blur(52px);
  }
  100% { 
    opacity: 0.2; 
    transform: scale(1) translateZ(0);
    filter: blur(48px);
  }
}

.dark .wildfire-home .wildfire-bg {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2px);
}

.dark .wildfire-home .wildfire-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(69, 10, 10, 0.4), rgba(30, 15, 0, 0.3), rgba(0, 0, 0, 0.7));
}

.dark .wildfire-home .wildfire-grid-primary {
  opacity: 0.15;
  background-image: 
    linear-gradient(to right, rgba(255, 69, 0, 0.2) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 69, 0, 0.2) 1px, transparent 1px);
  background-size: 40px 40px;
}

.dark .wildfire-home .wildfire-grid-secondary {
  opacity: 0.1;
  background-image: 
    linear-gradient(to right, rgba(255, 140, 0, 0.15) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 140, 0, 0.15) 1px, transparent 1px);
  background-size: 20px 20px;
}

.dark .wildfire-home .wildfire-scanlines {
  opacity: 0.05;
  background-image: repeating-linear-gradient(0deg, rgba(0,0,0,0.8) 0px, rgba(0,0,0,0.8) 1px, transparent 1px, transparent 2px);
  background-size: 100% 2px;
}

.dark .wildfire-home .wildfire-spotlight-tl {
  top: 0;
  left: 25%;
  background: rgba(220, 38, 38, 0.2);
}

.dark .wildfire-home .wildfire-spotlight-br {
  bottom: 0;
  right: 25%;
  background: rgba(234, 88, 12, 0.2);
}

.dark .wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-grid-primary {
  animation: grid-pulse-dark 2s ease-in-out infinite;
}

.dark .wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-grid-secondary {
  animation: grid-pulse-slow-dark 2.5s ease-in-out infinite;
}

.dark .wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-spotlight-tl,
.dark .wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-spotlight-br {
  animation: spotlight-pulse-dark 2.2s ease-in-out infinite;
}

@keyframes grid-pulse-dark {
  0% { opacity: 0.15; }
  50% { opacity: 0.28; }
  100% { opacity: 0.15; }
}

@keyframes grid-pulse-slow-dark {
  0% { opacity: 0.1; }
  50% { opacity: 0.22; }
  100% { opacity: 0.1; }
}

@keyframes spotlight-pulse-dark {
  0% { 
    opacity: 0.2; 
    transform: scale(1) translateZ(0);
    filter: blur(48px);
  }
  50% { 
    opacity: 0.6; 
    transform: scale(1.2) translateZ(0);
    filter: blur(52px);
  }
  100% { 
    opacity: 0.2; 
    transform: scale(1) translateZ(0);
    filter: blur(48px);
  }
}

.scroll-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.1) 15%,
    rgba(0, 0, 0, 0.2) 40%,
    rgba(0, 0, 0, 0.3) 70%,
    rgba(0, 0, 0, 0.4) 100%
  );
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.1s ease;
  opacity: 0;
}

.dark .scroll-overlay {
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.7) 15%,
    rgba(0, 0, 0, 0.95) 40%,
    rgba(0, 0, 0, 0.98) 70%,
    rgba(0, 0, 0, 1) 100%
  );
}

.wildfire-home .wildfire-hero {
  position: relative;
  z-index: 10;
  width: 100%;
  transform: translateZ(0);
}

.wildfire-home .wildfire-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.community-tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 6px 14px;
  background: rgba(255, 69, 0, 0.05);
  border: 1px solid rgba(255, 69, 0, 0.2);
  border-radius: 40px;
  font-size: 12px;
  opacity: 0;
  animation: fadeIn 0.4s ease 0.2s forwards;
}

.dark .community-tag {
  background: rgba(255, 69, 0, 0.1);
  border-color: rgba(255, 69, 0, 0.3);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.tag-badge {
  color: #ff4500;
  font-weight: 700;
}

.tag-year {
  color: var(--vp-c-text-2);
}

.wildfire-home .wildfire-logo-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  width: 150px;
  height: 150px;
  cursor: pointer;
}

.wildfire-home .wildfire-logo-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 69, 0, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(25px);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.wildfire-home .wildfire-logo-glow.boom-active {
  animation: boomGlow 0.5s ease-out forwards;
}

@keyframes boomGlow {
  0% { opacity: 0; transform: scale(1); }
  40% { opacity: 0.5; transform: scale(1.2); }
  100% { opacity: 0; transform: scale(1); }
}

.logo-boom-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(255, 69, 0, 0.4);
  border-radius: 50%;
  opacity: 0;
  transform: scale(1);
  pointer-events: none;
  z-index: 2;
}

.logo-boom-ring.boom-active {
  animation: boomRing 0.5s ease-out forwards;
  animation-delay: calc(0.05s * var(--i));
}

@keyframes boomRing {
  0% { opacity: 0; transform: scale(1); border-width: 2px; }
  40% { opacity: 0.5; transform: scale(1.3); border-width: 1.5px; }
  100% { opacity: 0; transform: scale(1); border-width: 1px; }
}

.wildfire-home .wildfire-logo {
  width: 140px;
  height: 140px;
  object-fit: contain;
  position: relative;
  z-index: 3;
  cursor: pointer;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
  opacity: 0;
}

.logo-start {
  animation: startSpin 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes startSpin {
  0% { transform: scale(0.2) rotate(-360deg); opacity: 0; }
  50% { transform: scale(1.2) rotate(25deg); opacity: 1; }
  80% { transform: scale(0.95) rotate(-5deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

.wildfire-home .wildfire-logo.boom-active {
  animation: logoBoom 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes logoBoom {
  0% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.2) rotate(15deg); }
  50% { transform: scale(1.25) rotate(-10deg); }
  75% { transform: scale(1.05) rotate(5deg); }
  100% { transform: scale(1) rotate(0deg); }
}

.wildfire-home .wildfire-logo:hover {
  animation: logoHover 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 1 !important;
}

@keyframes logoHover {
  0% { transform: scale(1) rotate(0deg); }
  40% { transform: scale(1.15) rotate(12deg); }
  70% { transform: scale(1.05) rotate(-4deg); }
  100% { transform: scale(1.1) rotate(3deg); }
}

/* Titlu cu litere mari */
.wildfire-title {
  font-size: 48px;
  font-weight: 800;
  margin: 0 0 8px 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-align: center;
  display: inline-block;
  text-transform: uppercase;
}

/* Culori pentru typing */
.wild-white {
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.fire-orange {
  color: #ff4500;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.dot-orange {
  color: #ff4500;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.ro-orange {
  color: #ff4500;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.docs-white {
  color: #f0f0f0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 700;
}

/* Gradient pentru FIRE după typing */
.fire-gradient-text {
  background: linear-gradient(
    135deg,
    #ff4500 0%,
    #ff5722 30%,
    #ff4500 70%,
    #ff5722 100%
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fireFlicker 8s ease-in-out infinite;
  text-shadow: 0 0 5px rgba(255, 69, 0, 0.3);
  position: relative;
  display: inline-block;
}

.fire-gradient-text::after {
  content: 'FIRE';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(255, 69, 0, 0.15) 0%,
    rgba(255, 87, 34, 0.15) 50%,
    rgba(255, 69, 0, 0.15) 100%
  );
  filter: blur(6px);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  z-index: -1;
  animation: fireGlow 8s ease-in-out infinite;
}

/* Gradient pentru RO după typing */
.ro-gradient-text {
  background: linear-gradient(
    135deg,
    #ff4500 0%,
    #ff5722 30%,
    #ff4500 70%,
    #ff5722 100%
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: roFlicker 8s ease-in-out infinite;
  text-shadow: 0 0 5px rgba(255, 69, 0, 0.3);
  position: relative;
  display: inline-block;
}

.ro-gradient-text::after {
  content: 'RO';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(255, 69, 0, 0.15) 0%,
    rgba(255, 87, 34, 0.15) 50%,
    rgba(255, 69, 0, 0.15) 100%
  );
  filter: blur(6px);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  z-index: -1;
  animation: roGlow 8s ease-in-out infinite;
}

@keyframes fireFlicker {
  0% {
    background-position: 0% 50%;
    text-shadow: 0 0 5px rgba(255, 69, 0, 0.3);
  }
  25% {
    background-position: 50% 50%;
    text-shadow: 0 0 8px rgba(255, 87, 34, 0.4);
  }
  50% {
    background-position: 100% 50%;
    text-shadow: 0 0 10px rgba(255, 69, 0, 0.5);
  }
  75% {
    background-position: 50% 50%;
    text-shadow: 0 0 8px rgba(255, 87, 34, 0.4);
  }
  100% {
    background-position: 0% 50%;
    text-shadow: 0 0 5px rgba(255, 69, 0, 0.3);
  }
}

@keyframes roFlicker {
  0% {
    background-position: 0% 50%;
    text-shadow: 0 0 5px rgba(255, 69, 0, 0.3);
  }
  25% {
    background-position: 50% 50%;
    text-shadow: 0 0 8px rgba(255, 87, 34, 0.4);
  }
  50% {
    background-position: 100% 50%;
    text-shadow: 0 0 10px rgba(255, 69, 0, 0.5);
  }
  75% {
    background-position: 50% 50%;
    text-shadow: 0 0 8px rgba(255, 87, 34, 0.4);
  }
  100% {
    background-position: 0% 50%;
    text-shadow: 0 0 5px rgba(255, 69, 0, 0.3);
  }
}

@keyframes fireGlow {
  0% {
    opacity: 0.15;
    filter: blur(4px);
  }
  50% {
    opacity: 0.3;
    filter: blur(6px);
  }
  100% {
    opacity: 0.15;
    filter: blur(4px);
  }
}

@keyframes roGlow {
  0% {
    opacity: 0.15;
    filter: blur(4px);
  }
  50% {
    opacity: 0.3;
    filter: blur(6px);
  }
  100% {
    opacity: 0.15;
    filter: blur(4px);
  }
}

.dark .wild-white,
.dark .docs-white {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.dark .fire-orange,
.dark .dot-orange,
.dark .ro-orange {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.dark .fire-gradient-text {
  text-shadow: 0 0 20px rgba(255, 69, 0, 0.7);
}

.dark .ro-gradient-text {
  text-shadow: 0 0 10px rgba(255, 69, 0, 0.4);
}

.feature-badges {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  opacity: 0;
  animation: fadeIn 0.4s ease 0.5s forwards;
}

.feature-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 30px;
  font-size: 13px;
  transition: all 0.2s ease;
}

.feature-badge:hover {
  border-color: #ff4500;
  transform: translateY(-2px);
}

.feature-icon {
  color: #ff4500;
  font-size: 14px;
}

.feature-text {
  color: var(--vp-c-text-1);
}

.wildfire-button-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  opacity: 0;
  animation: fadeIn 0.4s ease 0.6s forwards;
}

.wildfire-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #ff4500, #ff5722);
  color: white;
  padding: 12px 28px;
  border-radius: 40px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 69, 0, 0.25);
  border: none;
}

.wildfire-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 69, 0, 0.35);
  gap: 14px;
}

.wildfire-button-arrow {
  font-size: 18px;
  transition: transform 0.2s ease;
}

.wildfire-button:hover .wildfire-button-arrow {
  transform: translateX(4px);
}

/* ===== SEARCHBAR STYLING ===== */
.home-search {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
  opacity: 0;
  animation: fadeIn 0.4s ease 0.7s forwards;
  position: relative;
}

.home-search-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  padding: 12px 20px;
  background: #ffffff;
  border: 2px solid transparent;
  border-radius: 40px;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 46px;
  position: relative;
  overflow: hidden;
}

.home-search-button::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #ff4500, #ff8c00, #ff4500, #ff8c00);
  background-size: 300% 300%;
  border-radius: 42px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
  animation: borderRotate 3s ease infinite;
}

.home-search-button:hover::before {
  opacity: 1;
}

.home-search-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 69, 0, 0.2);
  background: #ffffff;
}

@keyframes borderRotate {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.dark .home-search-button {
  background: #1a1a1a;
  border: 1px solid #333333;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.dark .home-search-button:hover {
  background: #1a1a1a;
  box-shadow: 0 8px 20px rgba(255, 69, 0, 0.3);
}

.search-icon {
  width: 15px;
  height: 15px;
  margin-right: 6px;
  filter: brightness(0.3);
}

.dark .search-icon {
  filter: brightness(0) invert(1);
}

.home-search-text {
  flex: 1;
  text-align: left;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: inherit;
  display: flex;
  align-items: center;
}

.home-search-shortcut {
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 5px;
  margin-left: 6px;
  background: #f0f0f0;
  color: #333333;
  border: 1px solid #dddddd;
}

.dark .home-search-shortcut {
  background: #2a2a2a;
  color: #ffffff;
  border: none;
}

.home-search-button:hover .home-search-shortcut {
  background: #ff4500;
  color: #ffffff;
  border-color: #ff4500;
}

.last-updates-wrapper {
  width: 100%;
  margin-bottom: 30px;
}

/* Secțiunea pentru WikiUpdatesGrid */
.updates-grid-section {
  width: 100%;
  margin: 40px 0;
}

/* ===== EFFECT DE TYPING ===== */
.typing-text {
  position: relative;
  display: inline-block;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background-color: #ff4500;
  margin-left: 2px;
  animation: blink 0.8s infinite;
  vertical-align: middle;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.typing-complete .cursor {
  display: none;
}

.reveal-element {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal-element.revealed {
  opacity: 1;
  transform: translateY(0);
}

.last-updates-wrapper.revealed {
  transition-delay: 0.4s;
}

.updates-grid-section.revealed {
  transition-delay: 0.3s;
}

.delayed-tag {
  opacity: 0;
  animation: fadeInTag 0.5s ease 0.8s forwards;
}

@keyframes fadeInTag {
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.scroll-indicator {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  gap: 12px;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.scroll-indicator.scroll-visible {
  opacity: 1;
  pointer-events: auto;
}

.scroll-line {
  width: 2px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.scroll-progress {
  width: 100%;
  background: #ff4500;
  transition: height 0.1s ease;
  border-radius: 2px;
}

.scroll-sections {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.scroll-dot {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

.scroll-dot:hover,
.scroll-dot.active {
  opacity: 1;
}

.scroll-dot .dot {
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transition: all 0.2s ease;
}

.scroll-dot.active .dot {
  background: #ff4500;
  box-shadow: 0 0 10px #ff4500;
  transform: scale(1.2);
}

.scroll-dot .dot-label {
  font-size: 11px;
  color: white;
  opacity: 0;
  transform: translateX(-5px);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.scroll-dot:hover .dot-label,
.scroll-dot.active .dot-label {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 1024px) {
  .scroll-indicator {
    display: none;
  }
}

@media (max-width: 768px) {
  .wildfire-home {
    padding: 80px 20px 60px;
  }
  
  .wildfire-title {
    font-size: 42px;
  }
}

@media (max-width: 480px) {
  .wildfire-home {
    padding: 70px 16px 50px;
  }
  
  .wildfire-title {
    font-size: 32px;
  }
  
  .home-search-button {
    width: 44px !important;
    min-width: 44px !important;
    max-width: 44px !important;
    padding: 0;
    justify-content: center;
    height: 44px;
  }
  
  .home-search-text,
  .home-search-shortcut {
    display: none;
  }
  
  .search-icon {
    margin-right: 0;
  }
}
</style>
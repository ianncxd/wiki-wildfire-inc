<template>
  <div class="wildfire-home">
    <!-- Navbar personalizat pentru homepage - apare DOAR pe index.md -->
    <HomeNavbar v-if="isHomePage" />
    
    <!-- Background imagine principală (NEMODIFICAT) -->
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
    
    <!-- A doua imagine de background (overlay) (NEMODIFICAT) -->
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
    
    <!-- Background CS2 Style (overlay) (NEMODIFICAT) -->
    <div class="wildfire-bg">
      <div class="wildfire-gradient"></div>
      <div class="wildfire-grid-primary"></div>
      <div class="wildfire-grid-secondary"></div>
      <div class="wildfire-scanlines"></div>
      <div class="wildfire-spotlight-tl"></div>
      <div class="wildfire-spotlight-br"></div>
    </div>
    
    <main class="wildfire-hero">
      <div class="wildfire-container">
        <!-- Tag comunitate -->
        <div class="community-tag">
          <span class="tag-badge">#1 CS2 ROMÂNIA</span>
          <span class="tag-year">since 2021</span>
        </div>

        <!-- Logo cu efecte -->
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

        <!-- Titlu -->
        <h1 class="wildfire-title">
          <span class="wild">WILD</span>
          <span class="fire">FIRE</span>
          <span class="dot">.</span>
          <span class="ro">ro</span>
          <span class="wiki">Wiki</span>
        </h1>
        

        <!-- Feature badges -->
        <div class="feature-badges">
          <div class="feature-badge">
            <span class="feature-icon">✓</span>
            <span class="feature-text">Documentatie</span>
          </div>
          <div class="feature-badge">
            <span class="feature-icon">⚡</span>
            <span class="feature-text">Informatie</span>
          </div>
          <div class="feature-badge">
            <span class="feature-icon">🛡️</span>
            <span class="feature-text">Features</span>
          </div>
        </div>

        <!-- Buton -->
        <div class="wildfire-button-wrapper">
          <a 
            href="/informatii/about" 
            class="wildfire-button"
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false"
          >
            <span>Ghid de pornire</span>
            <span class="wildfire-button-arrow">→</span>
          </a>
        </div>

        <!-- Home Searchbar -->
        <div class="home-search">
          <button class="home-search-button" @click="openSearch" type="button">
            <img 
              src="/icons/searchbutton.svg" 
              class="search-icon" 
              alt="search" 
              width="16" 
              height="16"
              loading="eager"
              decoding="async"
            >
            <span class="home-search-text">Caută în documentație...</span>
            <span class="home-search-shortcut">CTRL K</span>
          </button>
        </div>

        <!-- Last Updates Component -->
        <div class="last-updates-wrapper">
          <LastUpdates />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted, watch } from 'vue'
import { useData } from 'vitepress'
import LastUpdates from './LastUpdates.vue'
import HomeNavbar from './HomeNavbar.vue'

const { page } = useData()

const isHomePage = computed(() => {
  return page.value.relativePath === 'index.md' || page.value.relativePath === 'index'
})

const isHovered = ref(false)
const isOverlayLoaded = ref(false)
const logoStart = ref(false)
const isBoomActive = ref(false)
let boomTimeout: ReturnType<typeof setTimeout> | null = null

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

watch(isHomePage, (newValue) => {
  toggleDefaultNavbar(newValue)
}, { immediate: true })

onMounted(() => {
  toggleDefaultNavbar(isHomePage.value)
  
  setTimeout(() => {
    const overlayImg = new Image()
    overlayImg.src = '/wallpaper/da.webp'
    overlayImg.fetchPriority = 'low'
    overlayImg.onload = () => {
      isOverlayLoaded.value = true
    }
  }, 2000)
  
  // Animații secvențiale
  setTimeout(() => {
    logoStart.value = true
  }, 800) // Logo după 0.8s
})

onUnmounted(() => {
  toggleDefaultNavbar(false)
  if (boomTimeout) {
    clearTimeout(boomTimeout)
  }
})
</script>

<style scoped>
/* DOAR BACKGROUND-UL TĂU ORIGINAL - NEMODIFICAT */
.wildfire-home {
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  padding: 100px 24px 80px;
  min-height: 100vh;
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
    linear-gradient(to right, rgba(255, 69, 0, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 69, 0, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
}

:not(.dark) .wildfire-home .wildfire-grid-secondary {
  opacity: 0.05;
  background-image: 
    linear-gradient(to right, rgba(255, 140, 0, 0.07) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 140, 0, 0.07) 1px, transparent 1px);
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

/* ELEMENTE NOI - DOAR ASTEA SUNT MODIFICATE */
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

.wildfire-title {
  font-size: 42px;
  font-weight: 800;
  margin: 0 0 8px 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  gap: 2px;
  opacity: 0;
  animation: fadeIn 0.4s ease 0.3s forwards;
}

.wild {
  background: linear-gradient(135deg, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
}

.dark .wild {
  background: linear-gradient(135deg, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.4));
}

html:not(.dark) .wild {
  background: linear-gradient(135deg, #000000, #333333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.15));
}

.fire {
  background: linear-gradient(135deg, #ff4500, #ff8c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
}

.dot {
  color: #ff4500;
  font-size: 0.9em;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
}

.ro {
  background: linear-gradient(135deg, #ff4500, #ff8c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  font-size: 0.9em;
  margin-right: 5px;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
}

.wiki {
  color: #6b7280;
  font-weight: 600;
  font-size: 0.8em;
  margin-left: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.1));
}

.dark .wiki {
  color: #9ca3af;
}

.wildfire-description {
  font-size: 16px;
  color: var(--vp-c-text-2);
  font-weight: 500;
  max-width: 600px;
  margin: 0 auto 20px;
  line-height: 1.5;
  text-align: center;
  opacity: 0;
  animation: fadeIn 0.4s ease 0.4s forwards;
}

.stat-highlight {
  color: #ff4500;
  font-weight: 700;
}

.dark .stat-highlight {
  color: #ff8c00;
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

.home-search {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  width: 100%;
  opacity: 0;
  animation: fadeIn 0.4s ease 0.7s forwards;
}

.home-search-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  padding: 12px 20px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 40px;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 46px;
}

.dark .home-search-button {
  background: #1a1a1a;
  border: 1px solid #333333;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.home-search-button:hover {
  border-color: #ff4500;
  transform: translateY(-1px);
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

/* Last Updates wrapper - apare ultimul */
.last-updates-wrapper {
  width: 100%;
  opacity: 0;
  animation: fadeIn 0.5s ease 0.9s forwards;
}

/* Restul stilurilor tale rămân exact la fel */
@media (max-width: 1024px) {
  .wildfire-home .wildfire-logo {
    max-width: 200px !important;
    max-height: 200px !important;
  }
  
  .wildfire-home .wildfire-logo-glow {
    width: 200px;
    height: 200px;
  }
  
  .wildfire-home .wildfire-title {
    font-size: 44px;
  }
  
  .wildfire-home .wildfire-description {
    font-size: 18px;
    padding: 0 20px;
  }
}

@media (max-width: 768px) {
  .wildfire-home {
    padding: 80px 20px 60px;
  }
  
  .wildfire-home .wildfire-logo {
    max-width: 180px !important;
    max-height: 180px !important;
    width: 180px;
    height: 180px;
  }
  
  .wildfire-home .wildfire-logo-glow {
    width: 180px;
    height: 180px;
  }
  
  .wildfire-home .wildfire-title {
    font-size: 36px;
  }
  
  .wildfire-home .wildfire-description {
    font-size: 16px;
    margin-bottom: 24px;
  }
  
  .wildfire-home .wildfire-button {
    padding: 12px 28px;
    font-size: 16px;
  }
  
  .wildfire-home .home-search-button {
    max-width: 100%;
    padding: 12px 20px;
    height: 44px;
  }
  
  .wildfire-home .home-search-text {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .wildfire-home {
    padding: 70px 16px 50px;
  }
  
  .wildfire-home .wildfire-logo {
    max-width: 150px !important;
    max-height: 150px !important;
    width: 150px;
    height: 150px;
  }
  
  .wildfire-home .wildfire-logo-glow {
    width: 150px;
    height: 150px;
    filter: blur(30px);
  }
  
  .wildfire-home .wildfire-title {
    font-size: 28px;
  }
  
  .wildfire-home .wildfire-description {
    font-size: 15px;
    padding: 0 10px;
  }
  
  .wildfire-home .wildfire-button {
    padding: 10px 24px;
    font-size: 15px;
    gap: 8px;
  }
  
  .wildfire-home .home-search-button {
    width: 44px !important;
    min-width: 44px !important;
    max-width: 44px !important;
    padding: 0;
    justify-content: center;
    height: 44px;
  }
  
  .wildfire-home .home-search-text,
  .wildfire-home .home-search-shortcut {
    display: none;
  }
  
  .wildfire-home .search-icon {
    margin-right: 0;
  }
}

@media (max-height: 600px) and (orientation: landscape) {
  .wildfire-home {
    padding: 70px 24px 40px;
  }
  
  .wildfire-home .wildfire-logo {
    max-width: 140px !important;
    max-height: 140px !important;
    margin-bottom: 16px;
    width: 140px;
    height: 140px;
  }
  
  .wildfire-home .wildfire-logo-glow {
    width: 140px;
    height: 140px;
    filter: blur(30px);
  }
  
  .wildfire-home .wildfire-title {
    font-size: 32px;
    margin-bottom: 8px;
  }
  
  .wildfire-home .wildfire-description {
    margin-bottom: 20px;
  }
}
</style>
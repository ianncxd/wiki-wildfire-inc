<template>
  <div class="wildfire-home">
    <!-- Background imagine principală - mutată în HTML pentru control -->
    <img 
      src="/wallpaper/poza102.webp"
      alt=""
      class="wildfire-wallpaper"
      :class="{ 
        'wildfire-wallpaper-hover': isHovered,
        'wildfire-wallpaper-loaded': isLoaded 
      }"
      :style="{ opacity: isLoaded ? 1 : 0 }"
      width="1920"
      height="1080"
      fetchpriority="low"
      loading="lazy"
      decoding="async"
      role="presentation"
    />
    
    <!-- A doua imagine de background (overlay) -->
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
    
    <!-- Background CS2 Style (overlay) - apare instant -->
    <div class="wildfire-bg">
      <div class="wildfire-gradient"></div>
      <div class="wildfire-grid-primary"></div>
      <div class="wildfire-grid-secondary"></div>
      <div class="wildfire-scanlines"></div>
      <div class="wildfire-spotlight-tl"></div>
      <div class="wildfire-spotlight-br"></div>
    </div>
    
    <main class="wildfire-hero"></main>
      <div class="wildfire-container">
        <!-- Logo cu hover si efect de float -->
        <div class="wildfire-logo-container">
          <div class="wildfire-logo-glow"></div>
          <img 
            src="/icons/wildfire.webp" 
            alt="Wildfire.ro" 
            class="wildfire-logo"
            width="220"
            height="220"
            fetchpriority="high"
            decoding="sync"
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false"
          >
        </div>

        <!-- Titlu -->
        <h1 class="wildfire-title">
          <span class="wildfire-title-gradient">Wildfire.ro</span> Wiki
        </h1>
        
        <p class="wildfire-description">
          Comunitatea #1 de CS2 din România. Seriozitate, respect, distracție.
        </p>

        <!-- Buton cu hover -->
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
              width="18" 
              height="18"
              loading="lazy"
              decoding="async"
            >
            <span class="home-search-text">Caută în documentație...</span>
            <span class="home-search-shortcut">Ctrl K</span>
          </button>
        </div>

        <!-- Last Updates Component -->
        <LastUpdates />
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LastUpdates from './LastUpdates.vue'

const isHovered = ref(false)
const isLoaded = ref(false)
const isOverlayLoaded = ref(false)

// Funcția pentru search
const openSearch = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  
  console.log('Search clicked')
  
  const searchButton = document.querySelector('.DocSearch-Button')
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
  
  setTimeout(() => {
    const searchInput = document.querySelector('input[type="search"]')
    if (searchInput) {
      (searchInput as HTMLElement).focus()
    }
  }, 100)
}

// Preîncărcare inteligentă
onMounted(() => {
  // Imaginea principală
  const mainImg = new Image()
  mainImg.src = '/wallpaper/poza102.webp'
  mainImg.fetchPriority = 'low'
  mainImg.onload = () => {
    setTimeout(() => {
      isLoaded.value = true
    }, 100)
  }
  
  // Imaginea overlay - o încărcăm doar după ce apare hover-ul
  const overlayImg = new Image()
  overlayImg.src = '/wallpaper/da.webp'
  overlayImg.fetchPriority = 'low'
  overlayImg.onload = () => {
    isOverlayLoaded.value = true
  }
})
</script>

<style scoped>
.wildfire-home {
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  padding: 64px 24px 80px;
  min-height: 100vh;
}

/* ===== BACKGROUND IMAGINI ===== */
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
  
  opacity: 0;
  
  /* ACCELERARE HARDWARE */
  transform: translateZ(0);
  backface-visibility: hidden;
  
  /* Previne selecția */
  user-select: none;
  pointer-events: none;
}

.wildfire-wallpaper-overlay {
  z-index: -1;
  opacity: 0;
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.wildfire-wallpaper-loaded {
  opacity: 1 !important;
}

.wildfire-wallpaper-overlay-loaded {
  opacity: 1 !important;
}

.wildfire-wallpaper-hover {
  transform: scale(1.08) translateZ(0) !important;
  filter: brightness(1.08) contrast(1.08) saturate(1.1);
}

/* ===== BACKGROUND CS2 (OVERLAY) ===== */
.wildfire-home .wildfire-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  pointer-events: none;
  
  /* ACCELERARE HARDWARE */
  transform: translateZ(0);
}

/* LIGHT MODE - Overlay alb */
:not(.dark) .wildfire-home .wildfire-bg {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(2px);
}

:not(.dark) .wildfire-home .wildfire-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(220, 38, 38, 0.06), rgba(249, 115, 22, 0.03), rgba(255, 255, 255, 0.7));
}

/* ===== GRID-URI - FĂRĂ ANIMAȚIE IMPLICITĂ ===== */
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

/* ===== SPOTLIGHT-URI - ASCUNSE IMPLICIT ===== */
.wildfire-home .wildfire-spotlight-tl,
.wildfire-home .wildfire-spotlight-br {
  position: absolute;
  width: 384px;
  height: 384px;
  border-radius: 50%;
  filter: blur(48px);
  opacity: 0; /* ASCUNSE IMPLICIT */
  transition: opacity 0.3s ease;
  
  /* ACCELERARE HARDWARE */
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

/* DARK MODE - Overlay negru */
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

/* ===== EFECTE CÂND HOVER ===== */

/* SPOTLIGHT-URI - APAR LA HOVER */
.wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-spotlight-tl,
.wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-spotlight-br {
  opacity: 1;
  animation: spotlight-pulse 2.2s ease-in-out infinite;
}

.wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-spotlight-br {
  animation-delay: 0.3s;
}

/* GRID-URI - PULSEAZĂ LA HOVER */
.wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-grid-primary {
  animation: grid-pulse 2s ease-in-out infinite;
}

.wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-grid-secondary {
  animation: grid-pulse-slow 2.5s ease-in-out infinite;
}

/* LIGHT MODE - Animații grid */
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

/* DARK MODE - Animații grid */
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

/* ===== HERO SECTION ===== */
.wildfire-home .wildfire-hero {
  position: relative;
  z-index: 10;
  width: 100%;
  
  /* ACCELERARE HARDWARE */
  transform: translateZ(0);
}

.wildfire-home .wildfire-container {
  width: 100%;
}

/* Logo cu efect de FLOAT */
.wildfire-home .wildfire-logo-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  width: 100%;
}

.wildfire-home .wildfire-logo-glow {
  position: absolute;
  width: min(220px, 50vw);
  height: min(220px, 50vw);
  max-width: 220px;
  max-height: 220px;
  background: radial-gradient(circle, rgba(255, 69, 0, 0.25) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0;
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 1;
  
  /* ACCELERARE HARDWARE */
  transform: translateZ(0);
}

.wildfire-home .wildfire-logo {
  aspect-ratio: 1 / 1;
  width: auto !important;
  height: auto !important;
  max-width: min(220px, 50vw) !important;
  max-height: min(220px, 50vw) !important;
  object-fit: contain !important;
  position: relative;
  z-index: 2;
  cursor: pointer;
  
  /* DIMENSIUNI PENTRU LCP */
  width: 220px;
  height: 220px;
  
  animation: float 4s ease-in-out infinite;
  
  /* ACCELERARE HARDWARE */
  transform: translateZ(0);
  backface-visibility: hidden;
}

@keyframes float {
  0% { transform: translateY(0px) translateZ(0); }
  25% { transform: translateY(-6px) translateZ(0); }
  50% { transform: translateY(0px) translateZ(0); }
  75% { transform: translateY(6px) translateZ(0); }
  100% { transform: translateY(0px) translateZ(0); }
}

.wildfire-home .wildfire-logo:hover {
  animation: none;
  transform: scale(1.05) translateZ(0);
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.wildfire-home .wildfire-logo:hover + .wildfire-logo-glow {
  opacity: 1;
}

/* Titlu - CONTRAST ÎMBUNĂTĂȚIT */
.wildfire-home .wildfire-title {
  font-size: 52px;
  font-weight: 700;
  margin: 0 0 16px 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-align: center;
  color: #000000; /* NEGRU PENTRU CONTRAST MAXIM */
  position: relative;
  z-index: 20;
}

.dark .wildfire-home .wildfire-title {
  color: #ffffff; /* ALB PUR */
}

.wildfire-home .wildfire-title-gradient {
  background: linear-gradient(135deg, #ff4500, #ff8c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

/* Descriere - CONTRAST ÎMBUNĂTĂȚIT */
.wildfire-home .wildfire-description {
  font-size: 20px;
  color: #1f2937; /* GRI FOARTE ÎNCHIS */
  font-weight: 600; /* BOLD PENTRU LIZIBILITATE */
  max-width: 700px;
  margin: 0 auto 32px;
  line-height: 1.6;
  text-align: center;
  position: relative;
  z-index: 20;
}

.dark .wildfire-home .wildfire-description {
  color: #ffffff; /* ALB PUR */
  font-weight: 500;
}

/* Buton si wrapper - CONTRAST ÎMBUNĂTĂȚIT */
.wildfire-home .wildfire-button-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 20;
}

.wildfire-home .wildfire-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #c2410c; /* PORTOCALIU MAI ÎNCHIS */
  color: #ffffff; /* ALB PUR */
  padding: 14px 32px;
  border-radius: 40px;
  font-weight: 700; /* BOLD */
  font-size: 18px;
  text-decoration: none;
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 2px solid #000000; /* BORDER NEGRU */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3); /* UMBRĂ MAI ÎNCHISĂ */
  cursor: pointer;
  
  /* ACCELERARE HARDWARE */
  transform: translateZ(0);
}

.wildfire-home .wildfire-button:hover {
  background: #ff7b00; /* ROȘU-MARO PENTRU HOVER */
  transform: scale(1.05) translateZ(0);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
  gap: 20px;
}

.wildfire-home .wildfire-button-arrow {
  font-size: 20px;
  transition: transform 0.5s ease;
  color: #ffffff;
}

.wildfire-home .wildfire-button:hover .wildfire-button-arrow {
  transform: translateX(8px) translateZ(0);
}

/* HOME SEARCHBAR */
.wildfire-home .home-search {
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
  position: relative;
  z-index: 20;
}

.wildfire-home .home-search-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  padding: 18px 28px;
  background: white;
  border: 2px solid #000000; /* BORDER MAI GROS ȘI MAI ÎNCHIS */
  border-radius: 40px;
  color: #1f2937; /* TEXT MAI ÎNCHIS */
  font-size: 16px;
  font-weight: 600; /* BOLD */
  cursor: pointer;
  transition: all 0.5s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  height: 56px;
  
  /* ACCELERARE HARDWARE */
  transform: translateZ(0);
}

.dark .wildfire-home .home-search-button {
  background: rgba(0, 0, 0, 0.7); /* FUNDAL MAI OPAC */
  border: 2px solid #c2410c;
  color: #ffffff; /* ALB PUR */
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.wildfire-home .home-search-button:hover {
  border-color: #b91c1c;
  background: white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px) translateZ(0);
}

.dark .wildfire-home .home-search-button:hover {
  background: rgba(0, 0, 0, 0.8);
  border-color: #b9681c;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
}

.wildfire-home .search-icon {
  aspect-ratio: 1 / 1;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  filter: brightness(0); /* NEGRU */
  transition: filter 0.5s ease;
}

.dark .wildfire-home .search-icon {
  filter: brightness(0) invert(1); /* ALB */
}

.wildfire-home .home-search-text {
  flex: 1;
  text-align: left;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.5s ease;
  font-weight: 600;
}

:not(.dark) .wildfire-home .home-search-text {
  color: #1f2937; /* GRI ÎNCHIS */
}

.dark .wildfire-home .home-search-text {
  color: #ffffff; /* ALB */
}

/* HOME SEARCH SHORTCUT - CONTRAST MAXIM */
.wildfire-home .home-search-shortcut {
  font-size: 12px;
  font-weight: 700; /* BOLD */
  padding: 4px 10px;
  border-radius: 6px;
  margin-left: 8px;
  letter-spacing: 0.5px;
  transition: all 0.5s ease;
  background: #c2410c; /* PORTOCALIU ÎNCHIS */
  color: #ffffff; /* ALB PUR */
  border: 2px solid #000000; /* BORDER NEGRU */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* ACELAȘI STIL PENTRU AMBELE MODURI */
:not(.dark) .wildfire-home .home-search-shortcut,
.dark .wildfire-home .home-search-shortcut {
  background: #c2410c;
  color: #ffffff;
  border: 2px solid #000000;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .wildfire-home .wildfire-logo {
    max-width: 200px !important;
    max-height: 200px !important;
    width: 200px;
    height: 200px;
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
    padding: 48px 20px 60px;
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
    padding: 40px 16px 50px;
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

/* Landscape mode fix */
@media (max-height: 600px) and (orientation: landscape) {
  .wildfire-home {
    padding: 30px 24px 40px;
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
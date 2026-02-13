<template>
  <div class="wildfire-home">
    <!-- Background imagine cu efect de fade-in -->
    <div 
      class="wildfire-wallpaper" 
      :class="{ 
        'wildfire-wallpaper-hover': isHovered,
        'wildfire-wallpaper-loaded': isLoaded 
      }"
      :style="{ opacity: isLoaded ? 1 : 0 }"
    ></div>
    
    <!-- Background CS2 Style (overlay) - apare instant -->
    <div class="wildfire-bg">
      <div class="wildfire-gradient"></div>
      <div class="wildfire-grid-primary"></div>
      <div class="wildfire-grid-secondary"></div>
      <div class="wildfire-scanlines"></div>
      <div class="wildfire-spotlight-tl"></div>
      <div class="wildfire-spotlight-br"></div>
    </div>
    
    <div class="wildfire-hero">
      <div class="wildfire-container">
        <!-- Logo cu hover si efect de float -->
        <div class="wildfire-logo-container">
          <div class="wildfire-logo-glow"></div>
          <img 
            src="https://wildfire.ro/public/images/logo-sv22.png" 
            alt="Wildfire.ro" 
            class="wildfire-logo"
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

        <!-- Home Searchbar - FIXED ACUM -->
        <div class="home-search">
          <button class="home-search-button" @click="openSearch" type="button">
            <img src="/icons/searchbutton.svg" class="search-icon" alt="search">
            <span class="home-search-text">Caută în documentație...</span>
            <span class="home-search-shortcut">Ctrl K</span>
          </button>
        </div>

        <!-- Last Updates Component -->
        <LastUpdates />

        <!-- Carduri -->
        <div class="wildfire-grid">
          <div class="wildfire-card">
            <div class="wildfire-card-icon">🏛️</div>
            <h3>Seriozitate</h3>
            <p>6+ ani de experiență, administrare profesionistă, zero toleranță pentru abuzuri.</p>
            <a href="/informatii/despre" class="wildfire-card-link">Află mai multe →</a>
          </div>
          
          <div class="wildfire-card">
            <div class="wildfire-card-icon">👑</div>
            <h3>Staff matur</h3>
            <p>Oameni serioși, fair-play, mereu pregătiți să ajute comunitatea.</p>
            <a href="/informatii/staff" class="wildfire-card-link">Cunoaște echipa →</a>
          </div>
          
          <div class="wildfire-card">
            <div class="wildfire-card-icon">🤝</div>
            <h3>Respect</h3>
            <p>Fără toxicitate, fără favoritisme, fără pay-to-win. Doar CS2 curat.</p>
            <a href="/informatii/regulament" class="wildfire-card-link">Vezi regulamentul →</a>
          </div>
          
          <div class="wildfire-card">
            <div class="wildfire-card-icon">⚡</div>
            <h3>Comunitate</h3>
            <p>Peste 2300 de membri activi, evenimente săptămânale, turnee cu premii.</p>
            <a href="/comunitate/discord" class="wildfire-card-link">Alătură-te →</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LastUpdates from './LastUpdates.vue'

const isHovered = ref(false)
const isLoaded = ref(false)

// 🔴 FUNCȚIA CORECTĂ PENTRU SEARCH - exact ca în NavSearch.vue
const openSearch = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  
  console.log('Search clicked') // Pentru debug
  
  // Metoda 1: Caută butonul DocSearch
  const searchButton = document.querySelector('.DocSearch-Button')
  if (searchButton) {
    ;(searchButton as HTMLElement).click()
    return
  }
  
  // Metoda 2: Emite shortcut-ul corect (Ctrl+K)
  const event = new KeyboardEvent('keydown', {
    key: 'k',
    ctrlKey: true,
    metaKey: true, // Pentru Mac
    bubbles: true,
    cancelable: true
  })
  window.dispatchEvent(event)
  
  // Metoda 3: Fallback - caută inputul
  setTimeout(() => {
    const searchInput = document.querySelector('input[type="search"]')
    if (searchInput) {
      (searchInput as HTMLElement).focus()
    }
  }, 100)
}

// La montare, facem fade-in după un mic delay
onMounted(() => {
  // Preîncărcăm imaginea
  const img = new Image()
  img.src = '/wallpaper/poza2.jpg'
  img.onload = () => {
    // 🔴 MODIFICI AICI VITEZA BACKGROUND-ULUI
    // 🔴 Timpul în milisecunde până apare background-ul
    setTimeout(() => {
      isLoaded.value = true
    }, 100) // <-- 🔴 100ms = 0.1 secunde
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

/* ===== BACKGROUND IMAGINE ===== */
.wildfire-wallpaper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
  background-image: url('/wallpaper/poza102.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  
  /* 🔴 MODIFICI AICI VITEZA FADE-IN-ULUI */
  transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1),  /* <-- 🔴 1.2 secunde */
              transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1),
              filter 0.9s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Opacitate inițială 0 pentru fade-in */
  opacity: 0;
  
  /* Strat pentru poza3 la hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/wallpaper/da.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    opacity: 0;
    transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }
}

.wildfire-wallpaper-loaded {
  opacity: 1 !important;
}

.wildfire-wallpaper-hover {
  transform: scale(1.08) !important;
  filter: brightness(1.08) contrast(1.08) saturate(1.1);
  
  &::before {
    opacity: 1;
  }
  
  /* Tranziție mai lină la hover */
  transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1),
              transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1),
              filter 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ===== BACKGROUND CS2 (OVERLAY) - apare instant ===== */
.wildfire-home .wildfire-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  pointer-events: none;
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

:not(.dark) .wildfire-home .wildfire-grid-primary {
  position: absolute;
  inset: 0;
  opacity: 0.08;
  background-image: 
    linear-gradient(to right, rgba(255, 69, 0, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 69, 0, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
}

:not(.dark) .wildfire-home .wildfire-grid-secondary {
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background-image: 
    linear-gradient(to right, rgba(255, 140, 0, 0.07) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 140, 0, 0.07) 1px, transparent 1px);
  background-size: 20px 20px;
}

:not(.dark) .wildfire-home .wildfire-scanlines {
  position: absolute;
  inset: 0;
  opacity: 0.02;
  background-image: repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 2px);
  background-size: 100% 2px;
}

:not(.dark) .wildfire-home .wildfire-spotlight-tl {
  position: absolute;
  top: 0;
  left: 25%;
  width: 384px;
  height: 384px;
  background: rgba(220, 38, 38, 0.06);
  border-radius: 50%;
  filter: blur(48px);
  animation: pulse-cs2-light 8s infinite;
}

:not(.dark) .wildfire-home .wildfire-spotlight-br {
  position: absolute;
  bottom: 0;
  right: 25%;
  width: 384px;
  height: 384px;
  background: rgba(249, 115, 22, 0.04);
  border-radius: 50%;
  filter: blur(48px);
  animation: pulse-cs2-light 10s infinite;
  animation-delay: 2s;
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
  position: absolute;
  inset: 0;
  opacity: 0.15;
  background-image: 
    linear-gradient(to right, rgba(255, 69, 0, 0.2) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 69, 0, 0.2) 1px, transparent 1px);
  background-size: 40px 40px;
}

.dark .wildfire-home .wildfire-grid-secondary {
  position: absolute;
  inset: 0;
  opacity: 0.1;
  background-image: 
    linear-gradient(to right, rgba(255, 140, 0, 0.15) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 140, 0, 0.15) 1px, transparent 1px);
  background-size: 20px 20px;
}

.dark .wildfire-home .wildfire-scanlines {
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background-image: repeating-linear-gradient(0deg, rgba(0,0,0,0.8) 0px, rgba(0,0,0,0.8) 1px, transparent 1px, transparent 2px);
  background-size: 100% 2px;
}

.dark .wildfire-home .wildfire-spotlight-tl {
  position: absolute;
  top: 0;
  left: 25%;
  width: 384px;
  height: 384px;
  background: rgba(220, 38, 38, 0.2);
  border-radius: 50%;
  filter: blur(48px);
  animation: pulse-cs2-dark 8s infinite;
}

.dark .wildfire-home .wildfire-spotlight-br {
  position: absolute;
  bottom: 0;
  right: 25%;
  width: 384px;
  height: 384px;
  background: rgba(234, 88, 12, 0.2);
  border-radius: 50%;
  filter: blur(48px);
  animation: pulse-cs2-dark 10s infinite;
  animation-delay: 2s;
}

@keyframes pulse-cs2-light {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.05); }
}

@keyframes pulse-cs2-dark {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(1.05); }
}

/* ===== EFECTE CÂND HOVER ===== */
.wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-grid-primary {
  animation: grid-pulse 2s ease-in-out infinite !important;
}

.wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-grid-secondary {
  animation: grid-pulse-slow 2.5s ease-in-out infinite !important;
}

.wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-spotlight-tl {
  animation: spotlight-pulse 2.2s ease-in-out infinite !important;
}

.wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-spotlight-br {
  animation: spotlight-pulse 2.2s ease-in-out infinite !important;
  animation-delay: 0.3s !important;
}

/* LIGHT MODE - Animații grid */
@keyframes grid-pulse {
  0% {
    opacity: 0.08;
    transform: scale(1);
  }
  50% {
    opacity: 0.2;
    transform: scale(1.02);
  }
  100% {
    opacity: 0.08;
    transform: scale(1);
  }
}

@keyframes grid-pulse-slow {
  0% {
    opacity: 0.05;
    transform: scale(1);
  }
  50% {
    opacity: 0.15;
    transform: scale(1.03);
  }
  100% {
    opacity: 0.05;
    transform: scale(1);
  }
}

@keyframes spotlight-pulse {
  0% {
    opacity: 0.2;
    transform: scale(1);
    filter: blur(48px);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
    filter: blur(52px);
  }
  100% {
    opacity: 0.2;
    transform: scale(1);
    filter: blur(48px);
  }
}

/* DARK MODE - Animații grid */
.dark .wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-grid-primary {
  animation: grid-pulse-dark 2s ease-in-out infinite !important;
}

.dark .wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-grid-secondary {
  animation: grid-pulse-slow-dark 2.5s ease-in-out infinite !important;
}

.dark .wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-spotlight-tl {
  animation: spotlight-pulse-dark 2.2s ease-in-out infinite !important;
}

.dark .wildfire-wallpaper-hover ~ .wildfire-bg .wildfire-spotlight-br {
  animation: spotlight-pulse-dark 2.2s ease-in-out infinite !important;
  animation-delay: 0.3s !important;
}

@keyframes grid-pulse-dark {
  0% {
    opacity: 0.15;
    transform: scale(1);
  }
  50% {
    opacity: 0.28;
    transform: scale(1.02);
  }
  100% {
    opacity: 0.15;
    transform: scale(1);
  }
}

@keyframes grid-pulse-slow-dark {
  0% {
    opacity: 0.1;
    transform: scale(1);
  }
  50% {
    opacity: 0.22;
    transform: scale(1.03);
  }
  100% {
    opacity: 0.1;
    transform: scale(1);
  }
}

@keyframes spotlight-pulse-dark {
  0% {
    opacity: 0.2;
    transform: scale(1);
    filter: blur(48px);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
    filter: blur(52px);
  }
  100% {
    opacity: 0.2;
    transform: scale(1);
    filter: blur(48px);
  }
}

/* ===== HERO SECTION ===== */
.wildfire-home .wildfire-hero {
  position: relative;
  z-index: 10;
  width: 100%;
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
}

.wildfire-home .wildfire-logo {
  width: auto !important;
  height: auto !important;
  max-width: min(220px, 50vw) !important;
  max-height: min(220px, 50vw) !important;
  object-fit: contain !important;
  position: relative;
  z-index: 2;
  cursor: pointer;
  
  /* EFECT DE FLOAT - animație continuă smooth */
  animation: float 4s ease-in-out infinite;
}

/* Animația de float - smooth și natural */
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  25% {
    transform: translateY(-6px);
  }
  50% {
    transform: translateY(0px);
  }
  75% {
    transform: translateY(6px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* La hover, float-ul se oprește ușor și logo-ul pulsează */
.wildfire-home .wildfire-logo:hover {
  animation: none;
  transform: scale(1.05);
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.wildfire-home .wildfire-logo:hover + .wildfire-logo-glow {
  opacity: 1;
}

/* Titlu */
.wildfire-home .wildfire-title {
  font-size: 52px;
  font-weight: 700;
  margin: 0 0 16px 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-align: center;
  color: #111827;
  position: relative;
  z-index: 20;
}

.dark .wildfire-home .wildfire-title {
  color: white;
}

.wildfire-home .wildfire-title-gradient {
  background: linear-gradient(135deg, #ff4500, #ff8c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

/* Descriere */
.wildfire-home .wildfire-description {
  font-size: 20px;
  color: #6b7280;
  max-width: 700px;
  margin: 0 auto 32px;
  line-height: 1.6;
  text-align: center;
  position: relative;
  z-index: 20;
}

.dark .wildfire-home .wildfire-description {
  color: #9ca3af;
}

/* Buton si wrapper */
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
  background: #ff4500;
  color: white;
  padding: 14px 32px;
  border-radius: 40px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: none;
  box-shadow: 0 8px 20px rgba(255, 69, 0, 0.25);
  cursor: pointer;
}

.wildfire-home .wildfire-button:hover {
  background: #ff8c00;
  transform: scale(1.05);
  box-shadow: 0 12px 28px rgba(255, 69, 0, 0.35);
  gap: 20px;
}

.wildfire-home .wildfire-button-arrow {
  font-size: 20px;
  transition: transform 0.5s ease;
}

.wildfire-home .wildfire-button:hover .wildfire-button-arrow {
  transform: translateX(8px);
}

/* HOME SEARCHBAR - FIXED ACUM */
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
  padding: 18px 28px;  /* <-- 🔴 14px → 18px (mai mult padding sus-jos) */
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 40px;
  color: #4b5563;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.5s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 56px;        /* <-- 🔴 48px → 56px (mai înalt) */
}

.dark .wildfire-home .home-search-button {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 69, 0, 0.3);
  color: white;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.wildfire-home .home-search-button:hover {
  border-color: #ff4500;
  background: white;
  box-shadow: 0 8px 25px rgba(255, 69, 0, 0.1);
  transform: translateY(-2px);
}

.dark .wildfire-home .home-search-button:hover {
  background: rgba(255, 69, 0, 0.1);
  border-color: #ff4500;
  box-shadow: 0 8px 25px rgba(255, 69, 0, 0.2);
}

.wildfire-home .search-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  filter: brightness(0) saturate(100%) invert(45%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(97%) contrast(92%);
  transition: filter 0.5s ease;
}

.dark .wildfire-home .search-icon {
  filter: brightness(0) saturate(100%) invert(100%);
}

.wildfire-home .home-search-text {
  flex: 1;
  text-align: left;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.5s ease;
}

:not(.dark) .wildfire-home .home-search-text {
  color: #4b5563;
}

.dark .wildfire-home .home-search-text {
  color: white;
}

.wildfire-home .home-search-shortcut {
  font-size: 12px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
  letter-spacing: 0.5px;
  transition: all 0.5s ease;
}

:not(.dark) .wildfire-home .home-search-shortcut {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  color: #6b7280;
}

.dark .wildfire-home .home-search-shortcut {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

/* Grid carduri */
.wildfire-home .wildfire-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
  position: relative;
  z-index: 20;
}

@media (max-width: 768px) {
  .wildfire-home .wildfire-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.wildfire-home .wildfire-card {
  padding: 28px;
  background: white;
  border: 1px solid #edf2f7;
  border-radius: 20px;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;
}

.dark .wildfire-home .wildfire-card {
  background: #111111;
  border-color: #2a2a2a;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.wildfire-home .wildfire-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 0;
  background: linear-gradient(to bottom, #ff4500, #ff8c00);
  transition: height 0.6s ease;
}

.wildfire-home .wildfire-card:hover::before {
  height: 100%;
}

.wildfire-home .wildfire-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 32px -12px rgba(255, 69, 0, 0.2);
  border-color: rgba(255, 69, 0, 0.3);
}

.wildfire-home .wildfire-card-icon {
  font-size: 34px;
  margin-bottom: 18px;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.wildfire-home .wildfire-card:hover .wildfire-card-icon {
  transform: scale(1.15);
}

.wildfire-home .wildfire-card h3 {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 14px 0;
  color: #111827;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
}

.dark .wildfire-home .wildfire-card h3 {
  color: white;
}

.wildfire-home .wildfire-card p {
  font-size: 15px;
  color: #6b7280;
  margin: 0 0 22px 0;
  line-height: 1.7;
  transition: color 0.3s ease;
}

.dark .wildfire-home .wildfire-card p {
  color: #9ca3af;
}

.wildfire-home .wildfire-card-link {
  color: #ff4500;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.5s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.wildfire-home .wildfire-card-link:hover {
  color: #ff8c00;
  gap: 15px;
}

/* ===== RESPONSIVE ===== */
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
  
  .wildfire-home .wildfire-grid {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .wildfire-home {
    padding: 48px 20px 60px;
  }
  
  .wildfire-home .wildfire-logo {
    max-width: 180px !important;
    max-height: 180px !important;
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
  
  .wildfire-home .wildfire-grid {
    gap: 16px;
  }
  
  .wildfire-home .wildfire-card {
    padding: 24px;
  }
  
  .wildfire-home .wildfire-card h3 {
    font-size: 20px;
  }
  
  .wildfire-home .wildfire-card p {
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
  
  .wildfire-home .wildfire-card {
    padding: 20px;
  }
  
  .wildfire-home .wildfire-card h3 {
    font-size: 18px;
  }
  
  .wildfire-home .wildfire-card p {
    font-size: 13px;
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
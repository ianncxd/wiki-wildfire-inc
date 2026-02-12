<template>
  <div class="wildfire-home">
    <!-- Background CS2 Style - DINAMIC DUPĂ THEME -->
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
        <!-- Logo -->
        <div class="wildfire-logo-wrapper">
          <div class="wildfire-logo-glow"></div>
          <img 
            src="https://wildfire.ro/public/images/logo-sv22.png" 
            alt="Wildfire.ro" 
            class="wildfire-logo"
          >
        </div>

        <!-- Titlu -->
        <h1 class="wildfire-title">
          <span class="wildfire-title-gradient">Wildfire.ro</span> Wiki
        </h1>
        
        <p class="wildfire-description">
          Comunitatea #1 de CS2 din România. Seriozitate, respect, distracție.
        </p>

        <!-- Buton Get Started -->
        <div class="wildfire-actions">
          <a href="/informatii/despre" class="wildfire-button">
            <span>Ghid de pornire</span>
            <span class="wildfire-button-arrow">→</span>
          </a>
        </div>

        <!-- ULTIMELE ACTUALIZĂRI - COMPONENTĂ SEPARATĂ -->
        <LastUpdates />

        <!-- Grid 2x2 carduri -->
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
import LastUpdates from './LastUpdates.vue'
</script>

<style scoped>
/* ===== DOAR HOME PAGE ===== */
.wildfire-home {
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  padding: 64px 24px 80px;
  min-height: 100vh;
}

/* ===== BACKGROUND CS2 - DOAR BACKGROUND, FĂRĂ TEXT ===== */
/* LIGHT MODE - Background CS2 pe alb */
.wildfire-home .wildfire-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  pointer-events: none;
  background: #ffffff;
}

.wildfire-home .wildfire-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(220, 38, 38, 0.06), rgba(249, 115, 22, 0.03), #ffffff);
}

.wildfire-home .wildfire-grid-primary {
  position: absolute;
  inset: 0;
  opacity: 0.08;
  background-image: 
    linear-gradient(to right, rgba(255, 69, 0, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 69, 0, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
}

.wildfire-home .wildfire-grid-secondary {
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background-image: 
    linear-gradient(to right, rgba(255, 140, 0, 0.07) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 140, 0, 0.07) 1px, transparent 1px);
  background-size: 20px 20px;
}

.wildfire-home .wildfire-scanlines {
  position: absolute;
  inset: 0;
  opacity: 0.02;
  background-image: repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 2px);
  background-size: 100% 2px;
}

.wildfire-home .wildfire-spotlight-tl {
  position: absolute;
  top: 0;
  left: 25%;
  width: 384px;
  height: 384px;
  background: rgba(220, 38, 38, 0.06);
  border-radius: 50%;
  filter: blur(48px);
  animation: pulse-cs2 8s infinite;
}

.wildfire-home .wildfire-spotlight-br {
  position: absolute;
  bottom: 0;
  right: 25%;
  width: 384px;
  height: 384px;
  background: rgba(249, 115, 22, 0.04);
  border-radius: 50%;
  filter: blur(48px);
  animation: pulse-cs2 10s infinite;
  animation-delay: 2s;
}

/* DARK MODE - Background CS2 pe negru */
.dark .wildfire-home .wildfire-bg {
  background: #000000;
}

.dark .wildfire-home .wildfire-gradient {
  background: linear-gradient(to bottom, rgba(69, 10, 10, 0.4), rgba(30, 15, 0, 0.3), #000000);
}

.dark .wildfire-home .wildfire-grid-primary {
  opacity: 0.15;
  background-image: 
    linear-gradient(to right, rgba(255, 69, 0, 0.2) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 69, 0, 0.2) 1px, transparent 1px);
}

.dark .wildfire-home .wildfire-grid-secondary {
  opacity: 0.1;
  background-image: 
    linear-gradient(to right, rgba(255, 140, 0, 0.15) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 140, 0, 0.15) 1px, transparent 1px);
}

.dark .wildfire-home .wildfire-scanlines {
  opacity: 0.05;
  background-image: repeating-linear-gradient(0deg, rgba(0,0,0,0.8) 0px, rgba(0,0,0,0.8) 1px, transparent 1px, transparent 2px);
}

.dark .wildfire-home .wildfire-spotlight-tl {
  background: rgba(220, 38, 38, 0.2);
}

.dark .wildfire-home .wildfire-spotlight-br {
  background: rgba(234, 88, 12, 0.2);
}

@keyframes pulse-cs2 {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.3; }
}

/* ===== RESTUL - EXACT CUM ERA ===== */
.wildfire-home .wildfire-hero {
  position: relative;
  z-index: 10;
  width: 100%;
}

.wildfire-home .wildfire-container {
  width: 100%;
}

/* Logo */
.wildfire-home .wildfire-logo-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
}

.wildfire-home .wildfire-logo-glow {
  position: absolute;
  width: 600px;
  height: 180px;
  background: radial-gradient(circle, rgba(255, 69, 0, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(50px);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.wildfire-home .wildfire-logo-wrapper:hover .wildfire-logo-glow {
  opacity: 1;
}

.wildfire-home .wildfire-logo {
  width: 500px !important;
  height: auto !important;
  max-height: 150px !important;
  object-fit: contain !important;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.wildfire-home .wildfire-logo-wrapper:hover .wildfire-logo {
  transform: scale(1.02);
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

/* Buton */
.wildfire-home .wildfire-actions {
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
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
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 8px 20px rgba(255, 69, 0, 0.25);
}

.wildfire-home .wildfire-button:hover {
  background: #ff8c00;
  transform: scale(1.05);
  box-shadow: 0 12px 28px rgba(255, 69, 0, 0.35);
  gap: 16px;
}

.wildfire-home .wildfire-button-arrow {
  font-size: 20px;
  transition: transform 0.2s ease;
}

.wildfire-home .wildfire-button:hover .wildfire-button-arrow {
  transform: translateX(4px);
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
  transition: all 0.3s ease;
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
  transition: height 0.25s ease;
}

.wildfire-home .wildfire-card:hover::before {
  height: 100%;
}

.wildfire-home .wildfire-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 24px -8px rgba(255, 69, 0, 0.12);
  border-color: rgba(255, 69, 0, 0.2);
}

.wildfire-home .wildfire-card-icon {
  font-size: 34px;
  margin-bottom: 18px;
  transition: transform 0.3s ease;
}

.wildfire-home .wildfire-card:hover .wildfire-card-icon {
  transform: scale(1.1);
}

.wildfire-home .wildfire-card h3 {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 14px 0;
  color: #111827;
  letter-spacing: -0.01em;
}

.dark .wildfire-home .wildfire-card h3 {
  color: white;
}

.wildfire-home .wildfire-card p {
  font-size: 15px;
  color: #6b7280;
  margin: 0 0 22px 0;
  line-height: 1.7;
}

.dark .wildfire-home .wildfire-card p {
  color: #9ca3af;
}

.wildfire-home .wildfire-card-link {
  color: #ff4500;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.wildfire-home .wildfire-card-link:hover {
  color: #ff8c00;
  gap: 12px;
}

.wildfire-home .wildfire-link-arrow {
  transition: transform 0.2s ease;
}

.wildfire-home .wildfire-card-link:hover .wildfire-link-arrow {
  transform: translateX(4px);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .wildfire-home .wildfire-logo {
    width: 400px !important;
    max-height: 120px !important;
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
    width: 320px !important;
    max-height: 100px !important;
  }
  
  .wildfire-home .wildfire-logo-glow {
    width: 400px;
    height: 120px;
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
    width: 280px !important;
    max-height: 90px !important;
  }
  
  .wildfire-home .wildfire-logo-glow {
    width: 320px;
    height: 100px;
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
    width: 250px !important;
    max-height: 80px !important;
    margin-bottom: 16px;
  }
  
  .wildfire-home .wildfire-title {
    font-size: 32px;
    margin-bottom: 8px;
  }
  
  .wildfire-home .wildfire-description {
    margin-bottom: 20px;
  }
  
  .wildfire-home .wildfire-actions {
    margin-bottom: 30px;
  }
}
</style>
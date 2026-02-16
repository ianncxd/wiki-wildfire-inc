<template>
  <div v-if="isHomePage" class="footer-container">
    <!-- Background pattern -->
    <div class="footer-bg">
      <div class="bg-grid"></div>
      <div class="bg-glow"></div>
    </div>
    
    <div class="footer-content">
      <!-- FOOTER BOTTOM -->
      <div class="footer-bottom">
        <!-- Separator cu temă foc -->
        <div class="footer-separator">
          <span class="separator-flame-left"></span>
          <span class="separator-icon">🔥</span>
          <span class="separator-flame-right"></span>
        </div>
        
        <!-- BRAND SECTION CU EFECT DE INEL ROTITOR -->
        <div class="brand-section">
          <div class="brand-logo-wrapper">
            <div class="brand-logo">
              <img src="/icons/wildfire.webp" alt="Wildfire.ro" class="logo-img">
            </div>
            <div class="logo-ring"></div>
          </div>
          <div class="brand-text">
            <h2 class="brand-name">WILDFIRE<span class="brand-dot">.ro</span></h2>
            <p class="brand-tagline">unde comunitatea arde cel mai tare</p>
          </div>
        </div>

        <!-- NAV LINKS -->
        <div class="nav-links">
          <a href="/informatii/about" class="nav-link">Despre</a>
          <span class="nav-separator">✦</span>
          <a href="/informatii/contact" class="nav-link">Contact</a>
          <span class="nav-separator">✦</span>
          <a href="/informatii/regulamente/regulament-playeri" class="nav-link">Regulament</a>
          <span class="nav-separator">✦</span>
          <a href="/informatii/faq" class="nav-link">FAQ</a>
          <span class="nav-separator">✦</span>
          <a href="/informatii/termeni" class="nav-link">Termeni</a>
        </div>

        <!-- INFO SECTION -->
        <div class="info-section">
          <div class="info-quote">din cenușă, ardem mai tare</div>
          <div class="info-copyright">© 2024 wildfire.ro</div>
        </div>

        <!-- MADE BY -->
        <div class="made-by-container">
          <div class="made-by-wrapper">
            <span class="made-by-label">made by</span>
            <span class="made-by-names">
              <span class="name-iannc">iannC</span>
              <span class="name-amp">✦</span>
              <span class="name-trapi">Trapi</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page } = useData()

const isHomePage = computed(() => {
  return page.value.relativePath === 'index.md'
})
</script>

<style scoped>
/* ===== WILDFIRE FOOTER ===== */

.footer-container {
  width: 100%;
  background: #080808;
  position: relative;
  z-index: 100;
  margin-top: 60px;
  border-top: 1px solid #ff4500;
  overflow: hidden;
}

/* Background elements */
.footer-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}

.bg-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(255, 69, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 69, 0, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}

.bg-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 50%, rgba(255, 69, 0, 0.05) 0%, transparent 70%);
}

.footer-content {
  max-width: 1300px;
  margin: 0 auto;
  padding: 40px 30px 20px;
  position: relative;
  z-index: 2;
}

/* ===== FOOTER BOTTOM ===== */
.footer-bottom {
  position: relative;
  padding-top: 20px;
}

/* Separator cu temă foc */
.footer-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
}

.separator-flame-left,
.separator-flame-right {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ff8c00, #ff4500, #ff8c00, transparent);
}

.separator-icon {
  color: #ff4500;
  font-size: 16px;
}

/* Brand section cu inel rotitor */
.brand-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 25px;
  position: relative;
}

.brand-logo-wrapper {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-logo {
  width: 50px;
  height: 50px;
  position: relative;
  z-index: 2;
}

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 10px rgba(255, 69, 0, 0.3));
}

.logo-ring {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border: 1px solid transparent;
  border-radius: 50%;
  border-top-color: #ff8c00;
  border-bottom-color: #ff4500;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: ringSpin 3s linear infinite;
  opacity: 0.7;
}

@keyframes ringSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.brand-text {
  text-align: left;
}

.brand-name {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 2px 0;
  color: #fff;
  letter-spacing: 1px;
}

.brand-dot {
  color: #ff4500;
  font-weight: 400;
}

.brand-tagline {
  font-size: 12px;
  color: #777;
  margin: 0;
  font-style: italic;
}

/* Nav links */
.nav-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.nav-link {
  color: #aaa;
  text-decoration: none;
  font-size: 12px;
  transition: color 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-link:hover {
  color: #ff8c00;
}

.nav-separator {
  color: #ff4500;
  font-size: 10px;
  opacity: 0.7;
}

/* Info section */
.info-section {
  text-align: center;
  margin-bottom: 25px;
  position: relative;
}

.info-quote {
  font-size: 13px;
  color: #ff8c00;
  margin: 15px 0;
  font-style: italic;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
}

.info-copyright {
  color: #444;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* ===== MADE BY ===== */
.made-by-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}

.made-by-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: rgba(17, 17, 17, 0.5);
  border-radius: 30px;
  border: 1px solid rgba(255, 69, 0, 0.2);
}

.made-by-label {
  color: #555;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.made-by-names {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
}

.name-iannc {
  color: #a78bfa;
}

.name-amp {
  color: #ff4500;
  font-size: 9px;
}

.name-trapi {
  color: #f87171;
}

.name-iannc:hover,
.name-trapi:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-content {
    padding: 30px 20px 15px;
  }
  
  .brand-section {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
  
  .brand-text {
    text-align: center;
  }
  
  .nav-links {
    gap: 10px;
  }
  
  .nav-link {
    font-size: 11px;
  }
  
  .separator-flame-left,
  .separator-flame-right {
    width: 40px;
  }
}

@media (max-width: 480px) {
  .nav-links {
    flex-direction: column;
    gap: 8px;
  }
  
  .nav-separator {
    display: none;
  }
  
  .made-by-wrapper {
    flex-direction: column;
    gap: 4px;
    padding: 8px 16px;
  }
}
</style>
<template>
  <div v-if="isHomePage" class="footer-container">
    <div class="footer-content">
      <!-- HERO SECTION - WILDFIRE IMPACT -->
      <div class="wildfire-hero">
        <div class="hero-bg">
          <div class="hero-particle particle-1"></div>
          <div class="hero-particle particle-2"></div>
          <div class="hero-particle particle-3"></div>
          <div class="hero-particle particle-4"></div>
        </div>
        <div class="hero-text-wrapper">
          <div class="hero-glitch">WILDFIRE.RO</div>
          <div class="hero-glow"></div>
        </div>
        <div class="hero-divider">
          <span class="divider-flame"></span>
          <span class="divider-flame"></span>
          <span class="divider-flame"></span>
        </div>
      </div>

      <!-- SITEMAP GRID - MODERN CARDS -->
      <div class="sitemap-grid">
        <div v-for="(section, index) in sidebarSections" :key="section.text" 
             class="sitemap-card" :class="`card-${index + 1}`" 
             :style="{ '--card-color': getCategoryColor(section.cleanText) }">
          <div class="card-header">
            <h3 class="card-title">{{ section.cleanText }}</h3>
            <div class="card-accent"></div>
          </div>
          <ul class="card-list">
            <li v-for="item in section.items" :key="item.link">
              <div v-if="item.items" class="card-subsection">
                <span class="subsection-badge">{{ item.cleanText }}</span>
                <ul class="subsection-list">
                  <li v-for="sub in item.items" :key="sub.link">
                    <a :href="sub.link" class="card-link sub-link">
                      <span class="link-indicator"></span>
                      {{ sub.cleanText }}
                    </a>
                  </li>
                </ul>
              </div>
              <a v-else :href="item.link" class="card-link main-link">
                <span class="link-indicator"></span>
                {{ item.cleanText }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- FOOTER BOTTOM - MODERN -->
      <div class="footer-bottom">
        <div class="bottom-gradient"></div>
        
        <!-- BRAND SECTION -->
        <div class="brand-section">
          <div class="brand-logo">
            <img src="https://wildfire.ro/public/images/logo-sv22.png" alt="Wildfire.ro" class="logo-img">
            <div class="logo-ring"></div>
          </div>
          <div class="brand-text">
            <h2 class="brand-name">WILDFIRE<span class="brand-dot">.ro</span></h2>
            <p class="brand-tagline">unde comunitatea arde cel mai tare</p>
          </div>
        </div>

        <!-- NAV LINKS -->
        <div class="nav-links">
          <a href="/informatii/about" class="nav-link">
            <span>Despre</span>
            <span class="nav-hover"></span>
          </a>
          <span class="nav-separator">//</span>
          <a href="/informatii/contact" class="nav-link">
            <span>Contact</span>
            <span class="nav-hover"></span>
          </a>
          <span class="nav-separator">//</span>
          <a href="/informatii/regulamente/regulament-playeri" class="nav-link">
            <span>Regulament</span>
            <span class="nav-hover"></span>
          </a>
          <span class="nav-separator">//</span>
          <a href="/informatii/faq" class="nav-link">
            <span>FAQ</span>
            <span class="nav-hover"></span>
          </a>
          <span class="nav-separator">//</span>
          <a href="/informatii/termeni" class="nav-link">
            <span>Termeni</span>
            <span class="nav-hover"></span>
          </a>
        </div>

        <!-- INFO SECTION -->
        <div class="info-section">
          <div class="info-stats">
            <span class="stat-badge">📄 {{ totalPages }} pagini</span>
            <span class="stat-badge">📌 {{ totalSections }} secțiuni</span>
          </div>
          
          <div class="info-quote">🔥 din cenușă, ardem mai tare ca niciodată 🔥</div>
          
          <div class="info-copyright">© 2024 wildfire.ro - toate drepturile sunt ale comunității</div>
        </div>

        <!-- MADE BY - CENTERED & STYLISH -->
        <div class="made-by-container">
          <div class="made-by-wrapper">
            <div class="made-by-content">
              <span class="made-by-label">Made by</span>
              <div class="made-by-names">
                <span class="name-iannc">iannC</span>
                <span class="name-amp">✦</span>
                <span class="name-trapi">Trapi</span>
              </div>
            </div>
            <div class="made-by-glow"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useData } from 'vitepress'

const { page, theme } = useData()

const timeOfDay = ref(getTimeOfDay())

function getTimeOfDay() {
  const hour = new Date().getHours()
  if (hour < 12) return 'dimineață'
  if (hour < 18) return 'după-amiază'
  return 'seară'
}

onMounted(() => {
  console.log('%c🔥🔥🔥 WILDFIRE FOOTER - NEXT GEN 🔥🔥🔥', 
    'background: linear-gradient(135deg, #ff4500, #ff8c00, #ff4500); color: white; font-size: 16px; padding: 8px; border-radius: 8px; font-weight: bold;')
  console.log('%c🔥 iannC (mov) & Trapi (roșu) - 2024 🔥', 
    'background: linear-gradient(135deg, #8b5cf6, #ff0000); color: white; font-size: 14px; padding: 6px; border-radius: 6px;')
  console.log(`%c🕐 ${timeOfDay.value}`, 'color: #ff8c00; font-size: 12px;')
})

const isHomePage = computed(() => {
  return page.value.relativePath === 'index.md'
})

const cleanText = (htmlString) => {
  if (!htmlString) return ''
  const div = document.createElement('div')
  div.innerHTML = htmlString
  return div.textContent || div.innerText || ''
}

const sidebarSections = computed(() => {
  const sidebar = theme.value?.sidebar || []
  
  if (Array.isArray(sidebar)) {
    return sidebar.map(section => {
      const cleanSectionText = cleanText(section.text)
      return {
        text: section.text,
        cleanText: cleanSectionText,
        items: extractItems(section.items || [])
      }
    }).filter(section => section.items.length > 0)
  }
  return []
})

const extractItems = (items) => {
  return items.map(item => {
    const cleanItemText = cleanText(item.text)
    if (item.items) {
      return {
        text: item.text,
        cleanText: cleanItemText,
        link: item.link,
        items: extractItems(item.items)
      }
    }
    return {
      text: item.text,
      cleanText: cleanItemText,
      link: item.link || '#'
    }
  })
}

const totalPages = computed(() => {
  let count = 0
  const countItems = (items) => {
    items.forEach(item => {
      if (item.link && item.link !== '#') count++
      if (item.items) countItems(item.items)
    })
  }
  sidebarSections.value.forEach(section => countItems(section.items))
  return count
})

const totalSections = computed(() => sidebarSections.value.length)

const getCategoryColor = (text) => {
  const t = text?.toLowerCase() || ''
  if (t.includes('informații')) return '#3b82f6'
  if (t.includes('sisteme')) return '#ff8c00'
  if (t.includes('shop')) return '#8b5cf6'
  if (t.includes('premium')) return '#8b5cf6'
  return '#ff8c00'
}
</script>

<style scoped>
/* ===== WILDFIRE FOOTER - NEXT GEN ===== */

/* Container */
.footer-container {
  width: 100%;
  background: #030303;
  position: relative;
  z-index: 100;
  margin-top: 100px;
  overflow: hidden;
  border-top: 2px solid #ff8c00;
  box-shadow: 0 -20px 40px rgba(255, 69, 0, 0.2);
}

/* Background pattern */
.footer-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(255, 69, 0, 0.03) 0%, transparent 30%),
    radial-gradient(circle at 80% 70%, rgba(255, 140, 0, 0.03) 0%, transparent 40%),
    repeating-linear-gradient(45deg, rgba(255, 140, 0, 0.02) 0px, rgba(255, 140, 0, 0.02) 2px, transparent 2px, transparent 20px);
  pointer-events: none;
}

.footer-content {
  max-width: 1300px;
  margin: 0 auto;
  padding: 60px 30px 40px;
  position: relative;
  z-index: 2;
}

/* ===== HERO SECTION ===== */
.wildfire-hero {
  position: relative;
  height: 150px;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #1a0a0a, #000000, #1a0a0a);
  z-index: 1;
}

.hero-particle {
  position: absolute;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255, 69, 0, 0.2), transparent 70%);
  border-radius: 50%;
  filter: blur(40px);
  animation: particleFloat 15s ease-in-out infinite;
}

.particle-1 { top: -50px; left: -50px; animation-delay: 0s; }
.particle-2 { bottom: -50px; right: -50px; animation-delay: 5s; }
.particle-3 { top: 20px; right: 20%; animation-delay: 7s; }
.particle-4 { bottom: 30px; left: 20%; animation-delay: 3s; }

@keyframes particleFloat {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
  33% { transform: translate(30px, -30px) scale(1.2); opacity: 0.5; }
  66% { transform: translate(-20px, 20px) scale(0.9); opacity: 0.4; }
}

.hero-text-wrapper {
  position: relative;
  z-index: 10;
  text-align: center;
}

.hero-glitch {
  font-size: 64px;
  font-weight: 900;
  text-transform: uppercase;
  color: white;
  text-shadow: 
    0 0 10px #ff4500,
    0 0 20px #ff8c00,
    0 0 40px #ff4500,
    0 0 80px #ff8c00;
  letter-spacing: 12px;
  animation: glitch 3s ease-in-out infinite;
  position: relative;
}

@keyframes glitch {
  0%, 100% { transform: skew(0deg, 0deg); opacity: 1; text-shadow: 0 0 10px #ff4500, 0 0 20px #ff8c00, 0 0 40px #ff4500; }
  25% { transform: skew(2deg, 1deg); text-shadow: -2px 0 #ff0000, 2px 0 #ff8c00; }
  50% { transform: skew(-2deg, -1deg); text-shadow: 2px 0 #ff0000, -2px 0 #ff8c00; }
  75% { transform: skew(1deg, -1deg); text-shadow: -2px 0 #ff8c00, 2px 0 #ff0000; }
}

.hero-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 69, 0, 0.3), transparent 70%);
  filter: blur(50px);
  z-index: -1;
  animation: glowPulse 4s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.2); }
}

.hero-divider {
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 20;
}

.divider-flame {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #ff8c00, #ff4500, #ff8c00, transparent);
  filter: blur(2px);
  animation: flameWidth 3s ease-in-out infinite;
}

.divider-flame:nth-child(2) { animation-delay: 0.5s; width: 80px; }
.divider-flame:nth-child(3) { animation-delay: 1s; }

@keyframes flameWidth {
  0%, 100% { opacity: 0.5; width: 40px; }
  50% { opacity: 1; width: 100px; }
}

/* ===== SITEMAP GRID ===== */
.sitemap-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.sitemap-card {
  background: rgba(10, 10, 10, 0.6);
  backdrop-filter: blur(15px);
  border-radius: 24px 8px 24px 8px;
  padding: 24px;
  border: 1px solid rgba(255, 140, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.sitemap-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--card-color), transparent);
  filter: blur(2px);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.sitemap-card:hover::before {
  transform: translateX(100%);
}

.sitemap-card:hover {
  transform: translateY(-5px);
  border-color: var(--card-color);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 69, 0, 0.2);
}

.card-header {
  position: relative;
  margin-bottom: 24px;
  padding-bottom: 12px;
}

.card-title {
  font-size: 20px;
  font-weight: 800;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  position: relative;
  z-index: 2;
}

.card-accent {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: var(--card-color);
  filter: blur(1px);
  animation: accentPulse 3s ease-in-out infinite;
}

@keyframes accentPulse {
  0%, 100% { width: 50px; opacity: 0.5; }
  50% { width: 100px; opacity: 1; }
}

.card-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card-list li {
  margin-bottom: 12px;
}

.card-link {
  color: #b0b0b0;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 8px;
  position: relative;
}

.link-indicator {
  width: 4px;
  height: 4px;
  background: var(--card-color);
  border-radius: 50%;
  transition: all 0.2s ease;
  filter: drop-shadow(0 0 5px var(--card-color));
}

.card-link:hover {
  color: white;
  transform: translateX(8px);
  background: rgba(255, 140, 0, 0.1);
}

.card-link:hover .link-indicator {
  width: 8px;
  height: 8px;
  filter: drop-shadow(0 0 8px var(--card-color));
}

/* Subsecțiuni */
.card-subsection {
  margin-bottom: 16px;
  padding-left: 8px;
}

.subsection-badge {
  display: inline-block;
  font-size: 13px;
  font-weight: 700;
  color: var(--card-color);
  margin-bottom: 8px;
  padding: 2px 8px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  border: 1px solid rgba(255, 140, 0, 0.2);
}

.subsection-list {
  list-style: none;
  padding-left: 16px;
  margin: 0;
}

.subsection-list li {
  margin-bottom: 8px;
}

.sub-link {
  font-size: 13px !important;
  color: #909090 !important;
}

.sub-link:hover {
  color: white !important;
}

/* ===== FOOTER BOTTOM ===== */
.footer-bottom {
  position: relative;
  padding-top: 40px;
}

.bottom-gradient {
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ff8c00, #ff4500, #ff8c00, transparent);
  filter: blur(2px);
  animation: gradientMove 8s linear infinite;
}

@keyframes gradientMove {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* Brand section */
.brand-section {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 40px;
  padding: 20px 30px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50px 15px 50px 15px;
  border: 1px solid rgba(255, 140, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.brand-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 69, 0, 0.1), transparent 70%);
  animation: brandRotate 15s linear infinite;
}

@keyframes brandRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.brand-logo {
  position: relative;
  width: 80px;
  height: 80px;
}

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 15px #ff8c00);
  position: relative;
  z-index: 2;
  animation: logoFloat 3s ease-in-out infinite;
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.logo-ring {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px solid transparent;
  border-radius: 50%;
  border-top-color: #ff8c00;
  border-bottom-color: #ff4500;
  animation: ringSpin 4s linear infinite;
  filter: blur(2px);
}

@keyframes ringSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.brand-name {
  font-size: 36px;
  font-weight: 900;
  margin: 0 0 5px 0;
  color: white;
  letter-spacing: 2px;
  filter: drop-shadow(0 0 15px rgba(255, 69, 0, 0.5));
}

.brand-dot {
  background: linear-gradient(135deg, #ff8c00, #ff4500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 10px #ff8c00);
}

.brand-tagline {
  font-size: 14px;
  color: #ffaa00;
  margin: 0;
  font-style: italic;
  letter-spacing: 1px;
}

/* Nav links */
.nav-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  padding: 15px 25px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 40px;
}

.nav-link {
  position: relative;
  color: #b0b0b0;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 5px 10px;
  transition: all 0.2s ease;
  overflow: hidden;
}

.nav-hover {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ff8c00, #ff4500, #ff8c00, transparent);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  filter: blur(1px);
}

.nav-link:hover {
  color: white;
}

.nav-link:hover .nav-hover {
  transform: translateX(100%);
}

.nav-separator {
  color: #ff8c00;
  font-size: 16px;
  font-weight: 700;
  filter: drop-shadow(0 0 5px #ff8c00);
  animation: separatorBlink 2s ease-in-out infinite;
}

@keyframes separatorBlink {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* Info section */
.info-section {
  text-align: center;
  margin-bottom: 50px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 30px 10px 30px 10px;
}

.info-stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.stat-badge {
  padding: 6px 16px;
  background: rgba(255, 140, 0, 0.1);
  border: 1px solid rgba(255, 140, 0, 0.3);
  border-radius: 30px;
  color: white;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
}

.stat-badge:hover {
  background: rgba(255, 140, 0, 0.2);
  border-color: #ff8c00;
  transform: scale(1.05);
}

.info-quote {
  font-size: 18px;
  color: #ffaa00;
  margin: 20px 0;
  font-style: italic;
  text-transform: uppercase;
  letter-spacing: 2px;
  filter: drop-shadow(0 0 15px #ff4500);
  animation: quoteGlow 3s ease-in-out infinite;
}

@keyframes quoteGlow {
  0%, 100% { filter: drop-shadow(0 0 10px #ff8c00); }
  50% { filter: drop-shadow(0 0 25px #ff4500); }
}

.info-copyright {
  color: #606060;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* ===== MADE BY - CENTERED & STYLISH ===== */
.made-by-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 10px;
}

.made-by-wrapper {
  position: relative;
  display: inline-flex;
  padding: 12px 35px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 60px 15px 60px 15px;
  backdrop-filter: blur(10px);
  border: 1px solid #ff8c00;
  box-shadow: 0 0 30px rgba(255, 140, 0, 0.4);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: default;
  overflow: hidden;
}


.made-by-wrapper:hover .flame-left,
.made-by-wrapper:hover .flame-right {
  opacity: 1;
}

@keyframes flamesDance {
  0%, 100% { 
    transform: translateY(-50%) scale(1);
    filter: drop-shadow(0 0 10px #ff8c00);
  }
  50% { 
    transform: translateY(-70%) scale(1.3) rotate(10deg);
    filter: drop-shadow(0 0 25px #ff4500);
  }
}

.made-by-content {
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 16px;
}

.made-by-label {
  color: #b0b0b0;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 400;
  transition: all 0.3s ease;
}

.made-by-wrapper:hover .made-by-label {
  color: #ff8c00;
  letter-spacing: 3px;
}

.made-by-names {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 800;
}

.name-iannc {
  font-size: 18px;
  background: linear-gradient(135deg, #8b5cf6, #a855f7, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 900;
  filter: drop-shadow(0 0 12px rgba(139, 92, 246, 0.7));
  transition: all 0.3s ease;
  position: relative;
}

.name-trapi {
  font-size: 18px;
  background: linear-gradient(135deg, #ff0000, #ff4d4d, #ff1a1a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 900;
  filter: drop-shadow(0 0 12px rgba(255, 0, 0, 0.7));
  transition: all 0.3s ease;
  position: relative;
}

.name-iannc::after, .name-trapi::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: currentColor;
  filter: blur(3px);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.name-iannc:hover::after, .name-trapi:hover::after {
  transform: scaleX(1);
}

.name-iannc:hover, .name-trapi:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 20px currentColor);
}

.name-amp {
  color: #ff8c00;
  font-size: 20px;
  font-weight: 700;
  filter: drop-shadow(0 0 10px #ff8c00);
  animation: ampSpin 3s linear infinite;
}

@keyframes ampSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.made-by-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(255, 140, 0, 0.3), transparent 70%);
  filter: blur(20px);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
}

.made-by-wrapper:hover .made-by-glow {
  opacity: 1;
}

@keyframes borderGlow {
  0%, 100% { filter: blur(3px); }
  50% { filter: blur(5px); }
}

/* Responsive */
@media (max-width: 768px) {
  .footer-content {
    padding: 40px 20px;
  }
  
  .hero-glitch {
    font-size: 42px;
    letter-spacing: 6px;
  }
  
  .sitemap-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .brand-section {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }
  
  .nav-links {
    gap: 12px;
  }
  
  .nav-link {
    font-size: 13px;
  }
  
  .info-quote {
    font-size: 15px;
  }
  
  .made-by-wrapper {
    padding: 10px 25px;
  }
  
  .made-by-content {
    gap: 12px;
    font-size: 14px;
  }
  
  .name-iannc, .name-trapi {
    font-size: 16px;
  }
  
  .name-amp {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .hero-glitch {
    font-size: 28px;
    letter-spacing: 4px;
  }
  
  .brand-name {
    font-size: 28px;
  }
  
  .nav-links {
    flex-direction: column;
    align-items: center;
  }
  
  .nav-separator {
    display: none;
  }
  
  .info-stats {
    flex-direction: column;
    align-items: center;
  }
  
  .stat-badge {
    width: fit-content;
  }
  
  .made-by-wrapper {
    padding: 8px 20px;
  }
  
  .made-by-content {
    gap: 8px;
    font-size: 12px;
  }
  
  .made-by-label {
    font-size: 10px;
  }
  
  .name-iannc, .name-trapi {
    font-size: 14px;
  }
  
  .name-amp {
    font-size: 16px;
  }
  
  .flame-left, .flame-right {
    font-size: 18px;
  }
}
</style>
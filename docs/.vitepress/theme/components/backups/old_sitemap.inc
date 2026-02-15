<template>
  <div v-if="isHomePage" class="footer-container">
    <!-- Background pattern -->
    <div class="footer-bg">
      <div class="bg-grid"></div>
      <div class="bg-glow"></div>
      <div class="bg-particle particle-1"></div>
      <div class="bg-particle particle-2"></div>
      <div class="bg-particle particle-3"></div>
    </div>
    
    <div class="footer-content">
      <!-- SITEMAP GRID -->
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
              <img src="https://wildfire.ro/public/images/logo-sv22.png" alt="Wildfire.ro" class="logo-img">
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
          <div class="info-stats">
            <span class="stat-badge">🔥 {{ totalPages }} pagini</span>
            <span class="stat-badge">⚡ {{ totalSections }} secțiuni</span>
          </div>
          
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

const { page, theme } = useData()

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
/* ===== WILDFIRE FOOTER CU BACKGROUND ===== */

/* Container */
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
  background: radial-gradient(circle at 30% 50%, rgba(255, 69, 0, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(255, 140, 0, 0.05) 0%, transparent 50%);
}

.bg-particle {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 69, 0, 0.1) 0%, transparent 70%);
  filter: blur(50px);
  animation: particleFloat 20s ease-in-out infinite;
}

.particle-1 {
  top: -100px;
  left: -100px;
  background: radial-gradient(circle, rgba(255, 69, 0, 0.15) 0%, transparent 70%);
  animation-delay: 0s;
}

.particle-2 {
  bottom: -100px;
  right: -100px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 140, 0, 0.1) 0%, transparent 70%);
  animation-delay: -5s;
}

.particle-3 {
  top: 30%;
  right: 10%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255, 69, 0, 0.08) 0%, transparent 70%);
  animation-delay: -10s;
}

@keyframes particleFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translate(30px, -30px) scale(1.1);
    opacity: 0.4;
  }
  50% {
    transform: translate(-20px, 20px) scale(0.9);
    opacity: 0.2;
  }
  75% {
    transform: translate(20px, 30px) scale(1.05);
    opacity: 0.35;
  }
}

.footer-content {
  max-width: 1300px;
  margin: 0 auto;
  padding: 40px 30px 20px;
  position: relative;
  z-index: 2;
}

/* ===== SITEMAP GRID ===== */
.sitemap-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.sitemap-card {
  background: rgba(17, 17, 17, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255, 69, 0, 0.1);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.sitemap-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--card-color), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sitemap-card:hover {
  border-color: rgba(255, 69, 0, 0.3);
  background: rgba(21, 21, 21, 0.8);
  transform: translateY(-2px);
}

.sitemap-card:hover::before {
  opacity: 0.3;
}

.card-header {
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

.card-accent {
  width: 30px;
  height: 2px;
  background: var(--card-color);
  margin-top: 6px;
  opacity: 0.7;
}

.card-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card-list li {
  margin-bottom: 6px;
}

.card-link {
  color: #888;
  text-decoration: none;
  font-size: 13px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 0;
}

.link-indicator {
  width: 3px;
  height: 3px;
  background: var(--card-color);
  border-radius: 50%;
  transition: all 0.2s ease;
}

.card-link:hover {
  color: #ff8c00;
  transform: translateX(4px);
}

.card-link:hover .link-indicator {
  width: 6px;
  height: 6px;
  background: #ff4500;
}

/* Subsecțiuni */
.card-subsection {
  margin-bottom: 10px;
}

.subsection-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  color: var(--card-color);
  margin-bottom: 5px;
  text-transform: uppercase;
}

.subsection-list {
  list-style: none;
  padding-left: 10px;
  margin: 0;
}

.subsection-list li {
  margin-bottom: 4px;
}

.sub-link {
  font-size: 12px !important;
  color: #666 !important;
}

.sub-link:hover {
  color: #ff8c00 !important;
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

.info-stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.stat-badge {
  color: #888;
  font-size: 11px;
  letter-spacing: 0.5px;
  padding: 4px 12px;
  background: rgba(255, 69, 0, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 69, 0, 0.1);
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
  backdrop-filter: blur(5px);
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
  
  .sitemap-grid {
    grid-template-columns: 1fr;
    gap: 15px;
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
  
  .info-stats {
    flex-direction: column;
    gap: 5px;
  }
  
  .made-by-wrapper {
    flex-direction: column;
    gap: 4px;
    padding: 8px 16px;
  }
}
</style>
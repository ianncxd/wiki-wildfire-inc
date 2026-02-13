<template>
  <div v-if="isHomePage" class="footer-sitemap-wrapper">
    <div class="footer-sitemap">
      <!-- SITEMAP GRID - AUTOMAT DIN CONFIG -->
      <div class="sitemap-grid">
        <div v-for="section in sidebarSections" :key="section.text" class="sitemap-col">
          <h3 class="col-title" :style="getCategoryStyle(section.cleanText)">
            <span class="title-dot" :class="getDotClass(section.cleanText)"></span>
            {{ section.cleanText }}
          </h3>
          <ul class="col-list">
            <!-- Item-uri principale -->
            <li v-for="item in section.items" :key="item.link">
              <div v-if="item.items" class="subsection">
                <span class="subsection-title">{{ item.cleanText }}</span>
                <ul class="subsection-list">
                  <li v-for="sub in item.items" :key="sub.link">
                    <a :href="sub.link" class="col-link sub-link">
                      {{ sub.cleanText }}
                    </a>
                  </li>
                </ul>
              </div>
              <a v-else :href="item.link" class="col-link">
                {{ item.cleanText }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- FOOTER BOTTOM -->
      <div class="footer-bottom">
        <div class="footer-brand">
          <img src="https://wildfire.ro/public/images/logo-sv22.png" alt="Wildfire.ro" class="footer-logo">
          <div class="footer-info">
            <h4>Wildfire<span class="dot-ro">.ro</span></h4>
            <p>Comunitatea #1 de CS2 din România</p>
          </div>
        </div>

        <div class="footer-links">
          <a href="/informatii/about">Despre</a>
          <span class="separator">•</span>
          <a href="/informatii/contact">Contact</a>
          <span class="separator">•</span>
          <a href="/informatii/regulamente/regulament-playeri">Regulament</a>
          <span class="separator">•</span>
          <a href="/informatii/faq">FAQ</a>
        </div>

        <div class="footer-copyright">
          <p>© 2024 wildfire.ro - Toate drepturile rezervate</p>
          <p class="footer-message">mulțumim comunității pentru sprijinul continuu</p>
          <p class="footer-stats">📊 {{ totalPages }} pagini • {{ totalSections }} secțiuni</p>
          
          <!-- MADE BY IANNC (MOV) & TRAPI (ROSU) -->
          <div class="made-by-wrapper">
            <div class="made-by-content">
              <span class="made-by-label">Made by</span>
              <div class="made-by-names">
                <span class="name-iannc">iannC</span>
                <span class="name-amp">&</span>
                <span class="name-trapi">Trapi</span>
              </div>
            </div>
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
  console.log('%c🔥 Wildfire Footer - Made by iannC (mov) & Trapi (roșu) 🔥', 
    'background: linear-gradient(135deg, #8b5cf6, #ff0000); color: white; font-size: 14px; padding: 6px; border-radius: 6px;')
  console.log(`%c🕐 ${timeOfDay.value}`, 'color: #8b5cf6; font-size: 12px;')
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

// 🔴 CULORI CORECTE PENTRU SECȚIUNI
const getCategoryStyle = (text) => {
  const t = text?.toLowerCase() || ''
  let color = '#ff8c00' // Portocaliu pentru Sisteme (default)
  
  if (t.includes('informații')) color = '#3b82f6' // ALBASTRU
  if (t.includes('sisteme')) color = '#ff8c00' // PORTOCALIU
  if (t.includes('shop')) color = '#8b5cf6' // MOV
  if (t.includes('premium')) color = '#8b5cf6' // MOV
  
  return {
    color: color,
    borderBottomColor: color + '40'
  }
}

// 🔴 DOT-URI CU CULORILE CORECTE
const getDotClass = (text) => {
  const t = text?.toLowerCase() || ''
  if (t.includes('informații')) return 'dot-blue'
  if (t.includes('sisteme')) return 'dot-orange'
  if (t.includes('shop')) return 'dot-purple'
  if (t.includes('premium')) return 'dot-purple'
  return 'dot-gray'
}
</script>

<style scoped>
.footer-sitemap-wrapper {
  background: #f3f4f6 !important;
  width: 100%;
  border-top: 2px solid #ff8c00 !important;
  margin-top: 60px;
  padding: 48px 0 32px;
  position: relative;
  z-index: 100;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.dark .footer-sitemap-wrapper {
  background: #111111 !important;
  border-top: 2px solid #ff8c00 !important;
}

.footer-sitemap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* SITEMAP GRID */
.sitemap-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
  margin-bottom: 48px;
}

.sitemap-col {
  display: flex;
  flex-direction: column;
}

.col-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid;
  display: flex;
  align-items: center;
  gap: 8px;
  color: inherit;
}

.title-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 6px currentColor;
}

/* 🔴 DOT-URI CU CULORI */
.dot-blue { background: #3b82f6; }      /* ALBASTRU */
.dot-orange { background: #ff8c00; }    /* PORTOCALIU */
.dot-purple { background: #8b5cf6; }    /* MOV */
.dot-gray { background: #64748b; }

.col-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.col-list li {
  margin-bottom: 8px;
}

.col-link {
  color: #4b5563 !important;
  text-decoration: none;
  font-size: 13px;
  transition: all 0.2s ease;
  display: inline-block;
}

.dark .col-link {
  color: #9ca3af !important;
}

.col-link:hover {
  color: #ff8c00 !important;
  transform: translateX(4px);
}

/* Subsecțiuni */
.subsection {
  margin-bottom: 12px;
}

.subsection-title {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 6px;
  padding-left: 4px;
}

.dark .subsection-title {
  color: #e5e5e5;
}

.subsection-list {
  list-style: none;
  padding-left: 16px;
  margin: 4px 0 0 0;
}

.subsection-list li {
  margin-bottom: 6px;
}

.sub-link {
  font-size: 12px !important;
  color: #6b7280 !important;
}

.dark .sub-link {
  color: #9ca3af !important;
}

/* FOOTER BOTTOM */
.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 140, 0, 0.2);
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.footer-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.footer-info h4 {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px 0;
  color: #111827;
}

.dark .footer-info h4 {
  color: white;
}

/* .ro ORANGE */
.footer-info h4 .dot-ro {
  background: linear-gradient(135deg, #ff8c00, #ff4500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-info p {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.footer-links {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 24px;
}

.footer-links a {
  color: #6b7280;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: #ff8c00;
}

.separator {
  color: #9ca3af;
}

.footer-copyright {
  text-align: center;
}

.footer-copyright p {
  color: #6b7280;
  font-size: 13px;
  margin: 4px 0;
}

.footer-message {
  font-style: italic;
}

.footer-stats {
  font-size: 12px;
  color: #9ca3af !important;
  margin-top: 8px;
}

/* ===== MADE BY IANNC (MOV) & TRAPI (ROSU) ===== */
.made-by-wrapper {
  position: relative;
  display: inline-flex;
  margin-top: 16px;
  padding: 4px 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  backdrop-filter: blur(4px);
  border: 1px solid #ff8c00;
  box-shadow: 0 0 15px rgba(255, 140, 0, 0.3);
  transition: all 0.3s ease;
  cursor: default;
}

.dark .made-by-wrapper {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid #ff8c00;
  box-shadow: 0 0 15px rgba(255, 140, 0, 0.4);
}

.made-by-wrapper:hover {
  transform: translateY(-2px);
  border-color: #ff8c00;
  box-shadow: 0 0 25px rgba(255, 140, 0, 0.7);
}

.made-by-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}

.made-by-label {
  color: #9ca3af;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 400;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.made-by-wrapper:hover .made-by-label {
  color: #ff8c00;
  opacity: 1;
}

.made-by-names {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 700;
}

/* iannC - MOV cu GLOW */
.name-iannc {
  font-size: 13px;
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  letter-spacing: -0.2px;
  filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.6));
  transition: all 0.3s ease;
}

/* Trapi - ROSU cu GLOW */
.name-trapi {
  font-size: 13px;
  background: linear-gradient(135deg, #ff0000, #cc0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  letter-spacing: -0.2px;
  filter: drop-shadow(0 0 8px rgba(255, 0, 0, 0.6));
  transition: all 0.3s ease;
}

.name-amp {
  color: #6b7280;
  font-size: 12px;
  font-weight: 300;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.made-by-wrapper:hover .name-amp {
  color: #ff8c00;
  opacity: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-sitemap {
    padding: 0 20px;
  }
  
  .sitemap-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .footer-brand {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-links {
    gap: 12px;
  }
  
  .made-by-wrapper {
    padding: 3px 10px;
  }
  
  .made-by-content {
    gap: 4px;
    font-size: 12px;
  }
  
  .name-iannc, .name-trapi {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .footer-sitemap {
    padding: 0 16px;
  }
  
  .footer-logo {
    width: 40px;
    height: 40px;
  }
  
  .footer-info h4 {
    font-size: 18px;
  }
  
  .footer-info p {
    font-size: 12px;
  }
  
  .footer-links {
    gap: 8px;
  }
  
  .footer-links a {
    font-size: 12px;
  }
  
  .made-by-wrapper {
    padding: 2px 8px;
  }
  
  .made-by-content {
    gap: 3px;
  }
  
  .made-by-label {
    font-size: 9px;
  }
  
  .name-iannc, .name-trapi {
    font-size: 11px;
  }
  
  .name-amp {
    font-size: 10px;
  }
}
</style>
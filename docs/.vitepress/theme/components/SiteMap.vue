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
            <h4>Wildfire<span>.ro</span></h4>
            <p>Comunitatea #1 de CS2 din România</p>
          </div>
        </div>

        <!-- <div class="footer-social">
          <a v-for="social in socialLinks" :key="social.icon" :href="social.link" target="_blank" class="social-link" :title="social.icon">
            {{ getSocialIcon(social.icon) }}
          </a>
        </div> -->

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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page, theme } = useData()

// Doar pe home page
const isHomePage = computed(() => {
  return page.value.relativePath === 'index.md'
})

// Extrage textul curat fără HTML și iconițe
const cleanText = (htmlString) => {
  if (!htmlString) return ''
  // Elimină tag-urile HTML și păstrează doar textul
  const div = document.createElement('div')
  div.innerHTML = htmlString
  return div.textContent || div.innerText || ''
}

// Extrage sidebar-ul DIN CONFIG
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

// Extrage item-uri recursiv
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

// Social links din config
const socialLinks = computed(() => {
  return theme.value?.socialLinks || []
})

// Total pagini
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

// Total secțiuni
const totalSections = computed(() => sidebarSections.value.length)

// Iconițe pentru social media
const getSocialIcon = (icon) => {
  const icons = {
    discord: '💬',
    steam: '🎮',
    tiktok: '🎵',
    github: '🐙',
    youtube: '📺'
  }
  return icons[icon] || '🔗'
}

// Culoare dinamică pentru fiecare secțiune
const getCategoryStyle = (text) => {
  const t = text?.toLowerCase() || ''
  let color = '#ff4500'
  
  if (t.includes('informații')) color = '#3b82f6'
  if (t.includes('sisteme')) color = '#ff4500'
  if (t.includes('shop')) color = '#8b5cf6'
  if (t.includes('premium')) color = '#8b5cf6'
  
  return {
    color: color,
    borderBottomColor: color + '40'
  }
}

// Dot class pentru fiecare secțiune
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
  border-top: 2px solid #ff4500 !important;
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
  border-top: 2px solid #ff4500 !important;
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

.dot-blue { background: #3b82f6; }
.dot-orange { background: #ff4500; }
.dot-purple { background: #8b5cf6; }
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
  color: #ff4500 !important;
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
  border-top: 1px solid rgba(255, 69, 0, 0.2);
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

.footer-info h4 span {
  background: linear-gradient(135deg, #ff4500, #ff8c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-info p {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.footer-social {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
}

.social-link {
  font-size: 22px;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
}

.dark .social-link {
  background: rgba(255, 255, 255, 0.05);
  color: #9ca3af;
}

.social-link:hover {
  color: #ff4500;
  transform: translateY(-3px);
  background: white;
  box-shadow: 0 4px 12px rgba(255, 69, 0, 0.2);
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
  color: #ff4500;
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
}
</style>
<template>
  <div class="wildfire-home">
    <!-- Background cu pătrățele -->
    <div class="wildfire-bg">
      <div class="wildfire-squares"></div>
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
          Descoperă cum să folosești Wildfire, o platformă pentru comunitate,<br>
          documentație, ghiduri și resurse pentru dezvoltatori.
        </p>

        <!-- Buton Get Started -->
        <div class="wildfire-actions">
          <a href="/informatii/about" class="wildfire-button">
            <span>Ghid de pornire</span>
            <span class="wildfire-button-arrow">→</span>
          </a>
        </div>

        <!-- ULTIMELE ACTUALIZĂRI -->
        <div class="wildfire-updates" v-if="latestUpdates.length > 0">
          <div class="wildfire-updates-header">
            <h2>📋 Ultimele actualizări</h2>
            <span class="wildfire-updates-badge">{{ latestUpdates.length }} noi</span>
          </div>
          
          <div class="wildfire-updates-grid">
            <a 
              v-for="update in latestUpdates" 
              :key="update.url" 
              :href="update.url" 
              class="wildfire-update-card"
            >
              <div class="wildfire-update-icon">{{ getIconForCategory(update.category) }}</div>
              <div class="wildfire-update-content">
                <div class="wildfire-update-header">
                  <h3>{{ update.title }}</h3>
                  <span class="wildfire-update-category" :style="getCategoryStyle(update.category)">
                    {{ update.category }}
                  </span>
                </div>
                <p class="wildfire-update-desc">{{ update.description }}</p>
                <div class="wildfire-update-meta">
                  <span class="wildfire-update-date">📅 {{ update.date }}</span>
                  <span class="wildfire-update-author">👤 {{ update.author }}</span>
                </div>
              </div>
              <span class="wildfire-update-arrow">→</span>
            </a>
          </div>
          
          <div class="wildfire-updates-footer">
            <a href="/informatii/updates" class="wildfire-updates-all">
              Vezi toate actualizările →
            </a>
          </div>
        </div>

        <!-- Grid 2x2 carduri -->
        <div class="wildfire-grid">
          <div class="wildfire-card">
            <div class="wildfire-card-icon">📡</div>
            <h3>Codeflow</h3>
            <p>Un click deschide un IDE complet în browser pentru proiectele tale. Nu mai e nevoie de instalări complicate!</p>
            <a href="/codeflow" class="wildfire-card-link">Află mai multe →</a>
          </div>
          
          <div class="wildfire-card">
            <div class="wildfire-card-icon">🔌</div>
            <h3>API Reference</h3>
            <p>Integrează Wildfire în propriile tale aplicații cu SDK-ul nostru complet documentat și exemple practice.</p>
            <a href="/api" class="wildfire-card-link">Documentație API →</a>
          </div>
          
          <div class="wildfire-card">
            <div class="wildfire-card-icon">👥</div>
            <h3>Teams</h3>
            <p>Creează workspace-uri private pentru tine și echipa ta. Colaborează în timp real, securizat și eficient.</p>
            <a href="/teams" class="wildfire-card-link">Află mai multe →</a>
          </div>
          
          <div class="wildfire-card">
            <div class="wildfire-card-icon">🖥️</div>
            <h3>Enterprise Server</h3>
            <p>Soluții enterprise pentru organizații. Suport dedicat, infrastructură scalabilă și opțiuni de self-hosting.</p>
            <a href="/enterprise" class="wildfire-card-link">Explorează →</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Definim tipul pentru o actualizare
interface UpdateItem {
  title: string
  category: string
  url: string
  description: string
  date: string
  author: string
}

// Definim tipul pentru o pagină VitePress
interface VitePressPage {
  path?: string
  url?: string
  component?: {
    frontmatter?: {
      title?: string
      category?: string
      description?: string
      excerpt?: string
      date?: string
      author?: string
      updated?: string
    }
  }
}

const latestUpdates = ref<UpdateItem[]>([])

// Fallback data
const fallbackUpdates: UpdateItem[] = [
  {
    title: 'Intrebări frecvente',
    category: 'General',
    url: '/faq',
    description: 'FAQ actualizat cu noile întrebări de la comunitate',
    date: '11.02.2026',
    author: 'Echipa Wildfire'
  },
  {
    title: 'Skin Tickets',
    category: 'General',
    url: '/general#skin-tickets',
    description: 'Sistemul de skin tickets a fost îmbunătățit',
    date: '11.02.2026',
    author: 'Echipa Wildfire'
  },
  {
    title: 'Drop System',
    category: 'Activity',
    url: '/general#drop',
    description: 'Noi recompense în sistemul de drop',
    date: '11.02.2026',
    author: 'Echipa Wildfire'
  },
  {
    title: 'Crates',
    category: 'General',
    url: '/general#crates',
    description: 'Crate-uri noi disponibile - lucky, prizes',
    date: '11.02.2026',
    author: 'Echipa Wildfire'
  }
]

// Funcție care ghicește categoria din URL
const guessCategory = (path: string = ''): string => {
  if (path.includes('smoke')) return 'Smoke-uri'
  if (path.includes('flash')) return 'Flash-uri'
  if (path.includes('molotov')) return 'Molotov'
  if (path.includes('lineup')) return 'Line-ups'
  if (path.includes('oneway')) return 'One-ways'
  if (path.includes('strateg')) return 'Strategii'
  if (path.includes('server')) return 'Servere'
  if (path.includes('api')) return 'API'
  if (path.includes('guide')) return 'Ghiduri'
  return 'General'
}

// Iconițe pentru categorii
const categoryIcons: Record<string, string> = {
  'Smoke-uri': '💨',
  'Flash-uri': '💥',
  'Molotov': '🔥',
  'Line-ups': '⚡',
  'One-ways': '👁️',
  'Strategii': '🎯',
  'Servere': '🖥️',
  'API': '🔌',
  'Ghiduri': '📘',
  'General': '📄',
  'Activity': '📊'
}

// Culori pentru categorii
const categoryColors: Record<string, string> = {
  'Smoke-uri': '#3b82f6',
  'Flash-uri': '#8b5cf6',
  'Molotov': '#ef4444',
  'Line-ups': '#10b981',
  'One-ways': '#f59e0b',
  'Strategii': '#ec4899',
  'Servere': '#ff4500',
  'API': '#6b7280',
  'Ghiduri': '#14b8a6',
  'General': '#64748b',
  'Activity': '#f97316'
}

const getIconForCategory = (category: string): string => {
  return categoryIcons[category] || '📄'
}

const getCategoryStyle = (category: string) => {
  const color = categoryColors[category] || '#64748b'
  return {
    backgroundColor: color + '20',
    color: color
  }
}

// Simulăm date pentru moment - până găsim o soluție să citim paginile
const fetchLatestUpdates = () => {
  // Momentan folosim fallback
  latestUpdates.value = fallbackUpdates
}

onMounted(() => {
  fetchLatestUpdates()
})
</script>

<style scoped>
/* TOATE STILURILE RĂMÂN LA FEL */
.wildfire-home {
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  padding: 64px 24px 80px;
  min-height: 100vh;
}

.wildfire-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.wildfire-squares {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(to right, rgba(255, 69, 0, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 69, 0, 0.04) 1px, transparent 1px);
  background-size: 80px 80px;
  pointer-events: none;
  z-index: 0;
  animation: moveUpDown 25s ease-in-out infinite;
}

@keyframes moveUpDown {
  0% { transform: translateY(0px); }
  50% { transform: translateY(15px); }
  100% { transform: translateY(0px); }
}

.wildfire-hero {
  position: relative;
  z-index: 10;
  width: 100%;
}

.wildfire-container {
  width: 100%;
}

.wildfire-logo-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
}

.wildfire-logo-glow {
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

.wildfire-logo-wrapper:hover .wildfire-logo-glow {
  opacity: 1;
}

.wildfire-logo {
  width: 500px !important;
  height: auto !important;
  max-height: 150px !important;
  object-fit: contain !important;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.wildfire-logo-wrapper:hover .wildfire-logo {
  transform: scale(1.02);
}

.wildfire-title {
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

.dark .wildfire-title {
  color: white;
}

.wildfire-title-gradient {
  background: linear-gradient(135deg, #ff4500, #ff8c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

.wildfire-description {
  font-size: 20px;
  color: #6b7280;
  max-width: 700px;
  margin: 0 auto 32px;
  line-height: 1.6;
  text-align: center;
  position: relative;
  z-index: 20;
}

.dark .wildfire-description {
  color: #9ca3af;
}

.wildfire-actions {
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
  position: relative;
  z-index: 20;
}

.wildfire-button {
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

.wildfire-button:hover {
  background: #ff8c00;
  transform: scale(1.05);
  box-shadow: 0 12px 28px rgba(255, 69, 0, 0.35);
  gap: 16px;
}

.wildfire-button-arrow {
  font-size: 20px;
  transition: transform 0.2s ease;
}

.wildfire-button:hover .wildfire-button-arrow {
  transform: translateX(4px);
}

/* ULTIMELE ACTUALIZĂRI */
.wildfire-updates {
  margin: 48px 0 64px;
  position: relative;
  z-index: 20;
}

.wildfire-updates-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.wildfire-updates-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.dark .wildfire-updates-header h2 {
  color: white;
}

.wildfire-updates-badge {
  background: #ff4500;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.wildfire-updates-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .wildfire-updates-grid {
    grid-template-columns: 1fr;
  }
}

.wildfire-update-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: white;
  border: 1px solid #eaeef2;
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
}

.dark .wildfire-update-card {
  background: #111111;
  border-color: #2a2a2a;
}

.wildfire-update-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px -8px rgba(255, 69, 0, 0.15);
  border-color: rgba(255, 69, 0, 0.3);
}

.wildfire-update-icon {
  font-size: 32px;
  min-width: 48px;
  text-align: center;
}

.wildfire-update-content {
  flex: 1;
}

.wildfire-update-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.wildfire-update-header h3 {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.dark .wildfire-update-header h3 {
  color: white;
}

.wildfire-update-category {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.wildfire-update-desc {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.dark .wildfire-update-desc {
  color: #9ca3af;
}

.wildfire-update-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #8b8e98;
}

.dark .wildfire-update-meta {
  color: #6b7280;
}

.wildfire-update-arrow {
  color: #9ca3af;
  font-size: 18px;
  transition: transform 0.2s ease;
  margin-left: 8px;
}

.wildfire-update-card:hover .wildfire-update-arrow {
  color: #ff4500;
  transform: translateX(4px);
}

.wildfire-updates-footer {
  text-align: right;
}

.wildfire-updates-all {
  color: #ff4500;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.wildfire-updates-all:hover {
  color: #ff8c00;
  gap: 8px;
}

/* Grid carduri */
.wildfire-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
  position: relative;
  z-index: 20;
}

@media (max-width: 768px) {
  .wildfire-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.wildfire-card {
  padding: 28px;
  background: white;
  border: 1px solid #edf2f7;
  border-radius: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;
}

.dark .wildfire-card {
  background: #111111;
  border-color: #2a2a2a;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.wildfire-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 0;
  background: linear-gradient(to bottom, #ff4500, #ff8c00);
  transition: height 0.25s ease;
}

.wildfire-card:hover::before {
  height: 100%;
}

.wildfire-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 24px -8px rgba(255, 69, 0, 0.12);
  border-color: rgba(255, 69, 0, 0.2);
}

.wildfire-card-icon {
  font-size: 34px;
  margin-bottom: 18px;
  transition: transform 0.3s ease;
}

.wildfire-card:hover .wildfire-card-icon {
  transform: scale(1.1);
}

.wildfire-card h3 {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 14px 0;
  color: #111827;
  letter-spacing: -0.01em;
}

.dark .wildfire-card h3 {
  color: white;
}

.wildfire-card p {
  font-size: 15px;
  color: #6b7280;
  margin: 0 0 22px 0;
  line-height: 1.7;
}

.dark .wildfire-card p {
  color: #9ca3af;
}

.wildfire-card-link {
  color: #ff4500;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.wildfire-card-link:hover {
  color: #ff8c00;
  gap: 12px;
}

.wildfire-link-arrow {
  transition: transform 0.2s ease;
}

.wildfire-card-link:hover .wildfire-link-arrow {
  transform: translateX(4px);
}
</style>
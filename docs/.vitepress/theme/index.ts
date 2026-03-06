import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import * as dotenv from 'dotenv'
import * as path from 'path'

// 🔥 Încărcăm .env din mai multe locații posibile
try {
  // Încearcă din rădăcina proiectului
  dotenv.config({ path: path.resolve(__dirname, '../../../.env') })
  // Încearcă și din docs folder
  dotenv.config({ path: path.resolve(__dirname, '../../.env') })
  // Încearcă din theme folder
  dotenv.config({ path: path.resolve(__dirname, '../.env') })
} catch (e) {
  console.log('📥 Nu s-a putut încărca .env din fișier, încercăm surse alternative...')
}

// 📝 Tipuri pentru TypeScript
declare global {
  interface ImportMeta {
    env: {
      VITE_GITHUB_TOKEN: string
    }
  }
  
  interface Window {
    __GITHUB_TOKEN: string
  }
}

// 🔥 Încercăm să luăm token-ul din TOATE sursele posibile
let githubToken: string | undefined

// 1. Din import.meta.env (Vite)
try {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GITHUB_TOKEN) {
    githubToken = import.meta.env.VITE_GITHUB_TOKEN
    console.log('📥 Sursa 1 - import.meta.env: GĂSIT')
  }
} catch (e) {
  console.log('📥 Sursa 1 - import.meta.env: EȘUAT')
}

// 2. Din process.env (dotenv)
if (!githubToken && typeof process !== 'undefined' && process.env && process.env.VITE_GITHUB_TOKEN) {
  githubToken = process.env.VITE_GITHUB_TOKEN
  console.log('📥 Sursa 2 - process.env: GĂSIT')
}

// 3. Din window (dacă e setat manual)
if (!githubToken && typeof window !== 'undefined' && window.__GITHUB_TOKEN) {
  githubToken = window.__GITHUB_TOKEN
  console.log('📥 Sursa 3 - window.__GITHUB_TOKEN: GĂSIT')
}

// 4. Din variabilele de sistem
if (!githubToken && typeof process !== 'undefined' && process.env && process.env.VITE_GITHUB_TOKEN) {
  githubToken = process.env.VITE_GITHUB_TOKEN
  console.log('📥 Sursa 4 - System env: GĂSIT')
}

console.log('🔥 Token în index.ts:', githubToken ? 'EXISTĂ' : 'LIPSEȘTE')
if (githubToken) {
  console.log('📦 Lungime token:', githubToken.length)
}

// Facem token-ul disponibil global
if (typeof window !== 'undefined' && githubToken) {
  window.__GITHUB_TOKEN = githubToken
}

// Import componente principale
import WikiHome from './components/WikiHome.vue'
import LastUpdates from './components/LastUpdates.vue'
import Changelogs from './components/Changelogs.vue'
import LatestWikiUpdates from './components/WikiUpdatesGrid.vue'
import WikiUpdatesGrid from './components/WikiUpdatesGrid.vue'
import NavSearch from './components/NavSearch.vue'
import WildfireTag from './components/WildfireTag.vue'
import SiteMap from './components/SiteMap.vue'
import PageNotFound from './components/PageNotFound.vue'
import HomeNavbar from './components/HomeNavbar.vue'
import Panel from './components/Panel.vue'
import AboutWiki from './components/AboutWiki.vue'

// NOILE COMPONENTE PENTRU DASHBOARD
import FileTreeItem from './components/FileTreeItem.vue'

// Import popout
import './popout.js'

// Import toate tag-urile
import PageTagBlue from './components/tags/PageTagBlue.vue'
import PageTagOrange from './components/tags/PageTagOrange.vue'
import PageTagPurple from './components/tags/PageTagPurple.vue'
import PageTagGreen from './components/tags/PageTagGreen.vue'
import PageTagPink from './components/tags/PageTagPink.vue'
import PageTagRed from './components/tags/PageTagRed.vue'
import PageTagIndigo from './components/tags/PageTagIndigo.vue'
import PageTagYellow from './components/tags/PageTagYellow.vue'
import PageTagTeal from './components/tags/PageTagTeal.vue'
import PageTagCyan from './components/tags/PageTagCyan.vue'
import PageTagFuchsia from './components/tags/PageTagFuchsia.vue'
import PageTagEmerald from './components/tags/PageTagEmerald.vue'
import PageTagAmber from './components/tags/PageTagAmber.vue'
import PageTagGray from './components/tags/PageTagGray.vue'

export default {
  extends: DefaultTheme,
  
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // Home page
      'home-hero-before': () => h(WikiHome),
      
      // Navbar
      'nav-bar-content-before': () => null,
      'nav-bar-title-before': () => null,
      'nav-bar-content-after': () => h(NavSearch),
      
      // Footer
      'layout-bottom': () => h(SiteMap),
      
      // Not Found Page
      'not-found': () => h(PageNotFound)
    })
  },
  
  enhanceApp({ app }) {
    // Componente principale
    app.component('WikiHome', WikiHome)
    app.component('HomeNavbar', HomeNavbar)
    app.component('LastUpdates', LastUpdates)
    app.component('Changelogs', Changelogs)
    app.component('LatestWikiUpdates', LatestWikiUpdates)
    app.component('WikiUpdatesGrid', WikiUpdatesGrid)
    app.component('NavSearch', NavSearch)
    app.component('WildfireTag', WildfireTag)
    app.component('SiteMap', SiteMap)
    app.component('PageNotFound', PageNotFound)
    app.component('AboutWiki', AboutWiki)
    app.component('Panel', Panel)
    
    // NOUA COMPONENTĂ PENTRU FILE TREE
    app.component('FileTreeItem', FileTreeItem)

    // Toate tag-urile
    app.component('PageTagBlue', PageTagBlue)
    app.component('PageTagOrange', PageTagOrange)
    app.component('PageTagPurple', PageTagPurple)
    app.component('PageTagGreen', PageTagGreen)
    app.component('PageTagPink', PageTagPink)
    app.component('PageTagRed', PageTagRed)
    app.component('PageTagIndigo', PageTagIndigo)
    app.component('PageTagYellow', PageTagYellow)
    app.component('PageTagTeal', PageTagTeal)
    app.component('PageTagCyan', PageTagCyan)
    app.component('PageTagFuchsia', PageTagFuchsia)
    app.component('PageTagEmerald', PageTagEmerald)
    app.component('PageTagAmber', PageTagAmber)
    app.component('PageTagGray', PageTagGray)
    
    // 🔥 Adăugăm token-ul global
    app.config.globalProperties.$githubToken = githubToken
    console.log('✅ Token adăugat în aplicația Vue')
    console.log('📁 Componenta FileTreeItem înregistrată cu succes')
  }
} satisfies Theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

// Import componente
import WikiHome from './components/WikiHome.vue'
import NavSearch from './components/NavSearch.vue'

export default {
  extends: DefaultTheme,
  
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // WikiHome pe home page
      'home-hero-before': () => h(WikiHome),
      
      // Searchbar în navbar
      'nav-bar-title-after': () => h(NavSearch)
    })
  },
  
  enhanceApp({ app }) {
    app.component('WikiHome', WikiHome)
    app.component('NavSearch', NavSearch)
  }
} satisfies Theme
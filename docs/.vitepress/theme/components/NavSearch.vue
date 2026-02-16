<template>
  <button v-if="!isHomePage" class="nav-search-button" @click.prevent.stop="openSearch" type="button">
    <img src="/icons/searchbutton.svg" class="nav-icon" alt="search">
    <span class="nav-search-text">Caută...</span>
    <span class="nav-search-shortcut">Ctrl K</span>
  </button>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { page } = useData()

const isHomePage = computed(() => {
  return page.value.relativePath === 'index.md'
})

const openSearch = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  
  const searchButton = document.querySelector('.VPNavBarSearch button')
  if (searchButton) {
    ;(searchButton as HTMLElement).click()
    return
  }
  
  const event = new KeyboardEvent('keydown', {
    key: 'k',
    ctrlKey: true,
    metaKey: true,
    bubbles: true,
    cancelable: true
  })
  window.dispatchEvent(event)
}
</script>

<style scoped>
/* NAV SEARCHBAR */
.nav-search-button {
  display: flex;
  align-items: center;
  
  /* LIGHT MODE - ALB */
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 40px !important;
  padding: 0 20px;
  height: 44px;
  width: 280px !important;
  min-width: 280px !important;
  max-width: 280px !important;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  flex-shrink: 0;
  margin-left: 300px !important;
  outline: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transform: translateZ(0);
}

.dark .nav-search-button {
  /* DARK MODE - NEGRU PROFUND */
  background: #0a0a0a;  /* NEGRU MAI ÎNCHIS */
  border: 1px solid #333333;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}

.nav-search-button:hover {
  background: #f5f5f5;
  border-color: #ff4500;
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.dark .nav-search-button:hover {
  background: #1a1a1a;  /* NEGRU MAI DESCHIS LA HOVER */
  border-color: #ff4500;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
}

.nav-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  filter: brightness(0.3);
  transition: filter 0.3s ease;
}

.dark .nav-icon {
  filter: brightness(0) invert(1);  /* ALB ÎN DARK MODE */
}

.nav-search-button:hover .nav-icon {
  filter: brightness(0.5);
}

.dark .nav-search-button:hover .nav-icon {
  filter: brightness(0) invert(1) drop-shadow(0 0 2px #ff4500);
}

.nav-search-text {
  flex: 1;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  transition: color 0.3s ease;
}

.dark .nav-search-text {
  color: #ffffff;
}

.nav-search-shortcut {
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  margin-left: 8px;
  flex-shrink: 0;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  
  /* LIGHT MODE */
  background: #f0f0f0;
  color: #333333;
  border: 1px solid #dddddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.dark .nav-search-shortcut {
  /* DARK MODE */
  background: #2a2a2a;
  color: #ffffff;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.nav-search-button:hover .nav-search-shortcut {
  background: #ff4500;
  color: #ffffff;
  border-color: #ff4500;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(255, 69, 0, 0.3);
}

@media (max-width: 768px) {
  .nav-search-button {
    width: 44px !important;
    min-width: 44px !important;
    max-width: 44px !important;
    padding: 0;
    justify-content: center;
    margin-left: 16px !important;
    background: #ffffff;
  }
  
  .dark .nav-search-button {
    background: #0a0a0a;  /* NEGRU PROFUND ȘI PE MOBIL */
  }
  
  .nav-search-text,
  .nav-search-shortcut {
    display: none;
  }
  
  .nav-icon {
    margin-right: 0;
  }
  
  .nav-search-button:hover {
    transform: scale(1.1);
  }
}
</style>
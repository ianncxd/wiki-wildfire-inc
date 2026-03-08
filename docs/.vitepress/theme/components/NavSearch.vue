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
.nav-search-button {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 40px;
  padding: 0 16px;
  height: 40px;
  width: 240px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  outline: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin: 0 12px;
}

.dark .nav-search-button {
  background: #1a1a1a;
  border: 1px solid #333333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.nav-search-button:hover {
  background: #f5f5f5;
  border-color: #ff4500;
  box-shadow: 0 4px 12px rgba(255, 69, 0, 0.15);
}

.dark .nav-search-button:hover {
  background: #252525;
  border-color: #ff4500;
  box-shadow: 0 4px 12px rgba(255, 69, 0, 0.2);
}

.nav-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  filter: brightness(0.4);
  transition: filter 0.2s ease;
}

.dark .nav-icon {
  filter: brightness(0) invert(0.8);
}

.nav-search-button:hover .nav-icon {
  filter: brightness(0.2);
}

.dark .nav-search-button:hover .nav-icon {
  filter: brightness(0) invert(1) drop-shadow(0 0 2px #ff4500);
}

.nav-search-text {
  flex: 1;
  color: #333333;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dark .nav-search-text {
  color: #e0e0e0;
}

.nav-search-shortcut {
  font-size: 11px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 6px;
  margin-left: 8px;
  background: #f0f0f0;
  color: #666666;
  border: 1px solid #dddddd;
  white-space: nowrap;
}

.dark .nav-search-shortcut {
  background: #333333;
  color: #cccccc;
  border: 1px solid #444444;
}

.nav-search-button:hover .nav-search-shortcut {
  background: #ff4500;
  color: #ffffff;
  border-color: #ff4500;
}

@media (max-width: 768px) {
  .nav-search-button {
    width: 40px !important;
    min-width: 40px !important;
    padding: 0;
    justify-content: center;
    margin: 0 8px;
  }
  
  .nav-search-text,
  .nav-search-shortcut {
    display: none;
  }
  
  .nav-icon {
    margin-right: 0;
  }
}
</style>
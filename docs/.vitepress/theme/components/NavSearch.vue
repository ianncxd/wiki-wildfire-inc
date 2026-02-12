<template>
  <button v-if="!isHomePage" class="nav-search-button" @click.prevent.stop="openSearch" type="button">
    <img src="/icons/searchbutton.svg" class="nav-icon">
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
  
  // Metoda 1: Caută butonul DocSearch
  const searchButton = document.querySelector('.DocSearch-Button')
  if (searchButton) {
    ;(searchButton as HTMLElement).click()
    return
  }
  
  // Metoda 2: Emite shortcut-ul corect
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
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 40px !important; /* ← MAI ROTUND */
  padding: 0 20px;
  height: 44px; /* ← PUȚIN MAI ÎNALT */
  width: 280px !important;
  min-width: 280px !important;
  max-width: 280px !important;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  flex-shrink: 0;
  margin-left: 300px !important;
  outline: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03) !important; /* ← SHADOW */
}

.dark .nav-search-button {
  background: #000000;
  border-color: #2a2a2a;
}

.nav-search-button:hover {
  border-color: #ff4500;
  background: #f9fafb;
}

.dark .nav-search-button:hover {
  background: #2a2a2a;
  border-color: #ff4500;
}

.nav-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  filter: brightness(0) saturate(100%) invert(45%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(97%) contrast(92%) !important;
}

.dark .nav-icon {
  filter: brightness(0) saturate(100%) invert(100%) !important;
}

.nav-search-text {
  flex: 1;
  color: #6b7280;
  font-size: 14px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.dark .nav-search-text {
  color: #9ca3af;
}

.nav-search-shortcut {
  color: #6b7280;
  font-size: 12px;
  font-weight: 500;
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
  flex-shrink: 0;
  letter-spacing: 0.5px;
}

.dark .nav-search-shortcut {
  background: #111111;
  color: #d1d5db;
}

@media (max-width: 768px) {
  .nav-search-button {
    width: 40px !important;
    min-width: 40px !important;
    max-width: 40px !important;
    padding: 0;
    justify-content: center;
    margin-left: 16px !important;
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
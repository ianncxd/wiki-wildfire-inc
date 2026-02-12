<template>
  <button class="nav-search-button" @click.stop.prevent="openSearch" type="button">
    <span class="nav-search-icon">🔍</span>
    <span class="nav-search-text">Search</span>
    <span class="nav-search-shortcut">CTRL K</span>
  </button>
</template>

<script setup lang="ts">
const openSearch = () => {
  // Metoda 1: Caută butonul DocSearch
  const searchButton = document.querySelector('.DocSearch-Button')
  if (searchButton) {
    ;(searchButton as HTMLElement).click()
    return
  }
  
  // Metoda 2: Emite shortcut-ul direct
  window.dispatchEvent(new KeyboardEvent('keydown', {
    key: 'k',
    ctrlKey: true,
    metaKey: true,
    bubbles: true
  }))
}
</script>

<style scoped>
.nav-search-button {
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 16px;
  height: 38px;
  width: 260px;
  margin-left: 120px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.dark .nav-search-button {
  background: #1a1a1a;
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

.nav-search-icon {
  color: #6b7280;
  font-size: 15px;
  margin-right: 8px;
}

.nav-search-text {
  flex: 1;
  color: #6b7280;
  font-size: 14px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
}

.dark .nav-search-shortcut {
  background: #111111;
  color: #d1d5db;
}
</style>
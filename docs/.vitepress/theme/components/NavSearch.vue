<template>
  <button class="nav-search-button" @click.stop="openSearch" type="button">
    <span class="nav-search-icon">🔍</span>
    <span class="nav-search-text">Caută...</span>
    <span class="nav-search-shortcut">Ctrl K</span>
  </button>
</template>

<script setup lang="ts">
const openSearch = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  
  // Metoda 1: Caută butonul DocSearch
  const searchButton = document.querySelector('.DocSearch-Button')
  if (searchButton) {
    ;(searchButton as HTMLElement).click()
    return
  }
  
  // Metoda 2: Emite shortcut-ul direct
  const event = new KeyboardEvent('keydown', {
    key: 'k',
    ctrlKey: true,
    metaKey: true,
    bubbles: true,
    cancelable: true
  })
  window.dispatchEvent(event)
  
  // Metoda 3: Fallback pentru Safari
  setTimeout(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      metaKey: true,
      bubbles: true
    }))
  }, 50)
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
  height: 40px;
  width: 260px !important;
  min-width: 260px !important;
  max-width: 260px !important;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  flex-shrink: 0;
  margin-left: 100px !important;
  outline: none;
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

.nav-search-button:active {
  transform: scale(0.98);
}

.nav-search-icon {
  color: #6b7280;
  font-size: 15px;
  margin-right: 8px;
  flex-shrink: 0;
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
  font-family: inherit;
  border: 1px solid transparent;
}

.dark .nav-search-shortcut {
  background: #111111;
  color: #d1d5db;
  border-color: #2a2a2a;
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
  
  .nav-search-icon {
    margin-right: 0;
  }
}
</style>
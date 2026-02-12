<template>
  <span class="wildfire-tag" :class="tagClass" :style="customStyle">
    <span class="tag-dot" :class="dotClass"></span>
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Culoare predefinită
  color: {
    type: String,
    default: 'gray'
  },
  // Text personalizat
  text: {
    type: String,
    default: ''
  },
  // Culoare custom (hex)
  customColor: {
    type: String,
    default: null
  }
})

// Mapare culori predefinite
const colorMap = {
  // Informații & General (Albastru)
  blue: { class: 'tag-blue', dot: 'dot-blue', color: '#3b82f6' },
  info: { class: 'tag-blue', dot: 'dot-blue', color: '#3b82f6' },
  
  // Sisteme & Feature-uri (Portocaliu)
  orange: { class: 'tag-orange', dot: 'dot-orange', color: '#ff4500' },
  system: { class: 'tag-orange', dot: 'dot-orange', color: '#ff4500' },
  
  // Premium & VIP (Mov)
  purple: { class: 'tag-purple', dot: 'dot-purple', color: '#8b5cf6' },
  vip: { class: 'tag-purple', dot: 'dot-purple', color: '#8b5cf6' },
  premium: { class: 'tag-purple', dot: 'dot-purple', color: '#8b5cf6' },
  mvp: { class: 'tag-purple', dot: 'dot-purple', color: '#8b5cf6' },
  
  // Gambling & Evenimente (Verde)
  green: { class: 'tag-green', dot: 'dot-green', color: '#10b981' },
  event: { class: 'tag-green', dot: 'dot-green', color: '#10b981' },
  gambling: { class: 'tag-green', dot: 'dot-green', color: '#10b981' },
  
  // Shop & Market (Roz)
  pink: { class: 'tag-pink', dot: 'dot-pink', color: '#ec4899' },
  shop: { class: 'tag-pink', dot: 'dot-pink', color: '#ec4899' },
  market: { class: 'tag-pink', dot: 'dot-pink', color: '#ec4899' },
  
  // Anti-Cheat & Security (Roșu)
  red: { class: 'tag-red', dot: 'dot-red', color: '#ef4444' },
  anticheat: { class: 'tag-red', dot: 'dot-red', color: '#ef4444' },
  
  // Development & Tech (Albastru Inchis)
  indigo: { class: 'tag-indigo', dot: 'dot-indigo', color: '#6366f1' },
  dev: { class: 'tag-indigo', dot: 'dot-indigo', color: '#6366f1' },
  
  // Rapoarte & Tickets (Galben)
  yellow: { class: 'tag-yellow', dot: 'dot-yellow', color: '#eab308' },
  report: { class: 'tag-yellow', dot: 'dot-yellow', color: '#eab308' },
  
  // Crafting & Systems (Teal)
  teal: { class: 'tag-teal', dot: 'dot-teal', color: '#14b8a6' },
  craft: { class: 'tag-teal', dot: 'dot-teal', color: '#14b8a6' },
  systems: { class: 'tag-teal', dot: 'dot-teal', color: '#14b8a6' },
  
  // Leaderboard & Top (Cyan)
  cyan: { class: 'tag-cyan', dot: 'dot-cyan', color: '#06b6d4' },
  leaderboard: { class: 'tag-cyan', dot: 'dot-cyan', color: '#06b6d4' },
  top: { class: 'tag-cyan', dot: 'dot-cyan', color: '#06b6d4' },
  
  // Skins & Cosmetice (Fuchsia)
  fuchsia: { class: 'tag-fuchsia', dot: 'dot-fuchsia', color: '#d946ef' },
  skins: { class: 'tag-fuchsia', dot: 'dot-fuchsia', color: '#d946ef' },
  
  // Plăți & Payment (Emerald)
  emerald: { class: 'tag-emerald', dot: 'dot-emerald', color: '#10b981' },
  payment: { class: 'tag-emerald', dot: 'dot-emerald', color: '#10b981' },
  
  // Sank & Entry Sounds (Amber)
  amber: { class: 'tag-amber', dot: 'dot-amber', color: '#f59e0b' },
  sank: { class: 'tag-amber', dot: 'dot-amber', color: '#f59e0b' },
  entry: { class: 'tag-amber', dot: 'dot-amber', color: '#f59e0b' },
  
  // Gray (Default)
  gray: { class: 'tag-gray', dot: 'dot-gray', color: '#64748b' }
}

const tagData = computed(() => {
  if (props.customColor) {
    return {
      class: 'tag-custom',
      dot: 'dot-custom',
      color: props.customColor
    }
  }
  return colorMap[props.color.toLowerCase()] || colorMap.gray
})

const tagClass = computed(() => tagData.value.class)
const dotClass = computed(() => tagData.value.dot)

const customStyle = computed(() => {
  if (props.customColor) {
    return {
      backgroundColor: props.customColor + '20',
      color: props.customColor,
      borderColor: props.customColor + '40'
    }
  }
  return {}
})
</script>

<style scoped>
.wildfire-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 10px;
  border-radius: 16px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: white !important;
  line-height: 1.4;
  white-space: nowrap;
}

/* TOATE CULORILE - 20+ variante */
/* TOATE CULORILE - identice cu LastUpdates */
.tag-blue { background: linear-gradient(135deg, #3b82f6, #2563eb); }
.tag-orange { background: linear-gradient(135deg, #ff4500, #ff8c00); }
.tag-purple { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
.tag-green { background: linear-gradient(135deg, #10b981, #059669); }
.tag-pink { background: linear-gradient(135deg, #ec4899, #db2777); }
.tag-red { background: linear-gradient(135deg, #ef4444, #dc2626); }
.tag-indigo { background: linear-gradient(135deg, #6366f1, #4f46e5); }
.tag-yellow { background: linear-gradient(135deg, #eab308, #ca8a04); }
.tag-teal { background: linear-gradient(135deg, #14b8a6, #0d9488); }
.tag-cyan { background: linear-gradient(135deg, #06b6d4, #0891b2); }
.tag-fuchsia { background: linear-gradient(135deg, #d946ef, #c026d3); }
.tag-emerald { background: linear-gradient(135deg, #10b981, #059669); }
.tag-amber { background: linear-gradient(135deg, #f59e0b, #d97706); }
.tag-gray { background: linear-gradient(135deg, #64748b, #475569); }

/* Dots */
.tag-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  display: inline-block;
}

.dot-blue { background: #3b82f6; box-shadow: 0 0 5px #3b82f6; }
.dot-orange { background: #ff4500; box-shadow: 0 0 5px #ff4500; }
.dot-purple { background: #8b5cf6; box-shadow: 0 0 5px #8b5cf6; }
.dot-green { background: #10b981; box-shadow: 0 0 5px #10b981; }
.dot-pink { background: #ec4899; box-shadow: 0 0 5px #ec4899; }
.dot-red { background: #ef4444; box-shadow: 0 0 5px #ef4444; }
.dot-indigo { background: #6366f1; box-shadow: 0 0 5px #6366f1; }
.dot-yellow { background: #eab308; box-shadow: 0 0 5px #eab308; }
.dot-teal { background: #14b8a6; box-shadow: 0 0 5px #14b8a6; }
.dot-cyan { background: #06b6d4; box-shadow: 0 0 5px #06b6d4; }
.dot-fuchsia { background: #d946ef; box-shadow: 0 0 5px #d946ef; }
.dot-emerald { background: #10b981; box-shadow: 0 0 5px #10b981; }
.dot-amber { background: #f59e0b; box-shadow: 0 0 5px #f59e0b; }
.dot-gray { background: #64748b; box-shadow: 0 0 5px #64748b; }
.dot-custom { background: currentColor; box-shadow: 0 0 5px currentColor; }
</style>
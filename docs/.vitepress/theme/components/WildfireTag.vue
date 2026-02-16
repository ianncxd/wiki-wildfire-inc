<template>
  <span class="wildfire-tag" :class="tagClass">
    <span class="tag-dot" :class="dotClass"></span>
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: 'gray'
  },
  text: {
    type: String,
    default: ''
  }
})

const colorMap = {
  blue: { class: 'tag-blue', dot: 'dot-blue', color: '#3b82f6' },
  orange: { class: 'tag-orange', dot: 'dot-orange', color: '#ff4500' },
  purple: { class: 'tag-purple', dot: 'dot-purple', color: '#8b5cf6' },
  green: { class: 'tag-green', dot: 'dot-green', color: '#10b981' },
  pink: { class: 'tag-pink', dot: 'dot-pink', color: '#ec4899' },
  red: { class: 'tag-red', dot: 'dot-red', color: '#ef4444' },
  indigo: { class: 'tag-indigo', dot: 'dot-indigo', color: '#6366f1' },
  yellow: { class: 'tag-yellow', dot: 'dot-yellow', color: '#eab308' },
  teal: { class: 'tag-teal', dot: 'dot-teal', color: '#14b8a6' },
  cyan: { class: 'tag-cyan', dot: 'dot-cyan', color: '#06b6d4' },
  fuchsia: { class: 'tag-fuchsia', dot: 'dot-fuchsia', color: '#d946ef' },
  emerald: { class: 'tag-emerald', dot: 'dot-emerald', color: '#10b981' },
  amber: { class: 'tag-amber', dot: 'dot-amber', color: '#f59e0b' },
  gray: { class: 'tag-gray', dot: 'dot-gray', color: '#64748b' }
}

const tagData = computed(() => {
  return colorMap[props.color.toLowerCase()] || colorMap.gray
})

const tagClass = computed(() => tagData.value.class)
const dotClass = computed(() => tagData.value.dot)
</script>

<style scoped>
/* ACCELERARE HARDWARE */
.wildfire-tag,
.tag-dot {
  transform: translateZ(0);
  backface-visibility: hidden;
}

.wildfire-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: 30px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  background: #1a1a1a !important;
  color: #e0e0e0 !important;
  border: 1px solid #333333 !important;
  line-height: 1.4;
  white-space: nowrap;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.dark .wildfire-tag {
  background: #151515 !important;
  border: 1px solid #2a2a2a !important;
}

/* ===== DOT FĂRĂ ANIMAȚIE (box-shadow eliminat pentru performanță) ===== */
.tag-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
  /* FĂRĂ box-shadow, fără animație */
}

/* CULORI DOT */
.tag-blue .tag-dot { background: #3b82f6; }
.tag-orange .tag-dot { background: #ff4500; }
.tag-purple .tag-dot { background: #8b5cf6; }
.tag-green .tag-dot { background: #10b981; }
.tag-pink .tag-dot { background: #ec4899; }
.tag-red .tag-dot { background: #ef4444; }
.tag-indigo .tag-dot { background: #6366f1; }
.tag-yellow .tag-dot { background: #eab308; }
.tag-teal .tag-dot { background: #14b8a6; }
.tag-cyan .tag-dot { background: #06b6d4; }
.tag-fuchsia .tag-dot { background: #d946ef; }
.tag-emerald .tag-dot { background: #10b981; }
.tag-amber .tag-dot { background: #f59e0b; }
.tag-gray .tag-dot { background: #64748b; }

/* TEXT COLORAT */
.tag-blue { color: #60a5fa !important; }
.tag-orange { color: #ff8c00 !important; }
.tag-purple { color: #a78bfa !important; }
.tag-green { color: #34d399 !important; }
.tag-pink { color: #f472b6 !important; }
.tag-red { color: #f87171 !important; }
.tag-indigo { color: #818cf8 !important; }
.tag-yellow { color: #fbbf24 !important; }
.tag-teal { color: #2dd4bf !important; }
.tag-cyan { color: #22d3ee !important; }
.tag-fuchsia { color: #e879f9 !important; }
.tag-emerald { color: #34d399 !important; }
.tag-amber { color: #fbbf24 !important; }
.tag-gray { color: #9ca3af !important; }

/* HOVER EFFECT - SIMPLIFICAT */
.wildfire-tag:hover {
  border-color: currentColor !important;
  background: #222 !important;
}
</style>
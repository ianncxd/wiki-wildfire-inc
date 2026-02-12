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
.wildfire-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  background: #2a2a2a !important;
  color: white !important;
  border: 1px solid #404040 !important;
  line-height: 1.4;
  white-space: nowrap;
}

.dark .wildfire-tag {
  background: #1a1a1a !important;
  border: 1px solid #333333 !important;
}

:not(.dark) .wildfire-tag {
  background: #161616 !important;
  border: 1px solid #161616 !important;
}

/* ===== DOT CU ANIMAȚIE ===== */
.tag-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 6px currentColor;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0% {
    opacity: 0.8;
    transform: scale(1);
    box-shadow: 0 0 5px currentColor;
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
    box-shadow: 0 0 12px currentColor;
  }
  100% {
    opacity: 0.8;
    transform: scale(1);
    box-shadow: 0 0 5px currentColor;
  }
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
.tag-blue { color: #3b82f6 !important; }
.tag-orange { color: #ff4500 !important; }
.tag-purple { color: #8b5cf6 !important; }
.tag-green { color: #10b981 !important; }
.tag-pink { color: #ec4899 !important; }
.tag-red { color: #ef4444 !important; }
.tag-indigo { color: #6366f1 !important; }
.tag-yellow { color: #eab308 !important; }
.tag-teal { color: #14b8a6 !important; }
.tag-cyan { color: #06b6d4 !important; }
.tag-fuchsia { color: #d946ef !important; }
.tag-emerald { color: #10b981 !important; }
.tag-amber { color: #f59e0b !important; }
.tag-gray { color: #64748b !important; }

/* DARK MODE - TEXT MAI DESCHIS */
.dark .tag-blue { color: #60a5fa !important; }
.dark .tag-orange { color: #ff8c00 !important; }
.dark .tag-purple { color: #a78bfa !important; }
.dark .tag-green { color: #34d399 !important; }
.dark .tag-pink { color: #f472b6 !important; }
.dark .tag-red { color: #f87171 !important; }
.dark .tag-indigo { color: #818cf8 !important; }
.dark .tag-yellow { color: #fbbf24 !important; }
.dark .tag-teal { color: #2dd4bf !important; }
.dark .tag-cyan { color: #22d3ee !important; }
.dark .tag-fuchsia { color: #e879f9 !important; }
.dark .tag-emerald { color: #34d399 !important; }
.dark .tag-amber { color: #fbbf24 !important; }
.dark .tag-gray { color: #9ca3af !important; }

/* HOVER EFFECT */
.wildfire-tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  border-color: currentColor !important;
}

.wildfire-tag:hover .tag-dot {
  animation: pulse-dot-hover 1s ease-in-out infinite;
}

@keyframes pulse-dot-hover {
  0% {
    transform: scale(1);
    box-shadow: 0 0 8px currentColor;
  }
  50% {
    transform: scale(1.3);
    box-shadow: 0 0 15px currentColor;
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 8px currentColor;
  }
}
</style>
<template>
  <div v-if="tag" class="page-tag-container">
    <div class="page-tag" :class="tagClass">
      <span class="tag-dot" :class="dotClass"></span>
      {{ displayTag }}
      <span v-if="date" class="tag-date">• {{ formatDate(date) }}</span>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()

// Sincronizat cu LastUpdates.vue - toate culorile
const categoryMap = {
  'Informații': { class: 'tag-blue', dot: 'dot-blue' },
  'Sisteme': { class: 'tag-orange', dot: 'dot-orange' },
  'Shop': { class: 'tag-purple', dot: 'dot-purple' },
  'Gambling': { class: 'tag-green', dot: 'dot-green' },
  'Evenimente': { class: 'tag-yellow', dot: 'dot-yellow' },
  'General': { class: 'tag-gray', dot: 'dot-gray' }
}

const tag = computed(() => {
  return frontmatter.value.tag || frontmatter.value.category || 'General'
})

const categoryData = computed(() => {
  return categoryMap[tag.value] || categoryMap['General']
})

const displayTag = computed(() => {
  if (frontmatter.value.category) {
    return frontmatter.value.category
  }
  return frontmatter.value.tag || 'General'
})

const tagClass = computed(() => categoryData.value.class)
const dotClass = computed(() => categoryData.value.dot)

const date = computed(() => frontmatter.value.date || frontmatter.value.updated)

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return dateStr.split('.').reverse().join('.')
}
</script>

<style scoped>
.page-tag-container {
  margin-top: 6px;
  margin-bottom: 16px;
}

.page-tag {
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
}

/* TAG-URI COLORATE - toate definite explicit */
.tag-blue {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.tag-orange {
  background: linear-gradient(135deg, #ff4500, #ff8c00);
}

.tag-purple {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.tag-green {
  background: linear-gradient(135deg, #10b981, #059669);
}

.tag-yellow {
  background: linear-gradient(135deg, #eab308, #ca8a04);
}

.tag-gray {
  background: linear-gradient(135deg, #64748b, #475569);
}

/* Dots */
.tag-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  display: inline-block;
}

.dot-blue {
  background: #3b82f6;
  box-shadow: 0 0 5px #3b82f6;
}

.dot-orange {
  background: #ff4500;
  box-shadow: 0 0 5px #ff4500;
}

.dot-purple {
  background: #8b5cf6;
  box-shadow: 0 0 5px #8b5cf6;
}

.dot-green {
  background: #10b981;
  box-shadow: 0 0 5px #10b981;
}

.dot-yellow {
  background: #eab308;
  box-shadow: 0 0 5px #eab308;
}

.dot-gray {
  background: #64748b;
  box-shadow: 0 0 5px #64748b;
}

.tag-date {
  font-size: 9px;
  font-weight: 400;
  text-transform: none;
  opacity: 0.9;
  color: white;
  margin-left: 2px;
}
</style>
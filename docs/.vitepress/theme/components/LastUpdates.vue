<template>
  <div class="last-updates">
    <div class="updates-header">
      <h2 class="section-title"><span>Recently Updated</span></h2>
      <span class="updates-badge">6 noi</span>
    </div>
    
    <div class="updates-grid">
      <!-- SLOT 1 -->
      <div v-if="card1.active" class="update-card">
        <div class="card-category">
          <span class="category-dot" :class="card1.dotClass"></span>
          <span class="category-name">{{ card1.category }}</span>
        </div>
        <h3 class="card-title">{{ card1.title }}</h3>
        <div class="card-meta">
          <span class="meta-date">📅 {{ card1.date }}</span>
          <div class="updated-by">
            <img :src="card1.avatarUrl" class="github-avatar" :alt="card1.username">
            <span>by <a :href="card1.profileUrl" target="_blank">{{ card1.username }}</a></span>
          </div>
        </div>
        <div class="card-footer">
          <div class="card-tags">
            <WildfireTag :color="card1.tagColor" :text="card1.tag1" class="small-tag" />
            <WildfireTag :color="card1.tagColor" :text="card1.tag2" class="small-tag" />
          </div>
          <a :href="card1.link" class="card-button">
            <span>{{ card1.buttonText }}</span>
            <span class="button-arrow">→</span>
          </a>
        </div>
      </div>

      <!-- SLOT 2 -->
      <div v-if="card2.active" class="update-card">
        <div class="card-category">
          <span class="category-dot" :class="card2.dotClass"></span>
          <span class="category-name">{{ card2.category }}</span>
        </div>
        <h3 class="card-title">{{ card2.title }}</h3>
        <div class="card-meta">
          <span class="meta-date">📅 {{ card2.date }}</span>
          <div class="updated-by">
            <img :src="card2.avatarUrl" class="github-avatar" :alt="card2.username">
            <span>by <a :href="card2.profileUrl" target="_blank">{{ card2.username }}</a></span>
          </div>
        </div>
        <div class="card-footer">
          <div class="card-tags">
            <WildfireTag :color="card2.tagColor" :text="card2.tag1" class="small-tag" />
            <WildfireTag :color="card2.tagColor" :text="card2.tag2" class="small-tag" />
          </div>
          <a :href="card2.link" class="card-button">
            <span>{{ card2.buttonText }}</span>
            <span class="button-arrow">→</span>
          </a>
        </div>
      </div>

      <!-- SLOT 3 -->
      <div v-if="card3.active" class="update-card">
        <div class="card-category">
          <span class="category-dot" :class="card3.dotClass"></span>
          <span class="category-name">{{ card3.category }}</span>
        </div>
        <h3 class="card-title">{{ card3.title }}</h3>
        <div class="card-meta">
          <span class="meta-date">📅 {{ card3.date }}</span>
          <div class="updated-by">
            <img :src="card3.avatarUrl" class="github-avatar" :alt="card3.username">
            <span>by <a :href="card3.profileUrl" target="_blank">{{ card3.username }}</a></span>
          </div>
        </div>
        <div class="card-footer">
          <div class="card-tags">
            <WildfireTag :color="card3.tagColor" :text="card3.tag1" class="small-tag" />
            <WildfireTag :color="card3.tagColor" :text="card3.tag2" class="small-tag" />
          </div>
          <a :href="card3.link" class="card-button">
            <span>{{ card3.buttonText }}</span>
            <span class="button-arrow">→</span>
          </a>
        </div>
      </div>

      <!-- SLOT 4 -->
      <div v-if="card4.active" class="update-card">
        <div class="card-category">
          <span class="category-dot" :class="card4.dotClass"></span>
          <span class="category-name">{{ card4.category }}</span>
        </div>
        <h3 class="card-title">{{ card4.title }}</h3>
        <div class="card-meta">
          <span class="meta-date">📅 {{ card4.date }}</span>
          <div class="updated-by">
            <img :src="card4.avatarUrl" class="github-avatar" :alt="card4.username">
            <span>by <a :href="card4.profileUrl" target="_blank">{{ card4.username }}</a></span>
          </div>
        </div>
        <div class="card-footer">
          <div class="card-tags">
            <WildfireTag :color="card4.tagColor" :text="card4.tag1" class="small-tag" />
            <WildfireTag :color="card4.tagColor" :text="card4.tag2" class="small-tag" />
          </div>
          <a :href="card4.link" class="card-button">
            <span>{{ card4.buttonText }}</span>
            <span class="button-arrow">→</span>
          </a>
        </div>
      </div>

      <!-- SLOT 5 -->
      <div v-if="card5.active" class="update-card">
        <div class="card-category">
          <span class="category-dot" :class="card5.dotClass"></span>
          <span class="category-name">{{ card5.category }}</span>
        </div>
        <h3 class="card-title">{{ card5.title }}</h3>
        <div class="card-meta">
          <span class="meta-date">📅 {{ card5.date }}</span>
          <div class="updated-by">
            <img :src="card5.avatarUrl" class="github-avatar" :alt="card5.username">
            <span>by <a :href="card5.profileUrl" target="_blank">{{ card5.username }}</a></span>
          </div>
        </div>
        <div class="card-footer">
          <div class="card-tags">
            <WildfireTag :color="card5.tagColor" :text="card5.tag1" class="small-tag" />
            <WildfireTag :color="card5.tagColor" :text="card5.tag2" class="small-tag" />
          </div>
          <a :href="card5.link" class="card-button">
            <span>{{ card5.buttonText }}</span>
            <span class="button-arrow">→</span>
          </a>
        </div>
      </div>

      <!-- SLOT 6 -->
      <div v-if="card6.active" class="update-card">
        <div class="card-category">
          <span class="category-dot" :class="card6.dotClass"></span>
          <span class="category-name">{{ card6.category }}</span>
        </div>
        <h3 class="card-title">{{ card6.title }}</h3>
        <div class="card-meta">
          <span class="meta-date">📅 {{ card6.date }}</span>
          <div class="updated-by">
            <img :src="card6.avatarUrl" class="github-avatar" :alt="card6.username">
            <span>by <a :href="card6.profileUrl" target="_blank">{{ card6.username }}</a></span>
          </div>
        </div>
        <div class="card-footer">
          <div class="card-tags">
            <WildfireTag :color="card6.tagColor" :text="card6.tag1" class="small-tag" />
            <WildfireTag :color="card6.tagColor" :text="card6.tag2" class="small-tag" />
          </div>
          <a :href="card6.link" class="card-button">
            <span>{{ card6.buttonText }}</span>
            <span class="button-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
    
    <div class="updates-footer">
      <a href="/informatii/about" class="view-all-link">
        <span>Vezi toate noutățile</span>
        <span class="arrow">→</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import WildfireTag from './WildfireTag.vue'

// CARD 1
const card1 = ref({
  active: true,
  dotClass: 'dot-red',
  category: 'INFORMATII',
  title: 'REGULAMENT GO',
  date: '16.02.2026',
  username: 'ianncxd',
  avatarUrl: 'https://github.com/ianncxd.png',
  profileUrl: 'https://github.com/ianncxd',
  tagColor: 'red',
  tag1: 'info',
  tag2: 'rules',
  link: '/informatii/regulamente/regulament-go',
  buttonText: 'vezi'
})

// CARD 2
const card2 = ref({
  active: true,
  dotClass: 'dot-purple',
  category: 'MARKET',
  title: 'VIP JADE',
  date: '16.02.2026',
  username: 'ianncxd',
  avatarUrl: 'https://github.com/ianncxd.png',
  profileUrl: 'https://github.com/ianncxd',
  tagColor: 'purple',
  tag1: 'vip',
  tag2: 'shop',
  link: '/informatii/regulamente/regulament-go',
  buttonText: 'vezi'
})

// CARD 3
const card3 = ref({
  active: true,
  dotClass: 'dot-green',
  category: 'SYSTEMS',
  title: 'WEAPON SKINS',
  date: '16.02.2026',
  username: 'kazupon',
  avatarUrl: 'https://github.com/kazupon.png',
  profileUrl: 'https://github.com/kazupon',
  tagColor: 'green',
  tag1: 'skins',
  tag2: 'weapons',
  link: '/informatii/regulamente/regulament-go',
  buttonText: 'vezi'
})

// CARD 4
const card4 = ref({
  active: true,
  dotClass: 'dot-amber',
  category: 'SHOP',
  title: 'TRAILS & PETS',
  date: '16.02.2026',
  username: 'ianncxd',
  avatarUrl: 'https://github.com/ianncxd.png',
  profileUrl: 'https://github.com/ianncxd',
  tagColor: 'amber',
  tag1: 'shop',
  tag2: 'stuff',
  link: '/informatii/regulamente/regulament-go',
  buttonText: 'vezi'
})

// CARD 5
const card5 = ref({
  active: true,
  dotClass: 'dot-orange',
  category: 'SHOP',
  title: 'CREDITS',
  date: '16.02.2026',
  username: 'ianncxd',
  avatarUrl: 'https://github.com/ianncxd.png',
  profileUrl: 'https://github.com/ianncxd',
  tagColor: 'orange',
  tag1: 'shop',
  tag2: 'credits',
  link: '/informatii/regulamente/regulament-go',
  buttonText: 'vezi'
})

// CARD 6
const card6 = ref({
  active: true,
  dotClass: 'dot-amber',
  category: 'SHOP',
  title: 'FIRE COINS',
  date: '16.02.2026',
  username: 'kazupon',
  avatarUrl: 'https://github.com/kazupon.png',
  profileUrl: 'https://github.com/kazupon',
  tagColor: 'amber',
  tag1: 'info',
  tag2: 'rules',
  link: '/informatii/regulamente/regulament-go',
  buttonText: 'vezi'
})

// Numără câte carduri sunt active
const activeCards = computed(() => {
  let count = 0
  if (card1.value.active) count++
  if (card2.value.active) count++
  if (card3.value.active) count++
  if (card4.value.active) count++
  if (card5.value.active) count++
  if (card6.value.active) count++
  return count
})
</script>

<style scoped>
/* AICI VIN TOATE STILURILE LA FEL CA MAI SUS */
.last-updates,
.update-card,
.category-dot,
.card-button,
.view-all-link,
.wildfire-tag,
.tag-dot,
.github-avatar {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform, opacity;
}

.last-updates {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 24px;
  width: 100%;
}

.updates-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: #111827;
}

.dark .section-title {
  color: #ffffff;
}

.section-title span {
  background: linear-gradient(135deg, #ff4500, #ff8c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.updates-badge {
  background: linear-gradient(135deg, #ff4500, #ff8c00);
  color: white;
  padding: 4px 16px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(255, 69, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.updates-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 28px;
}

.update-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 18px;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.dark .update-card {
  background: #0a0a0a;
  border: 1px solid #2a2a2a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.update-card:hover {
  transform: translateY(-2px);
  border-color: #ff4500;
  box-shadow: 0 8px 20px -8px rgba(255, 69, 0, 0.2);
}

.card-category {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

.category-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 6px currentColor;
}

.category-name {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7280;
}

.dark .category-name {
  color: #9ca3af;
}

.card-title {
  font-size: 17px;
  font-weight: 800;
  margin: 0 0 14px 0;
  line-height: 1.3;
  color: #111827;
}

.dark .card-title {
  color: #ffffff;
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.dark .card-meta {
  border-bottom: 1px solid #2a2a2a;
}

.meta-date {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
  color: #6b7280;
  background: rgba(0, 0, 0, 0.03);
  padding: 4px 10px;
  border-radius: 30px;
  white-space: nowrap;
}

.dark .meta-date {
  background: rgba(255, 255, 255, 0.05);
  color: #9ca3af;
}

.updated-by {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.03);
  padding: 3px 10px 3px 3px;
  border-radius: 30px;
  white-space: nowrap;
}

.dark .updated-by {
  background: rgba(255, 255, 255, 0.05);
}

.github-avatar {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #ff4500;
  display: block;
  object-fit: cover;
  flex-shrink: 0;
}

.updated-by span {
  font-size: 11px;
  color: #6b7280;
}

.dark .updated-by span {
  color: #9ca3af;
}

.updated-by a {
  color: #ff4500;
  font-weight: 700;
  text-decoration: none;
  margin-left: 2px;
}

.updated-by a:hover {
  text-decoration: underline;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  gap: 8px;
}

.card-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  flex: 1;
  min-width: 0;
}

:deep(.wildfire-tag.small-tag) {
  padding: 3px 10px;
  font-size: 10px;
  font-weight: 700;
  gap: 4px;
  border-radius: 20px;
  white-space: nowrap;
  border: 1px solid currentColor;
  background: transparent;
}

:deep(.wildfire-tag.small-tag .tag-dot) {
  width: 6px;
  height: 6px;
  flex-shrink: 0;
}

:deep(.wildfire-tag[color="blue"]) { color: #3b82f6; }
:deep(.wildfire-tag[color="orange"]) { color: #f97316; }
:deep(.wildfire-tag[color="teal"]) { color: #14b8a6; }
:deep(.wildfire-tag[color="amber"]) { color: #f59e0b; }
:deep(.wildfire-tag[color="purple"]) { color: #8b5cf6; }
:deep(.wildfire-tag[color="pink"]) { color: #ec4899; }
:deep(.wildfire-tag[color="red"]) { color: #ef4444; }
:deep(.wildfire-tag[color="green"]) { color: #10b981; }

.card-button {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #ff4500;
  text-decoration: none;
  font-size: 11px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 30px;
  background: rgba(255, 69, 0, 0.08);
  transition: all 0.2s;
  border: 1px solid transparent;
  white-space: nowrap;
  flex-shrink: 0;
  height: 26px;
}

.dark .card-button {
  background: rgba(255, 69, 0, 0.15);
  color: #ff8c00;
}

.card-button:hover {
  gap: 6px;
  background: rgba(255, 69, 0, 0.12);
  border-color: rgba(255, 69, 0, 0.2);
}

.button-arrow {
  font-size: 12px;
  transition: transform 0.2s;
}

.card-button:hover .button-arrow {
  transform: translateX(3px);
}

.updates-footer {
  text-align: center;
  margin-top: 28px;
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 28px;
  border-radius: 30px;
  background: linear-gradient(135deg, #ff4500, #ff8c00);
  transition: all 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 12px rgba(255, 69, 0, 0.25);
}

.view-all-link:hover {
  gap: 12px;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 69, 0, 0.35);
}

.arrow {
  font-size: 16px;
  transition: transform 0.2s;
}

.view-all-link:hover .arrow {
  transform: translateX(4px);
}

.dot-blue { background: #3b82f6; }
.dot-orange { background: #f97316; }
.dot-amber { background: #f59e0b; }
.dot-teal { background: #14b8a6; }
.dot-purple { background: #8b5cf6; }
.dot-red { background: #ef4444; }
.dot-pink { background: #ec4899; }
.dot-green { background: #10b981; }

@media (max-width: 1024px) {
  .updates-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
}

@media (max-width: 768px) {
  .last-updates {
    padding: 0 20px;
  }
  .section-title {
    font-size: 22px;
  }
  .updates-badge {
    padding: 3px 14px;
    font-size: 12px;
  }
}

@media (max-width: 640px) {
  .updates-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .update-card {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .last-updates {
    padding: 0 16px;
  }
  .section-title {
    font-size: 20px;
  }
  .card-title {
    font-size: 16px;
  }
  .card-meta {
    flex-wrap: wrap;
    gap: 8px;
  }
  .github-avatar {
    width: 20px;
    height: 20px;
  }
  .view-all-link {
    padding: 8px 22px;
    font-size: 13px;
  }
}
</style>
<!-- .vitepress/theme/components/GithubPopout.vue -->
<template>
  <div 
    class="github-popout" 
    :class="{ 'visible': isVisible }"
    :style="popoutStyle"
    ref="popout"
    @mouseenter.stop="onPopoutEnter"
    @mouseleave.stop="onPopoutLeave"
    v-show="isVisible"
  >
    <div class="popout-arrow" :class="{ 'below': isBelow }"></div>
    
    <transition
      enter-active-class="popout-enter-active"
      leave-active-class="popout-leave-active"
      enter-class="popout-enter"
      leave-to-class="popout-leave-to"
    >
      <div v-if="isVisible" class="popout-content" @mouseenter.stop @mouseleave.stop>
        <!-- Background Logo Watermark -->
        <div class="popout-background">
          <img src="/icons/wildfire.png" alt="Wildfire" class="background-logo main" @error="handleImageError">
          <img src="/icons/wildfire.png" alt="Wildfire" class="background-logo secondary" @error="handleImageError">
          <img src="/icons/wildfire.png" alt="Wildfire" class="background-logo tertiary" @error="handleImageError">
        </div>

        <!-- Fire Particles -->
        <div class="fire-particles">
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
        </div>

        <!-- Close Button -->
        <button class="popout-close" @click.stop="closePopout" title="Close (ESC)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <!-- Loading -->
        <div v-if="loading" class="popout-loading">
          <div class="spinner"></div>
          <p>Loading profile...</p>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="popout-error">
          <span class="error-icon">⚠️</span>
          <p>{{ error }}</p>
        </div>

        <!-- Profile -->
        <template v-else>
          <!-- Header cu POZA si INFO -->
          <div class="popout-header">
            <div class="avatar-column">
              <img :src="user.avatar" :alt="user.username" class="popout-avatar" @error="handleAvatarError">
              <a :href="user.profileUrl" target="_blank" rel="noopener noreferrer" @click.stop class="username-link">@{{ user.username }}</a>
            </div>
            
            <div class="info-column">
              <div class="name-row">
                <h3>{{ user.name || user.username }}</h3>
              </div>
              <div class="square-tags" :class="tagClasses">
                <span class="square-tag tag-staff">
                  <img src="/icons/wildfire.png" alt="staff" class="tag-icon original-color" @error="handleIconError">
                  <span>STAFF</span>
                </span>
                <span class="square-tag tag-dev">
                  <img src="/icons/wildfire.png" alt="dev" class="tag-icon original-color" @error="handleIconError">
                  <span>DEV</span>
                </span>
                <span class="square-tag tag-wiki">
                  <img src="/icons/wildfire.png" alt="wiki" class="tag-icon original-color" @error="handleIconError">
                  <span>WIKI</span>
                </span>
                <span class="square-tag tag-trusted">
                  <img src="/icons/wildfire.png" alt="trusted" class="tag-icon original-color" @error="handleIconError">
                  <span>TRUSTED</span>
                </span>
                <span class="square-tag tag-pro">
                  <img src="/icons/wildfire.png" alt="pro" class="tag-icon original-color" @error="handleIconError">
                  <span>PRO</span>
                </span>
                <span class="square-tag tag-vip">
                  <img src="/icons/wildfire.png" alt="vip" class="tag-icon original-color" @error="handleIconError">
                  <span>VIP</span>
                </span>
                <span class="square-tag tag-owner">
                  <img src="/icons/wildfire.png" alt="owner" class="tag-icon original-color" @error="handleIconError">
                  <span>OWNER</span>
                </span>
                <span class="square-tag tag-admin">
                  <img src="/icons/wildfire.png" alt="admin" class="tag-icon original-color" @error="handleIconError">
                  <span>ADMIN</span>
                </span>
                <span class="square-tag tag-mod">
                  <img src="/icons/wildfire.png" alt="mod" class="tag-icon original-color" @error="handleIconError">
                  <span>MOD</span>
                </span>
                <span class="square-tag tag-supporter">
                  <img src="/icons/wildfire.png" alt="supporter" class="tag-icon original-color" @error="handleIconError">
                  <span>SUPPORTER</span>
                </span>
                <span class="square-tag tag-booster">
                  <img src="/icons/wildfire.png" alt="booster" class="tag-icon original-color" @error="handleIconError">
                  <span>BOOSTER</span>
                </span>
                <span class="square-tag tag-partner">
                  <img src="/icons/wildfire.png" alt="partner" class="tag-icon original-color" @error="handleIconError">
                  <span>PARTNER</span>
                </span>
                <span class="square-tag tag-contributor">
                  <img src="/icons/wildfire.png" alt="contributor" class="tag-icon original-color" @error="handleIconError">
                  <span>CONTRIBUTOR</span>
                </span>
                <span class="square-tag tag-wildfire">
                  <img src="/icons/wildfire.png" alt="wildfire" class="tag-icon original-color" @error="handleIconError">
                  <span>WILDFIRE</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Bio -->
          <p v-if="user.bio" class="popout-bio">{{ user.bio }}</p>

          <!-- Stats principale -->
          <div class="popout-stats">
            <div>
              <strong>{{ formatNumber(user.followers) }}</strong>
              <span>Followers</span>
            </div>
            <div>
              <strong>{{ formatNumber(user.following) }}</strong>
              <span>Following</span>
            </div>
            <div>
              <strong>{{ formatNumber(user.publicRepos) }}</strong>
              <span>Repos</span>
            </div>
          </div>

          <!-- SECȚIUNE CONTRIBUȚII - INCENDIARĂ -->
          <div class="contributions-fiery" v-if="user.contributions !== null">
            <!-- Fire glow care apare la hover -->
            <div class="fiery-glow" :class="getFieryGlowClass(user.contributions)"></div>
            
            <!-- Particule de foc pentru贡献i mari -->
            <div v-if="user.contributions >= 10" class="fiery-sparks">
              <div class="spark" v-for="n in 6" :key="n" :style="{ animationDelay: n * 0.2 + 's', left: (n * 15) + '%' }"></div>
            </div>
            
            <div class="fiery-row">
              <div class="fiery-badge" :class="getFieryBadgeClass(user.contributions)">
                <span class="fiery-icon">{{ getFieryIcon(user.contributions) }}</span>
                <span class="fiery-count">{{ formatNumber(user.contributions) }}</span>
                <span class="fiery-label">commit{{ user.contributions !== 1 ? 's' : '' }}</span>
                
                <!-- Efect de flacără la hover pentru贡献i mari -->
                <div v-if="user.contributions >= 20" class="fiery-flame"></div>
              </div>
              
              <div class="fiery-repo">
                <svg class="fiery-repo-icon" width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
                </svg>
                <a href="https://github.com/ianncxd/wiki-wildfire-inc" target="_blank" rel="noopener noreferrer">
                  wiki-wildfire-inc
                </a>
              </div>
            </div>
          </div>

          <!-- Details - location și joined -->
          <div class="popout-details-minimal">
            <div v-if="user.location" class="detail-item">
              <span class="detail-icon">📍</span>
              <span class="detail-text">{{ user.location }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-icon">📅</span>
              <span class="detail-text">Joined {{ formatDate(user.createdAt) }}</span>
            </div>
          </div>

          <!-- Button -->
          <a :href="user.profileUrl" target="_blank" rel="noopener noreferrer" class="popout-button" @click.stop>
            View GitHub Profile →
          </a>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'GithubPopout',
  props: {
    username: {
      type: String,
      required: true
    },
    targetElement: {
      type: HTMLElement,
      required: true
    }
  },
  data() {
    return {
      isVisible: false,
      isBelow: false,
      loading: true,
      error: null,
      user: {
        username: this.username,
        name: '',
        avatar: `https://github.com/${this.username}.png`,
        bio: '',
        followers: 0,
        following: 0,
        publicRepos: 0,
        location: '',
        company: '',
        blog: '',
        createdAt: '',
        profileUrl: `https://github.com/${this.username}`,
        contributions: null
      },
      popoutStyle: {},
      tagClasses: ''
    }
  },
  mounted() {
    this.fetchUserData()
    this.fetchUserContributions()
    window.addEventListener('resize', this.positionPopout)
    window.addEventListener('scroll', this.positionPopout, true)
    window.addEventListener('keydown', this.handleKeyDown)
    
    if (this.targetElement) {
      this.tagClasses = this.targetElement.getAttribute('data-tags') || ''
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.positionPopout)
    window.removeEventListener('scroll', this.positionPopout, true)
    window.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    async fetchUserData() {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch(`https://api.github.com/users/${this.username}`)
        const data = await response.json()
        
        this.user = {
          ...this.user,
          username: this.username,
          name: data.name || this.username,
          avatar: data.avatar_url || this.user.avatar,
          bio: data.bio || 'No bio available',
          followers: data.followers || 0,
          following: data.following || 0,
          publicRepos: data.public_repos || 0,
          location: data.location || '',
          company: data.company || '',
          blog: data.blog || '',
          createdAt: data.created_at,
          profileUrl: data.html_url || this.user.profileUrl
        }
      } catch (error) {
        this.error = 'Failed to load profile'
      } finally {
        this.loading = false
      }
    },
    
    async fetchUserContributions() {
      try {
        const response = await fetch('https://api.github.com/repos/ianncxd/wiki-wildfire-inc/contributors')
        const contributors = await response.json()
        
        const contributor = contributors.find(c => 
          c.login.toLowerCase() === this.username.toLowerCase()
        )
        
        if (contributor) {
          this.user.contributions = contributor.contributions
        } else {
          this.user.contributions = 0
        }
      } catch (error) {
        console.log('Nu s-au putut încărca contribuțiile:', error)
        this.user.contributions = 0
      }
    },
    
    getFieryBadgeClass(contributions) {
      if (contributions >= 100) return 'badge-inferno'
      if (contributions >= 50) return 'badge-blaze'
      if (contributions >= 20) return 'badge-fire'
      if (contributions >= 10) return 'badge-flame'
      if (contributions >= 5) return 'badge-spark'
      if (contributions >= 1) return 'badge-ember'
      return 'badge-ash'
    },
    
    getFieryGlowClass(contributions) {
      if (contributions >= 100) return 'glow-inferno'
      if (contributions >= 50) return 'glow-blaze'
      if (contributions >= 20) return 'glow-fire'
      if (contributions >= 10) return 'glow-flame'
      return 'glow-none'
    },
    
    getFieryIcon(contributions) {
      if (contributions >= 100) return '🔥🔥'
      if (contributions >= 50) return '🔥'
      if (contributions >= 20) return '⚡'
      if (contributions >= 10) return '✨'
      if (contributions >= 5) return '📌'
      if (contributions >= 1) return '🌱'
      return '○'
    },
    
    formatNumber(num) {
      if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
      return num
    },
    
    formatDate(date) {
      if (!date) return 'Unknown'
      return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    },
    
    positionPopout() {
      this.$nextTick(() => {
        if (!this.targetElement || !this.$refs.popout) return
        
        const targetRect = this.targetElement.getBoundingClientRect()
        const popoutRect = this.$refs.popout.getBoundingClientRect()
        
        let left = targetRect.left + (targetRect.width / 2) - (popoutRect.width / 2)
        let top = targetRect.top - popoutRect.height - 15
        
        if (left < 20) left = 20
        if (left + popoutRect.width > window.innerWidth - 20) {
          left = window.innerWidth - popoutRect.width - 20
        }
        
        if (top < 20) {
          top = targetRect.bottom + 15
          this.isBelow = true
        } else {
          this.isBelow = false
        }
        
        this.popoutStyle = {
          left: left + 'px',
          top: top + window.scrollY + 'px'
        }
      })
    },
    
    show() {
      this.isVisible = true
      this.$nextTick(() => {
        this.positionPopout()
      })
    },
    
    hide() {
      this.isVisible = false
    },
    
    closePopout() {
      this.hide()
      this.$emit('close')
    },
    
    handleKeyDown(e) {
      if (e.key === 'Escape' && this.isVisible) {
        this.closePopout()
      }
    },
    
    onPopoutEnter() {
      this.$emit('popout-enter')
    },
    
    onPopoutLeave() {
      this.$emit('popout-leave')
    },
    
    handleImageError(e) {
      e.target.style.display = 'none'
    },
    
    handleIconError(e) {
      e.target.style.display = 'none'
    },
    
    handleAvatarError(e) {
      e.target.src = `https://github.com/${this.username}.png`
    }
  }
}
</script>

<style scoped>
/* ===== STILURI DE BAZĂ ===== */
.github-popout {
  position: absolute;
  z-index: 9999;
  filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.5));
  pointer-events: none;
}

.popout-arrow {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #1a1a1a;
  transform: rotate(45deg);
  bottom: -8px;
  left: 50%;
  margin-left: -8px;
  border-bottom: 2px solid #ff4500;
  border-right: 2px solid #ff4500;
  border-radius: 2px;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.popout-arrow.below {
  top: -8px;
  bottom: auto;
  transform: rotate(45deg);
  border-top: 2px solid #ff4500;
  border-left: 2px solid #ff4500;
  border-bottom: none;
  border-right: none;
}

.github-popout.visible .popout-arrow {
  opacity: 1;
}

.popout-enter-active {
  animation: fadeInScale 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.popout-leave-active {
  animation: fadeOutScale 0.2s cubic-bezier(0.4, 0, 1, 1);
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes fadeOutScale {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.95) translateY(5px);
  }
}

.popout-content {
  background: linear-gradient(135deg, #1a0f0a, #2a150a, #1f0f05);
  border: 2px solid #ff4500;
  border-radius: 20px;
  padding: 20px 16px 16px 16px;
  width: 280px;
  color: white;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(10px);
  background: rgba(26, 10, 5, 0.95);
  transform-origin: top center;
  will-change: transform, opacity;
  overflow: hidden;
  pointer-events: auto;
  box-shadow: 0 0 30px rgba(255, 69, 0, 0.4);
}

.popout-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 30%, rgba(255, 69, 0, 0.25), transparent 70%),
              radial-gradient(circle at 70% 80%, rgba(255, 140, 0, 0.2), transparent 70%);
  pointer-events: none;
  z-index: -1;
  animation: fireGlow 3s ease-in-out infinite;
}

@keyframes fireGlow {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

.popout-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}

.background-logo {
  position: absolute;
  width: 120px;
  height: 120px;
  opacity: 0.12;
  filter: brightness(0) invert(1) drop-shadow(0 0 5px #ff4500);
  animation: floatWildfire 10s ease-in-out infinite;
}

.background-logo.main {
  bottom: -10px;
  right: -10px;
  width: 150px;
  height: 150px;
  opacity: 0.15;
  transform: rotate(5deg);
  animation: floatMain 12s ease-in-out infinite;
}

.background-logo.secondary {
  top: -20px;
  left: -20px;
  width: 130px;
  height: 130px;
  opacity: 0.1;
  transform: rotate(-8deg);
  animation: floatSecondary 15s ease-in-out infinite;
}

.background-logo.tertiary {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(15deg);
  width: 180px;
  height: 180px;
  opacity: 0.05;
  filter: blur(4px) brightness(0) invert(1);
  animation: floatTertiary 20s ease-in-out infinite;
}

@keyframes floatMain {
  0%, 100% { transform: rotate(5deg) translateY(0); }
  50% { transform: rotate(8deg) translateY(-10px); }
}

@keyframes floatSecondary {
  0%, 100% { transform: rotate(-8deg) translateY(0); }
  50% { transform: rotate(-12deg) translateY(10px); }
}

@keyframes floatTertiary {
  0%, 100% { transform: translate(-50%, -50%) rotate(15deg) scale(1); }
  50% { transform: translate(-50%, -50%) rotate(25deg) scale(1.1); }
}

.fire-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: -1;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #ff4500;
  border-radius: 50%;
  filter: blur(2px);
  opacity: 0;
  animation: particleFloat 3s ease-in-out infinite;
}

.particle:nth-child(1) { left: 20%; top: 30%; animation-delay: 0s; }
.particle:nth-child(2) { left: 70%; top: 60%; animation-delay: 0.5s; }
.particle:nth-child(3) { left: 40%; top: 80%; animation-delay: 1s; }
.particle:nth-child(4) { left: 85%; top: 20%; animation-delay: 1.5s; }
.particle:nth-child(5) { left: 15%; top: 70%; animation-delay: 2s; }

@keyframes particleFloat {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  25% {
    opacity: 0.6;
  }
  50% {
    transform: translateY(-30px) scale(2);
    opacity: 0.4;
  }
  75% {
    opacity: 0.2;
  }
  100% {
    transform: translateY(-60px) scale(1);
    opacity: 0;
  }
}

.popout-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 69, 0, 0.2);
  border: 1px solid #ff4500;
  color: #ff4500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
  z-index: 3;
  backdrop-filter: blur(5px);
}

.popout-close:hover {
  background: #ff4500;
  border-color: #ff4500;
  color: white;
  transform: rotate(90deg);
  box-shadow: 0 0 15px #ff4500;
}

.popout-loading {
  text-align: center;
  padding: 30px;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(255, 69, 0, 0.1);
  border-top-color: #ff4500;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 12px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.popout-error {
  text-align: center;
  padding: 30px;
  color: #ff6b6b;
}

.error-icon {
  font-size: 32px;
  margin-bottom: 10px;
  display: block;
}

/* ===== HEADER ===== */
.popout-header {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
}

.avatar-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 70px;
}

.popout-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #ff4500;
  box-shadow: 0 0 15px rgba(255, 69, 0, 0.5);
  transition: transform 0.2s;
  position: relative;
  pointer-events: auto;
}

.popout-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px #ff4500;
}

.username-link {
  color: #ff4500;
  text-decoration: none;
  font-size: 11px;
  font-weight: 500;
  transition: all 0.2s;
  text-align: center;
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.3);
  padding: 2px 6px;
  border-radius: 20px;
  border: 1px solid rgba(255, 69, 0, 0.2);
  backdrop-filter: blur(5px);
  box-sizing: border-box;
}

.username-link:hover {
  color: #ff8c00;
  border-color: #ff8c00;
  background: rgba(0, 0, 0, 0.5);
}

.info-column {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.name-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}

.name-row h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: white;
  text-shadow: 0 0 8px rgba(255, 69, 0, 0.5);
  line-height: 1.2;
}

/* ===== TAGS ===== */
.square-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.square-tags .square-tag {
  display: none;
}

.square-tags.show-staff .tag-staff,
.square-tags.show-dev .tag-dev,
.square-tags.show-wiki .tag-wiki,
.square-tags.show-trusted .tag-trusted,
.square-tags.show-pro .tag-pro,
.square-tags.show-vip .tag-vip,
.square-tags.show-owner .tag-owner,
.square-tags.show-admin .tag-admin,
.square-tags.show-mod .tag-mod,
.square-tags.show-supporter .tag-supporter,
.square-tags.show-booster .tag-booster,
.square-tags.show-partner .tag-partner,
.square-tags.show-contributor .tag-contributor,
.square-tags.show-wildfire .tag-wildfire {
  display: inline-flex !important;
}

.square-tag {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 8px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  line-height: 1;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.tag-icon {
  width: 10px;
  height: 10px;
}

.tag-icon.original-color {
  filter: none;
}

.square-tag.tag-staff {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
}

.square-tag.tag-dev {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.square-tag.tag-wiki {
  background: linear-gradient(135deg, #1abc9c, #16a085);
}

.square-tag.tag-trusted {
  background: linear-gradient(135deg, #f1c40f, #f39c12);
  color: #2c3e50;
}

.square-tag.tag-pro {
  background: linear-gradient(135deg, #ff4500, #ff8c00);
}

.square-tag.tag-vip {
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
}

.square-tag.tag-owner {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.square-tag.tag-admin {
  background: linear-gradient(135deg, #c0392b, #962d22);
}

.square-tag.tag-mod {
  background: linear-gradient(135deg, #16a085, #1e8449);
}

.square-tag.tag-supporter {
  background: linear-gradient(135deg, #f39c12, #e67e22);
}

.square-tag.tag-booster {
  background: linear-gradient(135deg, #8e44ad, #6c3483);
}

.square-tag.tag-partner {
  background: linear-gradient(135deg, #2c3e50, #1a2632);
}

.square-tag.tag-contributor {
  background: linear-gradient(135deg, #7f8c8d, #5d6d6e);
}

.square-tag.tag-wildfire {
  background: linear-gradient(135deg, #ff4500, #ff8c00, #ffd700, #ff4500);
  background-size: 300% 300%;
  animation: wildfireGradient 3s ease infinite;
}

@keyframes wildfireGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.popout-bio {
  font-size: 12px;
  line-height: 1.4;
  color: #e0e0e0;
  margin-bottom: 12px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  border-left: 2px solid #ff4500;
  backdrop-filter: blur(5px);
  position: relative;
  z-index: 1;
  pointer-events: auto;
}

.popout-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-bottom: 12px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 69, 0, 0.2);
  position: relative;
  z-index: 1;
  pointer-events: auto;
}

.popout-stats div {
  text-align: center;
  transition: transform 0.2s;
  pointer-events: auto;
}

.popout-stats div:hover {
  transform: translateY(-1px);
}

.popout-stats strong {
  display: block;
  color: #ff4500;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 2px;
  text-shadow: 0 0 8px rgba(255, 69, 0, 0.5);
}

.popout-stats span {
  font-size: 9px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

/* ===== CONTRIBUȚII INCENDIARE ===== */
.contributions-fiery {
  margin: 8px 0 12px 0;
  padding: 6px 8px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  border: 1px solid rgba(255, 69, 0, 0.2);
  backdrop-filter: blur(5px);
  position: relative;
  z-index: 2;
  pointer-events: auto;
  overflow: hidden;
  transition: all 0.3s ease;
}

.contributions-fiery:hover {
  border-color: #ff4500;
  box-shadow: 0 0 15px rgba(255, 69, 0, 0.3);
}

/* Glow de foc la hover */
.fiery-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: -1;
}

.contributions-fiery:hover .fiery-glow {
  opacity: 0.4;
}

.glow-inferno {
  background: radial-gradient(circle, #ff4500 0%, #ff8c00 30%, transparent 70%);
  animation: rotateSlow 8s linear infinite;
}

.glow-blaze {
  background: radial-gradient(circle, #ff8c00 0%, #ffaa33 30%, transparent 70%);
  animation: rotateSlow 10s linear infinite;
}

.glow-fire {
  background: radial-gradient(circle, #ffaa33 0%, #ffbb55 30%, transparent 70%);
  animation: rotateSlow 12s linear infinite;
}

.glow-flame {
  background: radial-gradient(circle, #ffbb55 0%, #ffcc99 30%, transparent 70%);
  animation: rotateSlow 15s linear infinite;
}

@keyframes rotateSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Scântei pentru贡献i peste 10 */
.fiery-sparks {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.spark {
  position: absolute;
  bottom: 0;
  width: 2px;
  height: 8px;
  background: linear-gradient(to top, #ff4500, transparent);
  border-radius: 1px;
  opacity: 0;
  animation: sparkRise 1.5s ease-out infinite;
}

@keyframes sparkRise {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  100% {
    transform: translateY(-30px) scale(0.3);
    opacity: 0;
  }
}

.fiery-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  position: relative;
  z-index: 2;
}

.fiery-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px 4px 6px;
  border-radius: 30px;
  font-size: 11px;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

/* Efect de flacără la hover pentru贡献i peste 20 */
.fiery-flame {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent, rgba(255, 69, 0, 0.3), transparent);
  opacity: 0;
  animation: flameFlicker 1s ease-in-out infinite;
  pointer-events: none;
}

.fiery-badge:hover .fiery-flame {
  opacity: 1;
}

@keyframes flameFlicker {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.6; }
}

/* Badge colors - INCENDIARE */
.badge-inferno {
  background: linear-gradient(135deg, rgba(255, 69, 0, 0.25), rgba(255, 140, 0, 0.25));
  color: #ff8c00;
  border: 1px solid #ff4500;
  box-shadow: 0 0 10px rgba(255, 69, 0, 0.3);
}

.badge-inferno .fiery-icon {
  animation: firePulse 1s ease-in-out infinite;
}

.badge-blaze {
  background: linear-gradient(135deg, rgba(255, 140, 0, 0.2), rgba(255, 170, 51, 0.2));
  color: #ffaa33;
  border: 1px solid #ff8c00;
}

.badge-fire {
  background: linear-gradient(135deg, rgba(255, 170, 51, 0.2), rgba(255, 187, 85, 0.2));
  color: #ffbb55;
  border: 1px solid #ffaa33;
}

.badge-flame {
  background: linear-gradient(135deg, rgba(255, 187, 85, 0.2), rgba(255, 204, 153, 0.2));
  color: #ffcc99;
  border: 1px solid #ffbb55;
}

.badge-spark {
  background: rgba(224, 224, 224, 0.1);
  color: #e0e0e0;
  border: 1px solid rgba(255, 170, 51, 0.3);
}

.badge-ember {
  background: rgba(255, 255, 255, 0.05);
  color: #aaa;
  border: 1px solid rgba(255, 140, 0, 0.2);
}

.badge-ash {
  background: rgba(255, 255, 255, 0.03);
  color: #666;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

@keyframes firePulse {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px #ff4500); }
  50% { transform: scale(1.2); filter: drop-shadow(0 0 5px #ff8c00); }
}

.fiery-icon {
  font-size: 12px;
}

.fiery-count {
  font-weight: 600;
}

.fiery-label {
  font-size: 8px;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.fiery-repo {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #888;
  font-size: 9px;
  transition: all 0.2s ease;
}

.fiery-repo-icon {
  color: #ff8c00;
  opacity: 0.6;
  transition: all 0.2s ease;
}

.fiery-repo:hover .fiery-repo-icon {
  opacity: 1;
  transform: scale(1.1);
}

.fiery-repo a {
  color: #888;
  text-decoration: none;
  transition: color 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 110px;
}

.fiery-repo a:hover {
  color: #ff8c00;
}

/* ===== DETAILS MINIMAL ===== */
.popout-details-minimal {
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
  pointer-events: auto;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  padding: 6px 10px;
  border: 1px solid rgba(255, 69, 0, 0.1);
  backdrop-filter: blur(5px);
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 0;
  color: #ccc;
  font-size: 11px;
  border-bottom: 1px dashed rgba(255, 69, 0, 0.1);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-icon {
  width: 18px;
  color: #ff4500;
  font-size: 12px;
  text-align: center;
  filter: drop-shadow(0 0 3px #ff4500);
}

.detail-text {
  color: #e0e0e0;
  font-weight: 400;
}

/* ===== BUTTON ===== */
.popout-button {
  display: block;
  text-align: center;
  padding: 8px;
  background: linear-gradient(135deg, #ff4500, #ff8c00);
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 500;
  font-size: 12px;
  transition: all 0.2s;
  border: none;
  position: relative;
  z-index: 1;
  pointer-events: auto;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(255, 69, 0, 0.3);
}

.popout-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(255, 69, 0, 0.5);
}
</style>
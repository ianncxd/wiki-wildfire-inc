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
        <!-- Background Logo Watermark - Wildfire Logo -->
        <div class="popout-background">
          <img src="/icons/wildfire.png" alt="Wildfire" class="background-logo main">
          <img src="/icons/wildfire.png" alt="Wildfire" class="background-logo secondary">
          <img src="/icons/wildfire.png" alt="Wildfire" class="background-logo tertiary">
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
          <!-- Header -->
          <div class="popout-header">
            <img :src="user.avatar" :alt="user.username" class="popout-avatar">
            <div class="popout-header-info">
              <h3>{{ user.name || user.username }}</h3>
              <a :href="user.profileUrl" target="_blank" rel="noopener noreferrer" @click.stop>@{{ user.username }}</a>
            </div>
          </div>

          <!-- Bio -->
          <p v-if="user.bio" class="popout-bio">{{ user.bio }}</p>

          <!-- Stats -->
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

          <!-- Details -->
          <div class="popout-details">
            <div v-if="user.location">
              <span>📍</span> {{ user.location }}
            </div>
            <div v-if="user.company">
              <span>🏢</span> {{ user.company }}
            </div>
            <div v-if="user.blog">
              <span>🔗</span> 
              <a :href="user.blog" target="_blank" rel="noopener noreferrer" @click.stop>{{ formatUrl(user.blog) }}</a>
            </div>
            <div>
              <span>📅</span> Joined {{ formatDate(user.createdAt) }}
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
        profileUrl: `https://github.com/${this.username}`
      },
      popoutStyle: {}
    }
  },
  mounted() {
    this.fetchUserData()
    window.addEventListener('resize', this.positionPopout)
    window.addEventListener('scroll', this.positionPopout, true)
    window.addEventListener('keydown', this.handleKeyDown)
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
    
    formatNumber(num) {
      if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
      return num
    },
    
    formatDate(date) {
      if (!date) return 'Unknown'
      return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    },
    
    formatUrl(url) {
      return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
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
    }
  }
}
</script>

<style scoped>
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
  padding: 24px 20px 20px 20px;
  width: 300px;
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

/* Background Effects - Wildfire Style */
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

/* Background Logo Watermark - Wildfire Logo */
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

/* Fire Particles */
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

.popout-header {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  position: relative;
  z-index: 1;
}

.popout-avatar {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: 3px solid #ff4500;
  box-shadow: 0 0 20px rgba(255, 69, 0, 0.5);
  transition: transform 0.3s;
  position: relative;
  pointer-events: auto;
}

.popout-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px #ff4500;
}

.popout-header-info {
  flex: 1;
}

.popout-header-info h3 {
  margin: 0 0 5px 0;
  font-size: 18px;
  font-weight: 600;
  color: white;
  text-shadow: 0 0 10px rgba(255, 69, 0, 0.5);
}

.popout-header-info a {
  color: #ff4500;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
  position: relative;
  display: inline-block;
  cursor: pointer;
  pointer-events: auto;
}

.popout-header-info a:hover {
  color: #ff8c00;
  text-shadow: 0 0 10px #ff8c00;
}

.popout-header-info a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: #ff4500;
  transition: width 0.2s;
  box-shadow: 0 0 10px #ff4500;
}

.popout-header-info a:hover::after {
  width: 100%;
}

.popout-bio {
  font-size: 14px;
  line-height: 1.6;
  color: #e0e0e0;
  margin-bottom: 15px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  border-left: 3px solid #ff4500;
  backdrop-filter: blur(5px);
  position: relative;
  z-index: 1;
  pointer-events: auto;
}

.popout-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 15px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 14px;
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
  transform: translateY(-2px);
}

.popout-stats strong {
  display: block;
  color: #ff4500;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
  text-shadow: 0 0 10px rgba(255, 69, 0, 0.5);
}

.popout-stats span {
  font-size: 11px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.popout-details {
  margin-bottom: 15px;
  position: relative;
  z-index: 1;
  pointer-events: auto;
}

.popout-details div {
  padding: 10px 0;
  color: #ccc;
  font-size: 13px;
  border-bottom: 1px solid rgba(255, 69, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.2s;
  pointer-events: auto;
}

.popout-details div:hover {
  background: rgba(255, 69, 0, 0.1);
  border-bottom-color: #ff4500;
}

.popout-details div:last-child {
  border-bottom: none;
}

.popout-details span {
  width: 22px;
  color: #ff4500;
  font-size: 14px;
  text-shadow: 0 0 10px #ff4500;
}

.popout-details a {
  color: #ff4500;
  text-decoration: none;
  transition: color 0.2s;
  word-break: break-all;
  pointer-events: auto;
  cursor: pointer;
}

.popout-details a:hover {
  color: #ff8c00;
  text-decoration: underline;
}

.popout-button {
  display: block;
  text-align: center;
  padding: 12px;
  background: linear-gradient(135deg, #ff4500, #ff8c00, #ff4500, #ff8c00);
  background-size: 300% 300%;
  color: white;
  text-decoration: none;
  border-radius: 40px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s;
  border: none;
  position: relative;
  overflow: hidden;
  z-index: 1;
  animation: fireGradient 4s ease infinite;
  pointer-events: auto;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(255, 69, 0, 0.3);
}

@keyframes fireGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.popout-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 69, 0, 0.6);
}

.popout-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
  z-index: -1;
}

.popout-button:hover::before {
  left: 100%;
}
</style>
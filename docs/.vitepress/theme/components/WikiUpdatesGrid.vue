
<template>
  <div class="wiki-home-updates">
    <!-- LEFT SIDE - CARDURI CU PERSONALITATE (MULT SPRE STÂNGA) -->
    <div class="cards-zone">
      <div class="cards-header">
        <div class="header-decoration">
          <span class="header-line"></span>
          <span class="header-tag"> ACTIVITATE</span>
          <span class="header-line"></span>
        </div>
      </div>

      <div class="cards-grid">
        <!-- CARD 1: Top Contribuitor - DINAMIC DIN API -->
        <div class="feature-card card-contributor clickable-card scroll-reveal" 
             @click="openProfile(topContributor.login)"
             :style="{ animationDelay: '0.2s' }"
             ref="card1Ref">
          <div class="card-glow"></div>
          <div class="card-border"></div>
          <div class="click-indicator">👆</div>
          
          <div class="contributor-header">
            <div class="contributor-avatar">
              <img :src="`https://github.com/${topContributor.login}.png`" :alt="topContributor.login">
              <span class="avatar-ring"></span>
              <span class="avatar-crown">👑</span>
            </div>
            <div class="contributor-info">
              <span class="contributor-badge">TOP CONTRIBUTOR</span>
              <h4 class="contributor-name">{{ topContributor.login }}</h4>
              <div class="contributor-stats">
                <span class="contributor-stat">
                  <span class="stat-icon">📦</span>
                  <span class="stat-value">{{ formatNumber(topContributor.contributions) }}</span>
                  <span class="stat-label">commits</span>
                </span>
                <span class="contributor-stat">
                  <span class="stat-icon">⭐</span>
                  <span class="stat-value">{{ formatNumber(topContributor.prs || 0) }}</span>
                  <span class="stat-label">PR-uri</span>
                </span>
              </div>
            </div>
          </div>
          
          <div class="contributor-footer">
            <a :href="`https://github.com/${topContributor.login}`" target="_blank" class="contributor-link clickable-link">
              Vezi profil 
              <span class="link-arrow">→</span>
            </a>
          </div>
        </div>

        <!-- CARD 2: Timeline - 4 update-uri DINAMICE DIN API -->
        <div class="feature-card card-timeline scroll-reveal" 
             :style="{ animationDelay: '0.8s' }"
             ref="card2Ref">
          <div class="card-glow"></div>
          <div class="card-border"></div>
          
          <div class="timeline-header">
            <span class="timeline-icon">📋</span>
            <h4 class="timeline-title">Ultimele 4 update-uri</h4>
          </div>
          
          <div class="timeline-list">
            <div v-for="(commit, index) in recentCommits" :key="commit.id" 
                 class="timeline-item clickable-item" 
                 @click="openCommit(commit.url)">
              <div class="timeline-dot" :style="{ animationDelay: `${index * 0.2}s` }"></div>
              <div class="timeline-content">
                <div class="timeline-top">
                  <span class="timeline-emoji">{{ commit.emoji }}</span>
                  <span class="timeline-message">{{ commit.message }}</span>
                </div>
                <div class="timeline-meta">
                  <span class="timeline-author">@{{ commit.author }}</span>
                  <span class="timeline-date">{{ formatDate(commit.date) }}</span>
                </div>
              </div>
              <span class="item-click-icon">→</span>
            </div>
            <div v-if="isLoading && recentCommits.length === 0" class="timeline-loading">
              <span class="loading-spinner"></span>
              <span>Se încarcă...</span>
            </div>
          </div>
          
          <div class="view-all-updates-wrapper">
            <a :href="`https://github.com/ianncxd/wiki-wildfire-inc/commits/main`" target="_blank" class="view-all-updates-btn">
              <span>Vezi toate update-urile</span>
              <span class="btn-arrow">→</span>
            </a>
          </div>
        </div>

        <!-- CARD 3: Statistici Rapide (DINAMICE DIN API) -->
        <div class="feature-card card-stats-quick scroll-reveal" 
             :style="{ animationDelay: '1.6s' }"
             ref="card3Ref">
          <div class="card-glow"></div>
          <div class="card-border"></div>
          
          <div class="stats-quick-header">
            <span class="stats-quick-icon">📊</span>
            <h4 class="stats-quick-title">Repo în cifre</h4>
          </div>
          
          <div class="stats-quick-grid">
            <div class="stats-quick-item">
              <span class="stats-quick-value">{{ formatNumber(repoStats.totalCommits) }}</span>
              <span class="stats-quick-label">commits</span>
            </div>
            <div class="stats-quick-item">
              <span class="stats-quick-value">{{ formatNumber(repoStats.contributors) }}</span>
              <span class="stats-quick-label">contribuitori</span>
            </div>
            <div class="stats-quick-item">
              <span class="stats-quick-value">{{ formatNumber(repoStats.files) }}</span>
              <span class="stats-quick-label">fișiere</span>
            </div>
            <div class="stats-quick-item">
              <span class="stats-quick-value">{{ formatNumber(repoStats.stars) }}</span>
              <span class="stats-quick-label">stars</span>
            </div>
          </div>
        </div>

        <!-- CARD 4: + Card (Contribuie) -->
        <div class="feature-card card-plus clickable-card scroll-reveal" 
             @click="openContributing"
             :style="{ animationDelay: '2.4s' }"
             ref="card4Ref">
          <div class="card-glow"></div>
          <div class="card-border"></div>
          <div class="click-indicator">👆</div>
          
          <div class="plus-content">
            <div class="plus-icon">+</div>
            <h4 class="plus-title">Contribuie și tu</h4>
            <p class="plus-description">Vrei să ajuți? Orice contribuție contează.</p>
            <div class="plus-stats">
              <span class="plus-stat">🔧 {{ repoStats.openIssues }} issue-uri deschise</span>
              <span class="plus-stat">📝 {{ repoStats.openPRs }} PR-uri deschise</span>
            </div>
            <a :href="`https://github.com/ianncxd/wiki-wildfire-inc/issues`" target="_blank" class="plus-link clickable-link">
              Află cum 
              <span class="link-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT SIDE - DESPRE CONTRIBUITORI (CENTRAT) -->
    <div class="text-zone">
      <div class="text-content">
        <!-- Header cu vertical line -->
        <div class="header-block scroll-reveal" 
             :style="{ animationDelay: '0.1s' }"
             ref="headerRef">
          <div class="vertical-line"></div>
          <div class="header-text">
            <span class="header-tag">🤝 COMUNITATE</span>
            <h2 class="main-title">
              <span class="title-static">DESPRE</span>
              <span class="title-gradient">CONTRIBUITORI</span>
            </h2>
          </div>
        </div>
        
        <!-- Description -->
        <div class="description-block scroll-reveal" 
             :style="{ animationDelay: '0.3s' }"
             ref="descRef">
          <p class="description-main">
            Documentația asta nu se scrie singură. În spatele ei sunt oameni care 
            au contribuit cu timp, cunoștințe și răbdare ca tu să ai toate informațiile la îndemână.
          </p>
          <p class="description-secondary">
            <span class="description-highlight">{{ formatNumber(repoStats.totalCommits) }} de commit-uri</span> au fost necesare 
            până acum. Unele au adăugat pagini noi, altele au corectat greșeli, 
            altele au clarificat explicații. Fiecare a contat.
          </p>
        </div>

        <!-- Cum poți contribui -->
        <div class="how-to-block">
          <div class="how-to-item scroll-reveal" 
               :style="{ animationDelay: '0.5s' }"
               ref="howToItem1Ref">
            <div class="how-to-svg">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="1.5" fill="none"/>
                <path d="M21 21L17 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="how-to-content">
              <div class="how-to-header">
                <span class="how-to-tag">PASUL 01</span>
                <div class="how-to-line"></div>
              </div>
              <h4>Găsește ceva de îmbunătățit</h4>
              <p>O greșeală, un exemplu neclar, o pagină lipsă. Orice pagină poate fi mai bună.</p>
            </div>
          </div>
          
          <div class="how-to-item scroll-reveal" 
               :style="{ animationDelay: '0.7s' }"
               ref="howToItem2Ref">
            <div class="how-to-svg">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M6 5L18 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M6 12L18 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M6 19L18 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="6" cy="5" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="18" cy="5" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
            <div class="how-to-content">
              <div class="how-to-header">
                <span class="how-to-tag">PASUL 02</span>
                <div class="how-to-line"></div>
              </div>
              <h4>Deschide un Pull Request</h4>
              <p>Fork, modifici, faci PR. Durează 5 minute și ajută pe toată lumea.</p>
            </div>
          </div>
          
          <div class="how-to-item scroll-reveal" 
               :style="{ animationDelay: '0.9s' }"
               ref="howToItem3Ref">
            <div class="how-to-svg">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 2L15 9H22L16 14L19 21L12 16.5L5 21L8 14L2 9H9L12 2Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
              </svg>
            </div>
            <div class="how-to-content">
              <div class="how-to-header">
                <span class="how-to-tag">PASUL 03</span>
                <div class="how-to-line"></div>
              </div>
              <h4>Apari în istoric</h4>
              <p>Contribuția ta rămâne în wiki și e vizibilă pentru toată lumea.</p>
            </div>
          </div>
        </div>

        <!-- Stats și CTA -->
        <div class="cta-block scroll-reveal" 
             :style="{ animationDelay: '1.1s' }"
             ref="ctaRef">
          <a href="https://github.com/ianncxd/wiki-wildfire-inc" target="_blank" class="cta-button primary clickable-button">
            <span>🐙 GitHub</span>
            <span class="button-arrow">→</span>
          </a>
          <a href="/informatii/contributing" class="cta-button secondary clickable-button">
            <span>📖 Ghid contribuție</span>
            <span class="button-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WikiUpdatesGrid',
  
  data() {
    return {
      // 🔥 TOKEN DIRECT AICI - GATA!
      githubToken: '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',
      
      // Date din API
      repoStats: {
        totalCommits: 0,
        contributors: 0,
        files: 0,
        stars: 0,
        openIssues: 0,
        openPRs: 0
      },
      topContributor: {
        login: 'ianncxd',
        contributions: 0,
        prs: 0
      },
      recentCommits: [],
      isLoading: true,
      
      // Referințe pentru scroll reveal
      card1Ref: null,
      card2Ref: null,
      card3Ref: null,
      card4Ref: null,
      headerRef: null,
      descRef: null,
      howToItem1Ref: null,
      howToItem2Ref: null,
      howToItem3Ref: null,
      ctaRef: null
    }
  },

  async mounted() {
    // Setup referințe
    this.card1Ref = this.$refs.card1Ref;
    this.card2Ref = this.$refs.card2Ref;
    this.card3Ref = this.$refs.card3Ref;
    this.card4Ref = this.$refs.card4Ref;
    this.headerRef = this.$refs.headerRef;
    this.descRef = this.$refs.descRef;
    this.howToItem1Ref = this.$refs.howToItem1Ref;
    this.howToItem2Ref = this.$refs.howToItem2Ref;
    this.howToItem3Ref = this.$refs.howToItem3Ref;
    this.ctaRef = this.$refs.ctaRef;
    
    this.setupScrollReveal();
    window.addEventListener('scroll', this.handleScroll);
    
    // Fetch ALL data from GitHub
    await this.fetchAllGitHubData();
    
    setTimeout(() => {
      this.handleScroll();
    }, 100);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    async fetchAllGitHubData() {
      this.isLoading = true;
      
      const owner = 'ianncxd';
      const repo = 'wiki-wildfire-inc';
      const baseUrl = `https://api.github.com/repos/${owner}/${repo}`;
      
      const headers = {
        'Authorization': `token ${this.githubToken}`,
        'Accept': 'application/vnd.github.v3+json'
      };

      try {
        console.log('Fetching GitHub data with token...');
        
        // 1. Fetch commits (ultimele 4)
        const commitsRes = await fetch(`${baseUrl}/commits?per_page=4`, { headers });
        if (!commitsRes.ok) throw new Error(`Commits error: ${commitsRes.status}`);
        const commits = await commitsRes.json();
        
        // Formatează commit-urile
        this.recentCommits = commits.map((commit, index) => ({
          id: commit.sha.substring(0, 7),
          message: commit.commit.message.split('\n')[0],
          emoji: this.getCommitEmoji(commit.commit.message),
          author: commit.author?.login || commit.commit.author.name,
          date: commit.commit.author.date,
          url: commit.html_url
        }));

        // 2. Fetch repo info (stars)
        const repoRes = await fetch(baseUrl, { headers });
        if (!repoRes.ok) throw new Error(`Repo error: ${repoRes.status}`);
        const repoData = await repoRes.json();
        
        // 3. Fetch contributors (top contributor și număr total)
        const contributorsRes = await fetch(`${baseUrl}/contributors?per_page=1&anon=1`, { headers });
        if (!contributorsRes.ok) throw new Error(`Contributors error: ${contributorsRes.status}`);
        const contributors = await contributorsRes.json();
        
        // Extrage numărul total de contributori din header
        const contributorsLink = contributorsRes.headers.get('Link');
        let totalContributors = 1;
        if (contributorsLink) {
          const match = contributorsLink.match(/&page=(\d+)>; rel="last"/);
          if (match && match[1]) {
            totalContributors = parseInt(match[1], 10);
          }
        }
        
        // Setează top contributor
        if (contributors && contributors.length > 0) {
          this.topContributor = {
            login: contributors[0].login,
            contributions: contributors[0].contributions,
            prs: Math.floor(contributors[0].contributions * 0.1) // aproximare
          };
        }

        // 4. Fetch numărul total de commit-uri din header
        const allCommitsRes = await fetch(`${baseUrl}/commits?per_page=1`, { headers });
        const allCommitsLink = allCommitsRes.headers.get('Link');
        let totalCommits = 0;
        if (allCommitsLink) {
          const match = allCommitsLink.match(/&page=(\d+)>; rel="last"/);
          if (match && match[1]) {
            totalCommits = parseInt(match[1], 10);
          }
        }

        // 5. Fetch tree pentru numărul de fișiere
        let totalFiles = 0;
        try {
          const treeRes = await fetch(`${baseUrl}/git/trees/main?recursive=1`, { headers });
          if (treeRes.ok) {
            const treeData = await treeRes.json();
            totalFiles = treeData.tree?.filter(item => item.type === 'blob').length || 0;
          }
        } catch (e) {
          console.log('Nu s-au putut încărca fișierele');
        }

        // 6. Fetch issues și PR-uri
        // Issue-uri deschise
        const issuesRes = await fetch(`${baseUrl}/issues?state=open&per_page=1`, { headers });
        const issuesLink = issuesRes.headers.get('Link');
        let openIssues = 0;
        if (issuesLink) {
          const match = issuesLink.match(/&page=(\d+)>; rel="last"/);
          if (match && match[1]) {
            openIssues = parseInt(match[1], 10);
          }
        }

        // PR-uri deschise
        const pullsRes = await fetch(`${baseUrl}/pulls?state=open&per_page=1`, { headers });
        const pullsLink = pullsRes.headers.get('Link');
        let openPRs = 0;
        if (pullsLink) {
          const match = pullsLink.match(/&page=(\d+)>; rel="last"/);
          if (match && match[1]) {
            openPRs = parseInt(match[1], 10);
          }
        }

        // Actualizează stats cu valorile AUTOMATE
        this.repoStats = {
          totalCommits: totalCommits,
          contributors: totalContributors,
          files: totalFiles,
          stars: repoData.stargazers_count || 0,
          openIssues: openIssues,
          openPRs: openPRs
        };

        console.log('GitHub data loaded - 100% AUTOMAT:', this.repoStats);

      } catch (error) {
        console.error('Eroare la fetch date GitHub:', error);
        // În caz de eroare, lasă valorile default (0) - fără fallback manual
      } finally {
        this.isLoading = false;
      }
    },

    getCommitEmoji(message) {
      const msg = message.toLowerCase();
      if (msg.includes('fix') || msg.includes('bug')) return '🐛';
      if (msg.includes('add') || msg.includes('nou')) return '✨';
      if (msg.includes('update') || msg.includes('actualiz')) return '🔄';
      if (msg.includes('doc') || msg.includes('readme')) return '📝';
      if (msg.includes('style') || msg.includes('css')) return '🎨';
      if (msg.includes('refactor')) return '♻️';
      return '🔨';
    },

    formatNumber(num) {
      if (!num && num !== 0) return '0';
      if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
      return num.toString();
    },

    formatDate(date) {
      const d = new Date(date);
      const now = new Date();
      const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24));
      
      if (diff === 0) return 'azi';
      if (diff === 1) return 'ieri';
      if (diff < 7) return `acum ${diff} zile`;
      return d.toLocaleDateString('ro-RO', { 
        day: 'numeric', 
        month: 'short'
      });
    },

    openProfile(username) {
      if (username) window.open(`https://github.com/${username}`, '_blank');
    },

    openCommit(url) {
      window.open(url, '_blank');
    },

    openContributing() {
      window.location.href = '/informatii/contributing';
    },

    // Scroll reveal functions
    isElementInViewport(el) {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      return rect.top < windowHeight * 0.85 && rect.bottom > 0;
    },

    applyRevealEffect() {
      const elements = [
        this.card1Ref,
        this.card2Ref,
        this.card3Ref,
        this.card4Ref,
        this.headerRef,
        this.descRef,
        this.howToItem1Ref,
        this.howToItem2Ref,
        this.howToItem3Ref,
        this.ctaRef
      ].filter(el => el !== null && el !== undefined);

      elements.forEach(el => {
        if (this.isElementInViewport(el)) {
          el.classList.add('revealed');
        } else {
          el.classList.remove('revealed');
        }
      });
    },

    handleScroll() {
      this.applyRevealEffect();
    },

    setupScrollReveal() {}
  }
}
</script>

  <style scoped>
/* ===== EFFECT DE SCROLL REVEAL ===== */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* ===== CONTAINER PRINCIPAL ===== */
.wiki-home-updates {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 60px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 40px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Orbitron', sans-serif;
}

/* ===== LEFT ZONE ===== */
.cards-zone {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.cards-header {
  margin-bottom: 10px;
}

.header-decoration {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.header-line {
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ff4500, #ff8c00, transparent);
}

.header-tag {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  color: #ff4500;
  text-transform: uppercase;
  font-family: 'Orbitron', sans-serif;
}

.cards-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: var(--vp-c-text-1);
  font-family: 'Orbitron', sans-serif;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

/* ===== SCROLL REVEAL ANIMATION ===== */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s cubic-bezier(0.2, 0.9, 0.3, 1), 
              transform 0.8s cubic-bezier(0.2, 0.9, 0.3, 1);
  will-change: opacity, transform;
}

.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered delays for children inside cards */
.card-timeline .timeline-item {
  opacity: 0;
  transform: translateX(-10px);
  animation: itemReveal 0.5s ease forwards;
  animation-play-state: paused;
}

.card-timeline.revealed .timeline-item {
  animation-play-state: running;
}

.card-timeline.revealed .timeline-item:nth-child(1) {
  animation-delay: 0.1s;
}

.card-timeline.revealed .timeline-item:nth-child(2) {
  animation-delay: 0.3s;
}

.card-timeline.revealed .timeline-item:nth-child(3) {
  animation-delay: 0.5s;
}

.card-timeline.revealed .timeline-item:nth-child(4) {
  animation-delay: 0.7s;
}

@keyframes itemReveal {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Stats items staggered reveal */
.card-stats-quick.revealed .stats-quick-item {
  animation: statsPop 0.4s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
  opacity: 0;
  transform: scale(0.9);
}

.card-stats-quick.revealed .stats-quick-item:nth-child(1) {
  animation-delay: 0.1s;
}

.card-stats-quick.revealed .stats-quick-item:nth-child(2) {
  animation-delay: 0.2s;
}

.card-stats-quick.revealed .stats-quick-item:nth-child(3) {
  animation-delay: 0.3s;
}

.card-stats-quick.revealed .stats-quick-item:nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes statsPop {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* How-to items staggered reveal */
.how-to-block.revealed .how-to-item {
  animation: slideIn 0.5s ease forwards;
  opacity: 0;
  transform: translateX(-15px);
}

.how-to-item:nth-child(1) {
  animation-delay: 0.1s;
}

.how-to-item:nth-child(2) {
  animation-delay: 0.3s;
}

.how-to-item:nth-child(3) {
  animation-delay: 0.5s;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ===== FEATURE CARDS ===== */
.feature-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-6px);
}

/* Glow */
.card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(255, 69, 0, 0.3), transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 1;
}

.feature-card:hover .card-glow {
  opacity: 0.6;
}

/* Gradient border */
.card-border {
  position: absolute;
  inset: 0;
  border-radius: 24px;
  padding: 1px;
  background: linear-gradient(145deg, rgba(255, 69, 0, 0.3), #ff4500, transparent);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.feature-card:hover .card-border {
  opacity: 1;
}

/* ===== ELEMENTE CLICKABLE ===== */
.clickable-card {
  cursor: pointer;
  position: relative;
}

.clickable-card:hover .click-indicator {
  opacity: 1;
  transform: scale(1);
}

.click-indicator {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 18px;
  background: rgba(255, 69, 0, 0.2);
  backdrop-filter: blur(4px);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 69, 0, 0.3);
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.clickable-item {
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.clickable-item:hover {
  background: rgba(255, 69, 0, 0.15);
  transform: translateX(4px);
}

.clickable-item:hover .item-click-icon {
  opacity: 1;
  transform: translateX(0);
}

.item-click-icon {
  opacity: 0;
  transform: translateX(-5px);
  transition: all 0.2s ease;
  color: #ff4500;
  font-size: 16px;
  font-weight: bold;
  margin-left: 4px;
}

.clickable-link {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  position: relative;
  padding: 4px 8px;
  border-radius: 20px;
}

.clickable-link:hover {
  color: white !important;
  background: #ff4500;
  gap: 10px;
  padding: 4px 12px;
}

.clickable-link:hover .link-arrow {
  transform: translateX(4px);
}

.link-arrow {
  transition: transform 0.2s ease;
}

.clickable-footer {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  text-decoration: none;
  padding: 10px;
  border-radius: 30px;
}

.clickable-footer:hover {
  background: rgba(255, 69, 0, 0.15);
  gap: 12px;
}

.clickable-footer:hover .footer-arrow {
  transform: translateX(4px);
}

.footer-arrow {
  transition: transform 0.2s ease;
}

.clickable-button {
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.clickable-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -5px rgba(255, 69, 0, 0.4);
}

.clickable-button:hover .button-arrow {
  transform: translateX(4px);
}

.button-arrow {
  transition: transform 0.3s ease;
}

/* ===== CARD 1: TOP CONTRIBUTOR ===== */
.card-contributor {
  grid-column: span 2;
  background: linear-gradient(145deg, rgba(255, 69, 0, 0.1), rgba(255, 140, 0, 0.05));
  backdrop-filter: blur(10px);
  padding: 24px;
}

.dark .card-contributor {
  background: linear-gradient(145deg, rgba(255, 69, 0, 0.15), rgba(0, 0, 0, 0.3));
}

.contributor-header {
  display: flex;
  gap: 24px;
  align-items: center;
  margin-bottom: 20px;
}

.contributor-avatar {
  position: relative;
  width: 80px;
  height: 80px;
}

.contributor-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid #ff4500;
  position: relative;
  z-index: 2;
}

.avatar-ring {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  border: 1px solid #ff4500;
  animation: ringPulse 2s infinite;
}

@keyframes ringPulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.2); opacity: 0; }
}

.avatar-crown {
  position: absolute;
  top: -15px;
  right: -10px;
  font-size: 24px;
  transform: rotate(15deg);
  filter: drop-shadow(0 4px 8px gold);
  z-index: 3;
}

.contributor-info {
  flex: 1;
}

.contributor-badge {
  display: inline-block;
  padding: 4px 12px;
  background: #ff4500;
  color: white;
  border-radius: 30px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.contributor-name {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px;
  color: var(--vp-c-text-1);
  font-family: 'Orbitron', sans-serif;
}

.contributor-stats {
  display: flex;
  gap: 20px;
}

.contributor-stat {
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-icon {
  font-size: 14px;
  opacity: 0.8;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: #ff4500;
}

.stat-label {
  font-size: 11px;
  color: var(--vp-c-text-2);
}

.contributor-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 69, 0, 0.2);
}

.contributor-quote {
  font-style: italic;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.contributor-link {
  color: #ff4500;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
}

/* ===== CARD 2: TIMELINE ===== */
.card-timeline {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  padding: 20px;
}

.dark .card-timeline {
  background: rgba(0, 0, 0, 0.3);
}

.timeline-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.timeline-icon {
  font-size: 24px;
}

.timeline-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--vp-c-text-1);
  font-family: 'Orbitron', sans-serif;
}

.timeline-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.timeline-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 8px;
  border-radius: 12px;
}

.timeline-dot {
  width: 8px;
  height: 8px;
  background: #ff4500;
  border-radius: 50%;
  margin-top: 6px;
  animation: dotPulse 2s infinite;
  opacity: 0;
}

@keyframes dotPulse {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
  100% { opacity: 1; transform: scale(1); }
}

.timeline-content {
  flex: 1;
}

.timeline-top {
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
}

.timeline-emoji {
  font-size: 14px;
}

.timeline-message {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.timeline-meta {
  display: flex;
  gap: 12px;
  font-size: 11px;
}

.timeline-author {
  color: #ff4500;
}

.timeline-date {
  color: var(--vp-c-text-3);
}

/* ===== CARD 3: STATS RAPIDE ===== */
.card-stats-quick {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  padding: 20px;
}

.stats-quick-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.stats-quick-icon {
  font-size: 24px;
}

.stats-quick-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--vp-c-text-1);
  font-family: 'Orbitron', sans-serif;
}

.stats-quick-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.stats-quick-item {
  text-align: center;
  padding: 12px;
  background: rgba(255, 69, 0, 0.05);
  border-radius: 12px;
  transition: all 0.2s;
}

.stats-quick-item:hover {
  background: rgba(255, 69, 0, 0.1);
  transform: scale(1.05);
}

.stats-quick-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: #ff4500;
  line-height: 1.2;
  font-family: 'Orbitron', sans-serif;
}

.stats-quick-label {
  font-size: 11px;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
}

/* ===== CARD 4: PLUS ===== */
.card-plus {
  background: linear-gradient(145deg, rgba(255, 69, 0, 0.05), rgba(255, 140, 0, 0.02));
  backdrop-filter: blur(10px);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plus-content {
  text-align: center;
}

.plus-icon {
  font-size: 48px;
  font-weight: 200;
  color: #ff4500;
  margin-bottom: 12px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.plus-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px;
  color: var(--vp-c-text-1);
  font-family: 'Orbitron', sans-serif;
}

.plus-description {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin: 0 0 12px;
}

.plus-stats {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.plus-stat {
  background: rgba(255, 69, 0, 0.05);
  padding: 4px 8px;
  border-radius: 20px;
}

.plus-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #ff4500;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 16px;
  border: 1px solid rgba(255, 69, 0, 0.3);
  border-radius: 30px;
}

/* ===== RIGHT ZONE ===== */
.text-zone {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.text-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 480px;
  margin-left: 0;
  margin-right: auto;
  width: 100%;
}

/* Header block */
.header-block {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.vertical-line {
  width: 4px;
  height: 80px;
  background: linear-gradient(to bottom, #ff4500, #ff8c00, transparent);
  margin-top: 8px;
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header-tag {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 3px;
  color: #ff4500;
  text-transform: uppercase;
  font-family: 'Orbitron', sans-serif;
}

.main-title {
  font-size: 42px;
  font-weight: 800;
  margin: 0;
  color: var(--vp-c-text-1);
  line-height: 1.2;
  font-family: 'Orbitron', sans-serif;
}

.title-static {
  display: block;
}

.title-gradient {
  background: linear-gradient(135deg, #ff4500, #ff8c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

/* Description */
.description-block {
  padding-left: 24px;
}

.description-main {
  font-size: 16px;
  line-height: 1.7;
  color: var(--vp-c-text-1);
  margin: 0 0 12px;
  border-left: 2px solid rgba(255, 69, 0, 0.3);
  padding-left: 20px;
}

.description-secondary {
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0;
  padding-left: 20px;
}

.description-highlight {
  color: #ff4500;
  font-weight: 600;
}

/* ===== HOW TO ===== */
.how-to-block {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 20px;
  margin: 15px 0 20px;
  position: relative;
}

.how-to-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  position: relative;
  padding-bottom: 18px;
  transition: all 0.3s ease;
}

.how-to-item:hover {
  transform: translateX(5px);
}

.how-to-item:hover::after {
  opacity: 1;
  height: 20px;
  width: 3px;
  box-shadow: 0 0 6px rgba(255, 69, 0, 0.5);
}

.how-to-item:last-child {
  padding-bottom: 0;
}

.how-to-svg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 69, 0, 0.05);
  border: 1.5px solid rgba(255, 69, 0, 0.3);
  border-radius: 50%;
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(255, 69, 0, 0.1);
}

.how-to-item:hover .how-to-svg {
  background: #ff4500;
  border-color: #ff4500;
  box-shadow: 0 4px 12px rgba(255, 69, 0, 0.3);
  transform: scale(1.03);
}

.how-to-svg svg {
  width: 18px;
  height: 18px;
  stroke: #ff4500;
  stroke-width: 2;
  transition: all 0.3s ease;
}

.how-to-item:hover .how-to-svg svg {
  stroke: white;
}

.how-to-content {
  flex: 1;
  padding-top: 3px;
}

.how-to-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.how-to-tag {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #ff4500;
  text-transform: uppercase;
  font-family: 'Orbitron', sans-serif;
  background: rgba(255, 69, 0, 0.1);
  padding: 1px 6px;
  border-radius: 16px;
  border: 1px solid rgba(255, 69, 0, 0.2);
  line-height: 1.2;
  white-space: nowrap;
}

.how-to-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, #ff4500, transparent);
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.how-to-item:hover .how-to-line {
  opacity: 0.8;
}

.how-to-content h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 3px;
  color: var(--vp-c-text-1);
  font-family: 'Orbitron', sans-serif;
  transition: color 0.2s ease;
}

.how-to-item:hover .how-to-content h4 {
  color: #ff4500;
}

.how-to-content p {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.4;
}

/* Dark mode adjustments */
.dark .how-to-svg {
  background: rgba(20, 20, 20, 0.9);
  border-color: rgba(255, 69, 0, 0.5);
}

.dark .how-to-item:hover .how-to-svg {
  background: #ff4500;
  border-color: #ff4500;
}

/* CTA */
.cta-block {
  display: flex;
  gap: 10px;
  padding-left: 24px;
  margin-top: 10px;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  font-family: 'Orbitron', sans-serif;
  transition: all 0.2s ease;
  cursor: pointer;
}

.cta-button.primary {
  background: linear-gradient(135deg, #ff4500, #ff8c00);
  color: white;
  border: none;
}

.cta-button.secondary {
  background: rgba(255, 69, 0, 0.1);
  border: 1px solid rgba(255, 69, 0, 0.3);
  color: var(--vp-c-text-1);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px -5px rgba(255, 69, 0, 0.4);
}

.cta-button.secondary:hover {
  background: #ff4500;
  color: white;
}

.cta-button:hover .button-arrow {
  transform: translateX(4px);
}

.button-arrow {
  transition: transform 0.2s ease;
}

/* ===== BUTON SEPARAT PENTRU VIEW ALL UPDATES ===== */
.view-all-updates-wrapper {
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 69, 0, 0.15);
  width: 100%;
}

.view-all-updates-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 69, 0, 0.25);
  border-radius: 30px;
  color: #ff4500;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Orbitron', sans-serif;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  backdrop-filter: blur(4px);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.3px;
}

.dark .view-all-updates-btn {
  background: rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 69, 0, 0.3);
}

.view-all-updates-btn:hover {
  background: rgba(255, 69, 0, 0.1);
  border-color: #ff4500;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(255, 69, 0, 0.2);
}

.view-all-updates-btn .btn-arrow {
  transition: transform 0.2s ease;
  font-size: 14px;
  line-height: 1;
}

.view-all-updates-btn:hover .btn-arrow {
  transform: translateX(4px);
}

/* ===== LOADING ===== */
.timeline-loading {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 69, 0, 0.3);
  border-top-color: #ff4500;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 1100px) {
  .wiki-home-updates {
    grid-template-columns: 1fr;
    gap: 60px;
  }
  
  .text-content {
    margin-left: 0;
    margin-right: auto;
    max-width: 600px;
  }
}

@media (max-width: 700px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
  
  .card-contributor {
    grid-column: span 1;
  }
  
  .contributor-header {
    flex-direction: column;
    text-align: center;
  }
  
  .contributor-stats {
    justify-content: center;
  }
  
  .main-title {
    font-size: 36px;
  }
  
  .header-block {
    flex-direction: column;
    gap: 10px;
  }
  
  .vertical-line {
    width: 80px;
    height: 4px;
  }
  
  .cta-block {
    flex-direction: column;
  }
  
  .click-indicator {
    display: none;
  }
  
  .text-content {
    max-width: 100%;
    padding: 0 20px;
  }
}


.timeline-loading {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 69, 0, 0.3);
  border-top-color: #ff4500;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
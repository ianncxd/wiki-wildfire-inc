import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Wildfire.ro Wiki",
  description: "Documentația platformei Wildfire - informații, sisteme, resurse și comunitate",
  
  lang: 'ro-RO',
  cleanUrls: true,
  
  head: [
    ['link', { rel: 'icon', href: '/icons/wildfire.webp' }],
    ['meta', { name: 'theme-color', content: '#ff4500' }],
    
    // PRELOAD PENTRU LCP
    ['link', { 
      rel: 'preload', 
      as: 'image', 
      href: '/icons/wildfire.webp', 
      fetchpriority: 'high',
      type: 'image/webp'
    }],
    
    // PRELOAD PENTRU BACKGROUND
    ['link', { 
      rel: 'preload', 
      as: 'image', 
      href: '/wallpaper/poza102.jpg', 
      fetchpriority: 'low'
    }],
    
    // META PENTRU CACHE
    ['meta', { 
      'http-equiv': 'Cache-Control', 
      content: 'public, max-age=31536000, immutable' 
    }],
    
    // VIEWPORT OPTIMIZAT
    ['meta', { 
      name: 'viewport', 
      content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0' 
    }]
  ],

  lastUpdated: true,

  themeConfig: {
    logo: {
      src: '/icons/wildfire.webp',
      width: 24,
      height: 24,
      alt: 'Wildfire Logo'
    },
    
    siteTitle: 'Wildfire.ro Wiki',
    
    nav: [
      { 
        text: '<img src="/icons/acasa.svg" class="nav-icon" width="16" height="16" alt=""> Acasă', 
        link: '/' 
      },
      { 
        text: '<img src="/icons/wildfire.webp" class="nav-icon" width="16" height="16" alt=""> Informații', 
        link: '/informatii/about' 
      },
      { 
        text: '<img src="/icons/faq.svg" class="nav-icon" width="16" height="16" alt=""> FAQ', 
        link: '/informatii/faq' 
      },
    ],

    sidebar: [
      // SECȚIUNEA INFORMAȚII
      {
        text: '<img src="/icons/wildfire.webp" class="nav-icon" width="16" height="16" alt=""> Informații',
        collapsed: false,
        items: [
          { text: '<img src="/icons/despre.png" class="nav-icon" width="16" height="16" alt=""> Despre Wildfire', link: '/informatii/about' },
          { text: '<img src="/icons/faq.svg" class="nav-icon" width="16" height="16" alt=""> Întrebări frecvente', link: '/informatii/faq' },
          { 
            text: '<img src="/icons/regulament.svg" class="nav-icon" width="16" height="16" alt=""> Regulament',
            collapsed: true,
            items: [
              { text: '<img src="/icons/awp.svg" class="nav-icon" width="16" height="16" alt=""> Regulament AWP', link: '/informatii/regulamente/regulament-awp' },
              { text: '<img src="/icons/go.svg" class="nav-icon" width="16" height="16" alt=""> Regulament GO', link: '/informatii/regulamente/regulament-go' },
              { text: '<img src="/icons/arena.svg" class="nav-icon" width="16" height="16" alt=""> Regulament ARENA', link: '/informatii/regulamente/regulament-arena' },
              { text: '<img src="/icons/staff.svg" class="nav-icon" width="16" height="16" alt=""> Regulament STAFF', link: '/informatii/regulamente/regulament-staff' },
              { text: '<img src="/icons/playeri.svg" class="nav-icon" width="16" height="16" alt=""> Regulament Playeri', link: '/informatii/regulamente/regulament-playeri' },
              { text: '<img src="/icons/vipregulament.svg" class="nav-icon" width="16" height="16" alt=""> Regulament VIP', link: '/informatii/regulamente/regulament-vip' }
            ]
          }
        ]
      },
      
      // SECȚIUNEA CURRENCY
      {
        text: '<img src="/icons/currency.svg" class="nav-icon" width="16" height="16" alt=""> Currency',
        collapsed: false,
        items: [
          { text: '<img src="/icons/firecoin.svg" class="nav-icon" width="16" height="16" alt=""> Fire Coins', link: '/currency/fire-coins' },
          { text: '<img src="/icons/credits.svg" class="nav-icon" width="16" height="16" alt=""> Credits', link: '/currency/credits' },
        ]
      },
      
      // SECȚIUNEA SYSTEMS
      {
        text: '<img src="/icons/sisteme.svg" class="nav-icon" width="16" height="16" alt=""> Systems',
        collapsed: false,
        items: [
          // SUBSECȚIUNEA SKINS
          { 
            text: '<img src="/icons/skins.svg" class="nav-icon" width="16" height="16" alt=""> Skins',
            collapsed: true,
            items: [
              { text: '<img src="/icons/cases.svg" class="nav-icon" width="16" height="16" alt=""> Cases', link: '/systems/skins/cases' },
              { text: '<img src="/icons/gloves.svg" class="nav-icon" width="16" height="16" alt=""> Gloves', link: '/systems/skins/gloves' },
              { text: '<img src="/icons/agents.svg" class="nav-icon" width="16" height="16" alt=""> Agents', link: '/systems/skins/agents' },
              { text: '<img src="/icons/knives.svg" class="nav-icon" width="16" height="16" alt=""> Knife Skins', link: '/systems/skins/knives' },
              { text: '<img src="/icons/stickers.svg" class="nav-icon" width="16" height="16" alt=""> Stickers', link: '/systems/skins/stickers' },
            ]
          },
          
          // SUBSECȚIUNEA GAMBLING
          { 
            text: '<img src="/icons/gambling.svg" class="nav-icon" width="16" height="16" alt=""> Gambling',
            collapsed: true,
            items: [
              { text: '<img src="/icons/roulette.svg" class="nav-icon" width="16" height="16" alt=""> Roulette', link: '/systems/gambling/roulette' },
              { text: '<img src="/icons/bet-teams.svg" class="nav-icon" width="16" height="16" alt=""> Bet Teams', link: '/systems/gambling/bet-teams' },
              { text: '<img src="/icons/blackjack.svg" class="nav-icon" width="16" height="16" alt=""> Blackjack', link: '/systems/gambling/blackjack' },
            ]
          },
          
          // SUBSECȚIUNEA IN-GAME SHOP
          { 
            text: '<img src="/icons/shop.svg" class="nav-icon" width="16" height="16" alt=""> In-Game Shop (Credite)',
            collapsed: true,
            items: [
              { text: '<img src="/icons/trails.svg" class="nav-icon" width="16" height="16" alt=""> Trail-uri', link: '/systems/shop/trails' },
              { text: '<img src="/icons/effects.svg" class="nav-icon" width="16" height="16" alt=""> Effecte vizuale', link: '/systems/shop/effects' },
              { text: '<img src="/icons/pins.svg" class="nav-icon" width="16" height="16" alt=""> Wildfire Pins & Badges', link: '/systems/shop/pins' },
              { text: '<img src="/icons/chat.svg" class="nav-icon" width="16" height="16" alt=""> Chat & Tag-uri', link: '/systems/shop/chat-tags' },
              { text: '<img src="/icons/sprays.svg" class="nav-icon" width="16" height="16" alt=""> Spray-uri', link: '/systems/shop/sprays' },
            ]
          },
          
          // SUBSECȚIUNEA OTHER SYSTEMS
          { 
            text: '<img src="/icons/other.svg" class="nav-icon" width="16" height="16" alt=""> Other Systems',
            collapsed: true,
            items: [
              { text: '<img src="/icons/custom-sky.svg" class="nav-icon" width="16" height="16" alt=""> Custom Sky', link: '/systems/other/custom-sky' },
              { text: '<img src="/icons/hit-effect.svg" class="nav-icon" width="16" height="16" alt=""> Hit Effect', link: '/systems/other/hit-effect' },
              { text: '<img src="/icons/music.svg" class="nav-icon" width="16" height="16" alt=""> Music Kits', link: '/systems/other/music-kits' },
              { text: '<img src="/icons/gold-member.svg" class="nav-icon" width="16" height="16" alt=""> Gold Member', link: '/systems/other/gold-member' },
              { text: '<img src="/icons/map-chooser.svg" class="nav-icon" width="16" height="16" alt=""> Map Chooser / RTV', link: '/systems/other/map-chooser' },
              { text: '<img src="/icons/rank-phases.svg" class="nav-icon" width="16" height="16" alt=""> Rank Phases (Grind)', link: '/systems/other/rank-phases' },
              { text: '<img src="/icons/afk.svg" class="nav-icon" width="16" height="16" alt=""> AFK Manager', link: '/systems/other/afk-manager' },
              { text: '<img src="/icons/ad.svg" class="nav-icon" width="16" height="16" alt=""> Advertisement System', link: '/systems/other/advertisement' },
              { text: '<img src="/icons/teambalance.svg" class="nav-icon" width="16" height="16" alt=""> Teambalance', link: '/systems/other/teambalance' },
              { text: '<img src="/icons/chat-filter.svg" class="nav-icon" width="16" height="16" alt=""> Chat Filter', link: '/systems/other/chat-filter' },
              { text: '<img src="/icons/dns.svg" class="nav-icon" width="16" height="16" alt=""> DNS Text HUD', link: '/systems/other/dns-hud' },
              { text: '<img src="/icons/kill-sound.svg" class="nav-icon" width="16" height="16" alt=""> Kill Sound', link: '/systems/other/kill-sound' },
              { text: '<img src="/icons/quests.svg" class="nav-icon" width="16" height="16" alt=""> Quests & Achievements', link: '/systems/other/quests' },
            ]
          },
        ]
      },
      
      // SECȚIUNEA MARKET (DONATIONS)
      {
        text: '<img src="/icons/market.svg" class="nav-icon" width="16" height="16" alt=""> Market (Donations)',
        collapsed: false,
        items: [
          // SUBSECȚIUNEA PREMIUM SHOP
          { 
            text: '<img src="/icons/premium-shop.svg" class="nav-icon" width="16" height="16" alt=""> Premium Shop',
            collapsed: true,
            items: [
              { text: '<img src="/icons/mvp.svg" class="nav-icon" width="16" height="16" alt=""> Custom MVP', link: '/market/premium-shop/mvp' },
              { text: '<img src="/icons/custom-badge.svg" class="nav-icon" width="16" height="16" alt=""> Custom Badge / Pin', link: '/market/premium-shop/custom-badge' },
              { text: '<img src="/icons/entry.svg" class="nav-icon" width="16" height="16" alt=""> Entry Sounds', link: '/market/premium-shop/entrysounds' },
              { text: '<img src="/icons/sank.svg" class="nav-icon" width="16" height="16" alt=""> Sank Sounds', link: '/market/premium-shop/sanks' },
            ]
          },
          
          // SUBSECȚIUNEA FIRE COINS PACKS
          { 
            text: '<img src="/icons/firecoin.svg" class="nav-icon" width="16" height="16" alt=""> Fire Coins Packs',
            collapsed: true,
            items: [
              { text: '<img src="/icons/pack.svg" class="nav-icon" width="16" height="16" alt=""> Pachete', link: '/market/firecoins/pachete' },
            ]
          },
          
          // SUBSECȚIUNEA CREDITS PACKS
          { 
            text: '<img src="/icons/credits-title.svg" class="nav-icon" width="16" height="16" alt=""> Credits Packs',
            collapsed: true,
            items: [
              { text: '<img src="/icons/credits.svg" class="nav-icon" width="16" height="16" alt=""> Pachete de Credite', link: '/market/credits/pachete_credite' },
            ]
          },
          
          // SUBSECȚIUNEA VIP TIERS
          { 
            text: '<img src="/icons/vip.svg" class="nav-icon" width="16" height="16" alt=""> VIP Tiers',
            collapsed: true,
            items: [
              { text: '<img src="/icons/vip.svg" class="nav-icon" width="16" height="16" alt=""> VIP 1', link: '/market/vip/1' },
              { text: '<img src="/icons/vip.svg" class="nav-icon" width="16" height="16" alt=""> VIP 2', link: '/market/vip/2' },
              { text: '<img src="/icons/vip.svg" class="nav-icon" width="16" height="16" alt=""> VIP 3', link: '/market/vip/3' },
              { text: '<img src="/icons/vip.svg" class="nav-icon" width="16" height="16" alt=""> VIP 4', link: '/market/vip/4' },
              { text: '<img src="/icons/vip.svg" class="nav-icon" width="16" height="16" alt=""> VIP 5', link: '/market/vip/5' },
            ]
          },
          
          // METODE DE PLATĂ
          {
            text: '<img src="/icons/payment.svg" class="nav-icon" width="16" height="16" alt=""> Metode de plată',
            link: '/market/payment-methods'
          },
        ]
      }
    ],

    editLink: {
      pattern: 'https://github.com/solwolfs2-dot/wiki-wildfire-inc/edit/main/docs/:path',
      text: '✏️ Editează această pagină pe GitHub'
    },

    // SOCIAL LINKS - SVG INLINE
    socialLinks: [
      { 
        icon: { 
          svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.33-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.03.02.03.08-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/></svg>' 
        }, 
        link: 'https://discord.gg/wildfire',
        ariaLabel: 'Discord'
      },
      { 
        icon: { 
          svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.89 1.52 2.34 1.08 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.94c0-1.09.39-1.98 1.03-2.68c-.1-.25-.45-1.28.1-2.66c0 0 .84-.27 2.75 1.02c.8-.22 1.65-.33 2.5-.33c.85 0 1.7.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.38.2 2.41.1 2.66c.64.7 1.03 1.59 1.03 2.68c0 3.84-2.34 4.68-4.57 4.93c.36.31.68.92.68 1.85v2.74c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>' 
        }, 
        link: 'https://steamcommunity.com/groups/wildfire',
        ariaLabel: 'Steam'
      },
      { 
        icon: { 
          svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74a2.89 2.89 0 0 1 2.31-4.64c.23 0 .46.02.67.06v-3.5a7.93 7.93 0 0 0-1-.06a7.44 7.44 0 0 0-7.44 7.44a7.41 7.41 0 0 0 2.68 5.73a7.35 7.35 0 0 0 4.9 1.78a7.44 7.44 0 0 0 7.44-7.44V8.48a8.34 8.34 0 0 0 4.87 1.56V6.7c-.26 0-.51-.01-.76-.01z"/></svg>' 
        }, 
        link: 'https://www.tiktok.com/@wildfire.ro',
        ariaLabel: 'TikTok'
      }
    ],

    // ✅ SEARCH ACTIVAT
    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: 'Pe această pagină'
    },

    // PENTRU A AFIȘA TOATE CATEGORIILE
    sidebarMenuLabel: 'Meniu',
    returnToTopLabel: 'Înapoi sus',
    darkModeSwitchLabel: 'Mod întunecat',
    lightModeSwitchTitle: 'Comută la modul luminos',
    darkModeSwitchTitle: 'Comută la modul întunecat'
  },

  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true
    }
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue']
          }
        }
      },
      target: 'es2018',
      minify: 'terser',
      cssMinify: true,
      sourcemap: false
    },
    server: {
      fs: {
        strict: false
      }
    },
    ssr: {
      noExternal: ['vue']
    }
  }
})
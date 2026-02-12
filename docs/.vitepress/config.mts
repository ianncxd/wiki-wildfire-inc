import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Wildfire.ro Wiki",
  description: "Documentația platformei Wildfire - informații, sisteme, resurse și comunitate",
  
  lang: 'ro-RO',
  cleanUrls: true,
  
  head: [
    ['link', { rel: 'icon', href: 'https://wildfire.ro/public/images/logo-sv22.png' }],
    ['meta', { name: 'theme-color', content: '#ff4500' }]
  ],

  lastUpdated: true,

  themeConfig: {
    logo: 'https://wildfire.ro/public/images/logo-sv22.png',
    
    siteTitle: 'Wildfire.ro Wiki',
    
    nav: [
      { text: '🏠 Acasă', link: '/' },
    ],

    // SIDEBAR DOAR CU 3 SECȚIUNI: INFORMAȚII, SISTEME, SHOP
    sidebar: [
      {
        text: '📋 Informații',
        collapsed: false,
        items: [
          { text: '🏠 Despre Wildfire', link: '/informatii/about' },
          { text: '❓ Întrebări frecvente', link: '/informatii/faq' },
          { text: '⚖️ Regulament', link: '/informatii/regulament' },
        ]
      },
      {
        text: '⚙️ Sisteme',
        collapsed: false,
        items: [
          { text: '👑 VIP System', link: '/sisteme/vip' },
          { text: '🎨 Skin-uri', link: '/sisteme/skins' },
          { text: '🔨 Crafting', link: '/sisteme/crafting' },
          { text: '🏆 Leaderboard', link: '/sisteme/leaderboard' },
          { text: '📢 Raportări', link: '/sisteme/report' },
        ]
      },
      {
        text: '🛒 Shop',
        collapsed: false,
        items: [
          { text: '👑 VIP', link: '/shop/vips' },
          { text: '👑 MVP Premium', link: '/shop/mvp' },
          { text: '🔑 SankSounds', link: '/shop/sanks' },
          { text: '🎫 EntrySounds', link: '/shop/entrysounds' },
          { text: '💳 Metode de plată', link: '/shop/payment' },
        ]
      }
    ],

  // EDIT LINK - GitHub
    editLink: {
      pattern: 'https://github.com/solwolfs2-dot/wiki-wildfire-inc/edit/main/docs/:path',
      text: '✏️ Editează această pagină pe GitHub'
    },

    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/wildfire' },
      { icon: 'github', link: 'https://github.com/wildfire-ro' }
    ],

    footer: {
      message: 'wildfire.ro - Toate drepturile rezervate',
      copyright: 'mulțumim comunității pentru sprijinul continuu'
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: 'Pe această pagină'
    }
  },

  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true
    }
  }
})
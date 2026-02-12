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
      { text: '<img src="/icons/acasa.svg" class="nav-icon"> Acasă', link: '/' },
      { text: '<img src="/icons/regulament.svg" class="nav-icon"> Regulament', link: '/informatii/regulamente/regulament-playeri' },
      { text: '<img src="/icons/wildfire.png" class="nav-icon"> About', link: '/informatii/about' },
      { text: '<img src="/icons/faq.svg" class="nav-icon"> FAQ', link: '/informatii/faq' },
    ],

    // SIDEBAR DOAR CU 3 SECȚIUNI: INFORMAȚII, SISTEME, SHOP
    sidebar: [
      {
    text: '<img src="/icons/wildfire.png" class="nav-icon"> Informații',
    collapsed: false,
    items: [
    { 
      text: '<img src="/icons/despre.png" class="nav-icon"> Despre Wildfire', 
      link: '/informatii/about' 
    },
    { text: '<img src="/icons/faq.svg" class="nav-icon"> Întrebări frecvente', link: '/informatii/faq' },
    { 
      text: '<img src="/icons/regulament.svg" class="nav-icon"> Regulament',
      collapsed: true,
      items: [
        { text: '<img src="/icons/awp.svg" class="nav-icon"> Regulament AWP', link: '/informatii/regulamente/regulament-awp' },
        { text: '<img src="/icons/go.svg" class="nav-icon"> Regulament GO', link: '/informatii/regulamente/regulament-go' },
        { text: '<img src="/icons/arena.svg" class="nav-icon"> Regulament ARENA', link: '/informatii/regulamente/regulament-arena' },
        { text: '<img src="/icons/staff.svg" class="nav-icon"> Regulament STAFF', link: '/informatii/regulamente/regulament-staff' },
        { text: '<img src="/icons/playeri.svg" class="nav-icon"> Regulament Playeri', link: '/informatii/regulamente/regulament-playeri' },
        { text: '<img src="/icons/vipregulament.svg" class="nav-icon"> Regulament VIP', link: '/informatii/regulamente/regulament-vip' }
      ]
    }
  ]
      },
      {
        text: '<img src="/icons/sisteme.svg" class="nav-icon"> Sisteme',
        collapsed: false,
        items: [
          { text: '<img src="/icons/vip.svg" class="nav-icon"> VIP System', link: '/sisteme/vip' },
          { text: '<img src="/icons/skins.svg" class="nav-icon"> Skin-uri', link: '/sisteme/skins' },
          { text: '<img src="/icons/crafting.svg" class="nav-icon"> Crafting', link: '/sisteme/crafting' },
          { text: '<img src="/icons/leaderboard.svg" class="nav-icon"> Leaderboard', link: '/sisteme/leaderboard' },
          { text: '<img src="/icons/report.svg" class="nav-icon"> Raportări', link: '/sisteme/report' },
        ]
      },
      {
        text: '<img src="/icons/shop.svg" class="nav-icon"> Shop',
        collapsed: false,
        items: [
          { text: '<img src="/icons/vips.svg" class="nav-icon"> VIP', link: '/shop/vips' },
          { text: '<img src="/icons/mvp.svg" class="nav-icon"> MVP Premium', link: '/shop/mvp' },
          { text: '<img src="/icons/sank.svg" class="nav-icon"> SankSounds', link: '/shop/sanks' },
          { text: '<img src="/icons/entry.svg" class="nav-icon"> EntrySounds', link: '/shop/entrysounds' },
          { text: '<img src="/icons/payment.svg" class="nav-icon"> Metode de plată', link: '/shop/payment' },
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
      { icon: 'steam', link: 'https://steamcommunity.com/groups/wildfire' },
      { icon: 'tiktok', link: 'https://www.tiktok.com/@wildfire.ro' }
    ],

    // footer: {
    //   message: 'wildfire.ro - Toate drepturile rezervate',
    //   copyright: 'mulțumim comunității pentru sprijinul continuu'
    // },

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
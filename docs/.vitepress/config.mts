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
      { text: '<img src="/icons/wildfire.png" class="nav-icon"> Informații', link: '/informatii/about' },
      { text: '<img src="/icons/faq.svg" class="nav-icon"> FAQ', link: '/informatii/faq' },
    ],

    // SIDEBAR CU STRUCTURA NOUĂ - MARKET în loc de Donations
    sidebar: [
      {
        text: '<img src="/icons/wildfire.png" class="nav-icon"> Informații',
        collapsed: false,
        items: [
          { text: '<img src="/icons/despre.png" class="nav-icon"> Despre Wildfire', link: '/informatii/about' },
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
        text: '<img src="/icons/currency.svg" class="nav-icon"> Currency',
        collapsed: false,
        items: [
          { text: '<img src="/icons/firecoin.svg" class="nav-icon"> Fire Coins', link: '/currency/fire-coins' },
          { text: '<img src="/icons/credits.svg" class="nav-icon"> Credits', link: '/currency/credits' },
        ]
      },
      
      {
        text: '<img src="/icons/sisteme.svg" class="nav-icon"> Systems',
        collapsed: false,
        items: [
          { 
            text: '<img src="/icons/skins.svg" class="nav-icon"> Skins',
            collapsed: true,
            items: [
              { text: '<img src="/icons/cases.svg" class="nav-icon"> Cases', link: '/systems/skins/cases' },
              { text: '<img src="/icons/gloves.svg" class="nav-icon"> Gloves', link: '/systems/skins/gloves' },
              { text: '<img src="/icons/agents.svg" class="nav-icon"> Agents', link: '/systems/skins/agents' },
              { text: '<img src="/icons/knives.svg" class="nav-icon"> Knife Skins', link: '/systems/skins/knives' },
              { text: '<img src="/icons/stickers.svg" class="nav-icon"> Stickers', link: '/systems/skins/stickers' },
            ]
          },
          { 
            text: '<img src="/icons/gambling.svg" class="nav-icon"> Gambling',
            collapsed: true,
            items: [
              { text: '<img src="/icons/roulette.svg" class="nav-icon"> Roulette', link: '/systems/gambling/roulette' },
              { text: '<img src="/icons/bet-teams.svg" class="nav-icon"> Bet Teams', link: '/systems/gambling/bet-teams' },
              { text: '<img src="/icons/blackjack.svg" class="nav-icon"> Blackjack', link: '/systems/gambling/blackjack' },
            ]
          },
          { 
            text: '<img src="/icons/shop.svg" class="nav-icon"> In-Game Shop (Credite)',
            collapsed: true,
            items: [
              { text: '<img src="/icons/trails.svg" class="nav-icon"> Trail-uri', link: '/systems/shop/trails' },
              { text: '<img src="/icons/effects.svg" class="nav-icon"> Effecte vizuale', link: '/systems/shop/effects' },
              { text: '<img src="/icons/pins.svg" class="nav-icon"> Wildfire Pins & Badges', link: '/systems/shop/pins' },
              { text: '<img src="/icons/chat.svg" class="nav-icon"> Chat & Tag-uri', link: '/systems/shop/chat-tags' },
              { text: '<img src="/icons/sprays.svg" class="nav-icon"> Spray-uri', link: '/systems/shop/sprays' },
            ]
          },
          { 
            text: '<img src="/icons/other.svg" class="nav-icon"> Other Systems',
            collapsed: true,
            items: [
              { text: '<img src="/icons/custom-sky.svg" class="nav-icon"> Custom Sky', link: '/systems/other/custom-sky' },
              { text: '<img src="/icons/hit-effect.svg" class="nav-icon"> Hit Effect', link: '/systems/other/hit-effect' },
              { text: '<img src="/icons/music.svg" class="nav-icon"> Music Kits', link: '/systems/other/music-kits' },
              { text: '<img src="/icons/gold-member.svg" class="nav-icon"> Gold Member', link: '/systems/other/gold-member' },
              { text: '<img src="/icons/map-chooser.svg" class="nav-icon"> Map Chooser / RTV', link: '/systems/other/map-chooser' },
              { text: '<img src="/icons/rank-phases.svg" class="nav-icon"> Rank Phases (Grind)', link: '/systems/other/rank-phases' },
              { text: '<img src="/icons/afk.svg" class="nav-icon"> AFK Manager', link: '/systems/other/afk-manager' },
              { text: '<img src="/icons/ad.svg" class="nav-icon"> Advertisement System', link: '/systems/other/advertisement' },
              { text: '<img src="/icons/teambalance.svg" class="nav-icon"> Teambalance', link: '/systems/other/teambalance' },
              { text: '<img src="/icons/chat-filter.svg" class="nav-icon"> Chat Filter', link: '/systems/other/chat-filter' },
              { text: '<img src="/icons/dns.svg" class="nav-icon"> DNS Text HUD', link: '/systems/other/dns-hud' },
              { text: '<img src="/icons/kill-sound.svg" class="nav-icon"> Kill Sound', link: '/systems/other/kill-sound' },
              { text: '<img src="/icons/quests.svg" class="nav-icon"> Quests & Achievements', link: '/systems/other/quests' },
            ]
          },
        ]
      },
      
      {
        text: '<img src="/icons/market.svg" class="nav-icon"> Market (Donations)',
        collapsed: false,
        items: [
          { 
            text: '<img src="/icons/premium-shop.svg" class="nav-icon"> Premium Shop',
            collapsed: true,
            items: [
              { text: '<img src="/icons/mvp.svg" class="nav-icon"> Custom MVP', link: '/market/premium-shop/mvp' },
              { text: '<img src="/icons/custom-badge.svg" class="nav-icon"> Custom Badge / Pin', link: '/market/premium-shop/custom-badge' },
              { text: '<img src="/icons/entry.svg" class="nav-icon"> Entry Sounds', link: '/market/premium-shop/entrysounds' },
              { text: '<img src="/icons/sank.svg" class="nav-icon"> Sank Sounds', link: '/market/premium-shop/sanks' },
            ]
          },
          { 
            text: '<img src="/icons/firecoin.svg" class="nav-icon"> Fire Coins Packs',
            collapsed: true,
            items: [
              { text: '<img src="/icons/pack.svg" class="nav-icon"> Pachete', link: '/market/firecoins/pachete' },
            ]
          },
          { 
            text: '<img src="/icons/credits-title.svg" class="nav-icon"> Credits Packs',
            collapsed: true,
            items: [
              { text: '<img src="/icons/credits.svg" class="nav-icon"> Pachete de Credite', link: '/market/credits/pachete_credite' },
            ]
          },
          { 
            text: '<img src="/icons/vip.svg" class="nav-icon"> VIP Tiers',
            collapsed: true,
            items: [
              { text: '<img src="/icons/vip.svg" class="nav-icon"> VIP 1', link: '/market/vip/1' },
              { text: '<img src="/icons/vip.svg" class="nav-icon"> VIP 2', link: '/market/vip/2' },
              { text: '<img src="/icons/vip.svg" class="nav-icon"> VIP 3', link: '/market/vip/3' },
              { text: '<img src="/icons/vip.svg" class="nav-icon"> VIP 4', link: '/market/vip/4' },
              { text: '<img src="/icons/vip.svg" class="nav-icon"> VIP 5', link: '/market/vip/5' },
            ]
          },
          {
            text: '<img src="/icons/payment.svg" class="nav-icon"> Metode de plată',
            link: '/market/payment-methods'
          },
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
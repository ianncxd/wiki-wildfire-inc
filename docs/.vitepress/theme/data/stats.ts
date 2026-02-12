import { ref } from 'vue'
import { useData } from 'vitepress'

export interface WikiStats {
  totalPages: number
  totalCategories: number
  recentUpdates: RecentUpdate[]
}

export interface RecentUpdate {
  title: string
  category: string
  subcategory?: string
  description: string
  date: string
  time: string
  author: string
  authorAvatar?: string
  url: string
  tags: string[]
}

// Funcție care colectează toate paginile și le analizează
export function useWikiStats() {
  const stats = ref<WikiStats>({
    totalPages: 0,
    totalCategories: 0,
    recentUpdates: []
  })

  const fetchStats = async () => {
    try {
      // @ts-ignore - VitePress intern API
      const pages = import.meta.glob('/**/*.md', { eager: true })
      
      const allPages = Object.keys(pages).map(path => {
        const module = pages[path] as any
        const frontmatter = module.frontmatter || {}
        
        // Extrage categoria din frontmatter sau din cale
        let category = frontmatter.category || 'General'
        let subcategory = frontmatter.subcategory || ''
        
        if (path.includes('/informatii/')) category = 'Informații'
        if (path.includes('/sisteme/')) category = 'Sisteme'
        if (path.includes('/shop/')) category = 'Shop'
        if (path.includes('/comunitate/')) category = 'Comunitate'
        
        // Extrage subcategoria din cale
        if (path.includes('/sisteme/premium')) subcategory = 'Premium'
        if (path.includes('/sisteme/skin-uri')) subcategory = 'Skin-uri'
        if (path.includes('/sisteme/anticheat')) subcategory = 'Anti-Cheat'
        
        // Curăță path-ul pentru URL
        const url = path
          .replace('/docs', '')
          .replace('.md', '')
          .replace('/index', '')
        
        return {
          path,
          url,
          title: frontmatter.title || generateTitleFromPath(path),
          description: frontmatter.description || '',
          category,
          subcategory,
          date: frontmatter.date || frontmatter.updated || getFileDate(path),
          time: frontmatter.time || '00:00',
          author: frontmatter.author || 'Echipa Wildfire',
          authorAvatar: frontmatter.authorAvatar || '',
          tags: frontmatter.tags || [],
          frontmatter
        }
      })

      // Filtrează paginile relevante (exclude index.md și paginile ascunse)
      const validPages = allPages.filter(page => 
        !page.path.includes('index.md') && 
        !page.path.includes('/.') &&
        page.title !== 'index'
      )

      // Calculează statistici
      const categories = new Set(validPages.map(p => p.category))
      const subcategories = new Set(validPages.map(p => p.subcategory).filter(Boolean))
      
      // Sortare după dată (cele mai recente primele)
      const sortedUpdates = validPages
        .filter(p => p.date)
        .sort((a, b) => {
          const dateA = new Date(a.date.split('.').reverse().join('-') + 'T' + (a.time || '00:00'))
          const dateB = new Date(b.date.split('.').reverse().join('-') + 'T' + (b.time || '00:00'))
          return dateB.getTime() - dateA.getTime()
        })
        .slice(0, 8) // Ultimele 8 actualizări
        .map(page => ({
          title: page.title,
          category: page.category,
          subcategory: page.subcategory,
          description: page.description || `Pagina a fost actualizată`,
          date: page.date,
          time: page.time,
          author: page.author,
          authorAvatar: page.authorAvatar,
          url: page.url,
          tags: page.tags
        }))

      stats.value = {
        totalPages: validPages.length,
        totalCategories: categories.size + subcategories.size,
        recentUpdates: sortedUpdates
      }

    } catch (error) {
      console.error('Eroare la încărcarea statisticilor:', error)
    }
  }

  return { stats, fetchStats }
}

// Funcție ajutătoare pentru a genera titlu din cale
function generateTitleFromPath(path: string): string {
  const fileName = path.split('/').pop()?.replace('.md', '') || ''
  return fileName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Funcție pentru a obține data fișierului (fallback)
function getFileDate(path: string): string {
  const today = new Date()
  const day = String(today.getDate()).padStart(2, '0')
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = today.getFullYear()
  return `${day}.${month}.${year}`
}
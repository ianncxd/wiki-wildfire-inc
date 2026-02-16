// add-card.js
const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const filePath = path.join(__dirname, 'docs/.vitepress/theme/components/LastUpdates.vue')

// Culori pentru consolă
const consoleColors = {
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`
}

// Culori pentru carduri
const cardColors = {
  blue: { name: 'Albastru', dot: 'dot-blue', tag: 'blue', category: 'INFORMATII' },
  orange: { name: 'Portocaliu', dot: 'dot-orange', tag: 'orange', category: 'SKINS' },
  teal: { name: 'Turcoaz', dot: 'dot-teal', tag: 'teal', category: 'GAMBLING' },
  amber: { name: 'Galben', dot: 'dot-amber', tag: 'amber', category: 'CURRENCY' },
  purple: { name: 'Violet', dot: 'dot-purple', tag: 'purple', category: 'PREMIUM' },
  pink: { name: 'Roz', dot: 'dot-pink', tag: 'pink', category: 'MARKET' },
  red: { name: 'Rosu', dot: 'dot-red', tag: 'red', category: 'ANTI-CHEAT' },
  green: { name: 'Verde', dot: 'dot-green', tag: 'green', category: 'EVENIMENTE' }
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim())
    })
  })
}

// Citește cardurile existente din fișier
function getExistingCards() {
  const content = fs.readFileSync(filePath, 'utf-8')
  const cardsMatch = content.match(/const cards = ref\(\[([\s\S]*?)\]\)/)
  
  if (!cardsMatch) return []
  
  const cardsArray = cardsMatch[1]
  const cards = []
  let currentCard = {}
  let braceCount = 0
  let inCard = false
  
  const lines = cardsArray.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    if (line.includes('{')) {
      inCard = true
      currentCard = {}
      braceCount++
    } else if (line.includes('}')) {
      braceCount--
      if (braceCount === 0 && inCard) {
        cards.push(currentCard)
        inCard = false
      }
    } else if (inCard && line.includes(':')) {
      const [key, ...valueParts] = line.split(':')
      const value = valueParts.join(':').trim().replace(/,/g, '').replace(/'/g, '')
      if (key.trim() === 'active') {
        currentCard.active = value === 'true'
      } else if (key.trim() === 'title') {
        currentCard.title = value
      } else if (key.trim() === 'category') {
        currentCard.category = value
      }
    }
  }
  
  return cards
}

// Afișează starea curentă a cardurilor
function showCardStatus() {
  console.log('\n' + '='.repeat(50))
  console.log(consoleColors.cyan('📊 STARE CARDURI'))
  console.log('='.repeat(50))
  
  const cards = getExistingCards()
  
  for (let i = 0; i < 6; i++) {
    const card = cards[i] || { active: false, title: '', category: '' }
    const status = card.active ? consoleColors.green('✅ ACTIV') : consoleColors.red('❌ INACTIV')
    const title = card.title ? `"${card.title}"` : 'gol'
    console.log(`Card ${i + 1}: ${status} - ${title} ${card.category ? `(${card.category})` : ''}`)
  }
  console.log('='.repeat(50) + '\n')
}

async function main() {
  console.log('\n' + '='.repeat(50))
  console.log(consoleColors.cyan(consoleColors.bold('📝 ADAUGĂ CARD NOU')))
  console.log('='.repeat(50))
  
  // Afișează starea curentă
  showCardStatus()
  
  // Alege cardul
  const cardNum = await askQuestion('📌 Ce card vrei să modifici? (1-6): ')
  
  if (cardNum < 1 || cardNum > 6) {
    console.log(consoleColors.red('❌ Alege un număr între 1 și 6'))
    rl.close()
    return
  }
  
  // Verifică dacă e deja ocupat
  const cards = getExistingCards()
  const existingCard = cards[cardNum - 1]
  
  if (existingCard && existingCard.active) {
    console.log(`\n${consoleColors.yellow(`⚠️  Cardul ${cardNum} este deja ACTIV cu titlul: "${existingCard.title}"`)}`)
    const overwrite = await askQuestion('Vrei să îl suprascrii? (da/nu): ')
    if (overwrite.toLowerCase() !== 'da' && overwrite.toLowerCase() !== 'd') {
      console.log(consoleColors.red('❌ Operațiune anulată'))
      rl.close()
      return
    }
  }
  
  // Alege culoarea
  console.log('\n' + consoleColors.cyan('🎨 CULORI DISPONIBILE:'))
  const colorKeys = Object.keys(cardColors)
  colorKeys.forEach((key, index) => {
    const color = cardColors[key]
    console.log(`${index + 1}. ${color.name} - ${color.category}`)
  })
  
  const colorChoice = await askQuestion('\nAlege culoarea (1-8): ')
  const colorKey = colorKeys[parseInt(colorChoice) - 1]
  
  if (!colorKey) {
    console.log(consoleColors.red('❌ Culoare invalidă'))
    rl.close()
    return
  }
  
  const selectedColor = cardColors[colorKey]
  
  // Completează datele
  console.log('\n' + consoleColors.cyan('📋 COMPLETEAZĂ DATELE CARDULUI:'))
  
  const title = await askQuestion('📌 Titlu: ')
  const category = await askQuestion(`📂 Categorie (Enter pentru "${selectedColor.category}"): `) || selectedColor.category
  const date = await askQuestion('📅 Data (ZZ.LL.AAAA): ')
  const tag1 = await askQuestion('🏷️ Tag 1: ')
  const tag2 = await askQuestion('🏷️ Tag 2: ')
  const link = await askQuestion('🔗 Link: ')
  const buttonText = await askQuestion('🔘 Text buton: ')
  const username = await askQuestion('👤 Username GitHub: ')
  
  // Confirmă
  console.log('\n' + '='.repeat(40))
  console.log(consoleColors.green('📋 REZUMAT CARD:'))
  console.log('='.repeat(40))
  console.log(`Card: ${cardNum}`)
  console.log(`Categorie: ${category} (${selectedColor.name})`)
  console.log(`Titlu: ${title}`)
  console.log(`Data: ${date}`)
  console.log(`Tag-uri: ${tag1}, ${tag2}`)
  console.log(`Link: ${link}`)
  console.log(`Buton: ${buttonText}`)
  console.log(`Username: ${username}`)
  console.log('='.repeat(40))
  
  const confirm = await askQuestion('\n✅ Adaugi cardul? (da/nu): ')
  
  if (confirm.toLowerCase() !== 'da' && confirm.toLowerCase() !== 'd') {
    console.log(consoleColors.red('❌ Operațiune anulată'))
    rl.close()
    return
  }
  
  // Citește fișierul și modifică array-ul
  let content = fs.readFileSync(filePath, 'utf-8')
  
  const newCard = `  {
    active: true,
    dotClass: '${selectedColor.dot}',
    category: '${category}',
    title: '${title}',
    date: '${date}',
    username: '${username}',
    avatarUrl: 'https://github.com/${username}.png',
    profileUrl: 'https://github.com/${username}',
    tagColor: '${selectedColor.tag}',
    tag1: '${tag1}',
    tag2: '${tag2}',
    link: '${link}',
    buttonText: '${buttonText}'
  }`
  
  // Găsește array-ul și înlocuiește cardul specific
  const cardsMatch = content.match(/const cards = ref\(\[([\s\S]*?)\]\)/)
  
  if (!cardsMatch) {
    console.log(consoleColors.red('❌ Nu am găsit array-ul cards'))
    rl.close()
    return
  }
  
  const cardsArray = cardsMatch[1]
  const cardLines = cardsArray.split('\n')
  
  let cardStart = -1
  let cardEnd = -1
  let braceCount = 0
  let currentCard = 0
  
  for (let i = 0; i < cardLines.length; i++) {
    const line = cardLines[i]
    
    if (line.includes('{')) {
      braceCount++
      if (braceCount === 1 && currentCard === parseInt(cardNum) - 1) {
        cardStart = i
      }
    }
    
    if (line.includes('}')) {
      braceCount--
      if (braceCount === 0 && currentCard === parseInt(cardNum) - 1) {
        cardEnd = i
        break
      }
      if (braceCount === 0) {
        currentCard++
      }
    }
  }
  
  if (cardStart === -1 || cardEnd === -1) {
    console.log(consoleColors.red('❌ Nu am găsit cardul specificat'))
    rl.close()
    return
  }
  
  const beforeCard = cardLines.slice(0, cardStart).join('\n')
  const afterCard = cardLines.slice(cardEnd + 1).join('\n')
  const newCardsArray = beforeCard + '\n' + newCard + ',\n' + afterCard
  
  const newContent = content.replace(cardsMatch[1], newCardsArray)
  
  // Actualizează numărul de carduri active în badge
  const activeCount = (newContent.match(/active: true/g) || []).length
  const finalContent = newContent.replace(
    /<span class="updates-badge">.*?<\/span>/,
    `<span class="updates-badge">{{ activeCards }} noi</span>`
  )
  
  fs.writeFileSync(filePath, finalContent, 'utf-8')
  
  console.log(`\n${consoleColors.green(`✅ Card ${cardNum} adăugat cu succes!`)}`)
  console.log(`${consoleColors.cyan(`📊 Total carduri active: ${activeCount}`)}`)
  
  // Afișează noua stare
  showCardStatus()
  
  rl.close()
}

main().catch(console.error)
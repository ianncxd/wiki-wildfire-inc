// add-card.js
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const { exec } = require('child_process')
const http = require('http')

const filePath = path.join(__dirname, 'docs/.vitepress/theme/components/LastUpdates.vue')
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

// ===== CULORI CONSOLĂ =====
const c = {
  g: t => `\x1b[32m${t}\x1b[0m`,
  r: t => `\x1b[31m${t}\x1b[0m`,
  y: t => `\x1b[33m${t}\x1b[0m`,
  c: t => `\x1b[36m${t}\x1b[0m`,
  o: t => `\x1b[38;5;208m${t}\x1b[0m`,
  gold: t => `\x1b[38;5;220m${t}\x1b[0m`,
  bold: t => `\x1b[1m${t}\x1b[0m`
}

// ===== CULORI CARD =====
const cardColors = {
  blue: { name: 'Albastru', dot: 'dot-blue', tag: 'blue', category: 'INFORMATII', hex: '#3b82f6', emoji: '🔵' },
  orange: { name: 'Portocaliu', dot: 'dot-orange', tag: 'orange', category: 'SKINS', hex: '#f97316', emoji: '🟠' },
  teal: { name: 'Turcoaz', dot: 'dot-teal', tag: 'teal', category: 'GAMBLING', hex: '#14b8a6', emoji: '🟢' },
  amber: { name: 'Galben', dot: 'dot-amber', tag: 'amber', category: 'CURRENCY', hex: '#f59e0b', emoji: '🟡' },
  purple: { name: 'Violet', dot: 'dot-purple', tag: 'purple', category: 'PREMIUM', hex: '#8b5cf6', emoji: '🟣' },
  pink: { name: 'Roz', dot: 'dot-pink', tag: 'pink', category: 'MARKET', hex: '#ec4899', emoji: '🌸' },
  red: { name: 'Roșu', dot: 'dot-red', tag: 'red', category: 'ANTI-CHEAT', hex: '#ef4444', emoji: '🔴' },
  green: { name: 'Verde', dot: 'dot-green', tag: 'green', category: 'EVENIMENTE', hex: '#10b981', emoji: '🟢' }
}

// ===== FUNCȚII UTILITARE =====
function ask(q) {
  return new Promise(r => rl.question(q, a => r(a.trim())))
}

// Citește toate cardurile
function getAllCards() {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    
    const extractCard = (cardName) => {
      const regex = new RegExp(`const ${cardName} = ref\\(\\{([\\s\\S]*?)\\}\\)`)
      const match = content.match(regex)
      if (!match) return { active: false }
      
      const cardStr = match[1]
      const card = {}
      
      const activeMatch = cardStr.match(/active:\s*(true|false)/)
      if (activeMatch) card.active = activeMatch[1] === 'true'
      
      const dotClassMatch = cardStr.match(/dotClass:\s*'([^']*)'/)
      if (dotClassMatch) card.dotClass = dotClassMatch[1]
      
      const categoryMatch = cardStr.match(/category:\s*'([^']*)'/)
      if (categoryMatch) card.category = categoryMatch[1]
      
      const titleMatch = cardStr.match(/title:\s*'([^']*)'/)
      if (titleMatch) card.title = titleMatch[1]
      
      const dateMatch = cardStr.match(/date:\s*'([^']*)'/)
      if (dateMatch) card.date = dateMatch[1]
      
      const usernameMatch = cardStr.match(/username:\s*'([^']*)'/)
      if (usernameMatch) card.username = usernameMatch[1]
      
      const tagColorMatch = cardStr.match(/tagColor:\s*'([^']*)'/)
      if (tagColorMatch) card.tagColor = tagColorMatch[1]
      
      const tag1Match = cardStr.match(/tag1:\s*'([^']*)'/)
      if (tag1Match) card.tag1 = tag1Match[1]
      
      const tag2Match = cardStr.match(/tag2:\s*'([^']*)'/)
      if (tag2Match) card.tag2 = tag2Match[1]
      
      const linkMatch = cardStr.match(/link:\s*'([^']*)'/)
      if (linkMatch) card.link = linkMatch[1]
      
      const buttonTextMatch = cardStr.match(/buttonText:\s*'([^']*)'/)
      if (buttonTextMatch) card.buttonText = buttonTextMatch[1]
      
      return card
    }
    
    return {
      card1: extractCard('card1'),
      card2: extractCard('card2'),
      card3: extractCard('card3'),
      card4: extractCard('card4'),
      card5: extractCard('card5'),
      card6: extractCard('card6')
    }
  } catch (error) {
    return {
      card1: { active: false },
      card2: { active: false },
      card3: { active: false },
      card4: { active: false },
      card5: { active: false },
      card6: { active: false }
    }
  }
}

// Salvează un card
function saveCard(cardNumber, cardData) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8')
    
    const cardName = `card${cardNumber}`
    
    const newCard = `const ${cardName} = ref({
  active: ${cardData.active},
  dotClass: '${cardData.dotClass}',
  category: '${cardData.category}',
  title: '${cardData.title}',
  date: '${cardData.date}',
  username: '${cardData.username}',
  avatarUrl: 'https://github.com/${cardData.username}.png',
  profileUrl: 'https://github.com/${cardData.username}',
  tagColor: '${cardData.tagColor}',
  tag1: '${cardData.tag1}',
  tag2: '${cardData.tag2}',
  link: '${cardData.link}',
  buttonText: '${cardData.buttonText}'
})`
    
    const cardRegex = new RegExp(`const ${cardName} = ref\\(\\{[\\s\\S]*?\\}\\)`, 'g')
    const newContent = content.replace(cardRegex, newCard)
    
    const cards = getAllCards()
    let activeCount = 0
    if (cardNumber === 1) activeCount = (cardData.active ? 1 : 0) + (cards.card2.active ? 1 : 0) + (cards.card3.active ? 1 : 0) + (cards.card4.active ? 1 : 0) + (cards.card5.active ? 1 : 0) + (cards.card6.active ? 1 : 0)
    else if (cardNumber === 2) activeCount = (cards.card1.active ? 1 : 0) + (cardData.active ? 1 : 0) + (cards.card3.active ? 1 : 0) + (cards.card4.active ? 1 : 0) + (cards.card5.active ? 1 : 0) + (cards.card6.active ? 1 : 0)
    else if (cardNumber === 3) activeCount = (cards.card1.active ? 1 : 0) + (cards.card2.active ? 1 : 0) + (cardData.active ? 1 : 0) + (cards.card4.active ? 1 : 0) + (cards.card5.active ? 1 : 0) + (cards.card6.active ? 1 : 0)
    else if (cardNumber === 4) activeCount = (cards.card1.active ? 1 : 0) + (cards.card2.active ? 1 : 0) + (cards.card3.active ? 1 : 0) + (cardData.active ? 1 : 0) + (cards.card5.active ? 1 : 0) + (cards.card6.active ? 1 : 0)
    else if (cardNumber === 5) activeCount = (cards.card1.active ? 1 : 0) + (cards.card2.active ? 1 : 0) + (cards.card3.active ? 1 : 0) + (cards.card4.active ? 1 : 0) + (cardData.active ? 1 : 0) + (cards.card6.active ? 1 : 0)
    else if (cardNumber === 6) activeCount = (cards.card1.active ? 1 : 0) + (cards.card2.active ? 1 : 0) + (cards.card3.active ? 1 : 0) + (cards.card4.active ? 1 : 0) + (cards.card5.active ? 1 : 0) + (cardData.active ? 1 : 0)
    
    const finalContent = newContent.replace(
      /<span class="updates-badge">.*?<\/span>/,
      `<span class="updates-badge">${activeCount} noi</span>`
    )
    
    fs.writeFileSync(filePath, finalContent, 'utf-8')
    return true
  } catch (error) {
    return false
  }
}

// Copy card
function copyCard(sourceSlot, targetSlots) {
  try {
    const cards = getAllCards()
    const sourceCard = cards[`card${sourceSlot}`]
    if (!sourceCard) return false
    
    for (const target of targetSlots) {
      if (target >= 1 && target <= 6) {
        saveCard(target, {
          active: sourceCard.active,
          dotClass: sourceCard.dotClass,
          category: sourceCard.category,
          title: sourceCard.title,
          date: sourceCard.date,
          username: sourceCard.username,
          tagColor: sourceCard.tagColor,
          tag1: sourceCard.tag1,
          tag2: sourceCard.tag2,
          link: sourceCard.link,
          buttonText: sourceCard.buttonText
        })
      }
    }
    return true
  } catch {
    return false
  }
}

// ===== MODUL TERMINAL CU PREVIEW =====
async function terminalMode() {
  console.clear()
  console.log(c.gold('\n╔════════════════════════════════════════════════════════╗'))
  console.log(c.gold('║') + '            ' + c.o('🔥 TERMINAL MODE ULTIMATE') + '            ' + c.gold('║'))
  console.log(c.gold('╚════════════════════════════════════════════════════════╝\n'))
  
  const cards = getAllCards()
  
  // Afișare stare carduri
  console.log(c.c('┌─────┬──────────┬─────────────────────────────────────────────┐'))
  console.log(c.c('│ Slot│ Status   │ Titlu                                       │'))
  console.log(c.c('├─────┼──────────┼─────────────────────────────────────────────┤'))
  
  for (let i = 1; i <= 6; i++) {
    const card = cards[`card${i}`] || { active: false, title: '' }
    const status = card.active ? c.g('✅ ACTIV') : c.r('❌ INACTIV')
    const title = (card.title || 'gol').padEnd(43).slice(0, 43)
    console.log(c.c(`│  ${i}   │ ${status} │ ${title} │`))
  }
  console.log(c.c('└─────┴──────────┴─────────────────────────────────────────────┘\n'))
  
  // Meniu
  console.log(c.y('1. Editează un slot'))
  console.log(c.y('2. Copiază card între sloturi'))
  console.log(c.y('0. Înapoi'))
  
  const choice = await ask(c.g('\n🔸 Alege: '))
  
  if (choice === '1') {
    await editSlot()
  } else if (choice === '2') {
    await copySlot()
  } else {
    return
  }
}

async function editSlot() {
  const slot = await ask(c.g('📌 Slot de editat (1-6): '))
  if (slot < 1 || slot > 6) {
    console.log(c.r('❌ Slot invalid!'))
    return
  }
  
  const cards = getAllCards()
  const currentCard = cards[`card${slot}`] || {}
  
  console.log(c.y('\n🎨 Culori:'))
  const colorKeys = Object.keys(cardColors)
  colorKeys.forEach((k, i) => {
    const col = cardColors[k]
    console.log(`   ${i+1}. ${col.emoji} ${col.name} - ${col.category}`)
  })
  
  const colorChoice = await ask(c.g('\n🔸 Alege culoarea (1-8): '))
  const colorKey = colorKeys[parseInt(colorChoice) - 1]
  if (!colorKey) {
    console.log(c.r('❌ Culoare invalidă!'))
    return
  }
  const selColor = cardColors[colorKey]
  
  console.log(c.y('\n📝 Date card:'))
  
  const active = await ask(c.g('Activ? (da/nu): '))
  const title = await ask(c.g('Titlu: '))
  const category = await ask(c.g('Categorie') + c.c(` (Enter = ${selColor.category}): `)) || selColor.category
  const date = await ask(c.g('Data (ZZ.LL.AAAA): '))
  const tag1 = await ask(c.g('Tag 1: '))
  const tag2 = await ask(c.g('Tag 2: '))
  const link = await ask(c.g('Link: '))
  const btn = await ask(c.g('Text buton: '))
  const user = await ask(c.g('Username: '))
  
  // Preview
  console.log(c.c('\n╔════════════════════════════════════════════════════════╗'))
  console.log(c.c('║') + '                    ' + c.gold('PREVIEW CARD') + '                    ' + c.c('║'))
  console.log(c.c('╠════════════════════════════════════════════════════════╣'))
  console.log(c.c('║') + ` Slot: ${slot}`.padEnd(58) + c.c('║'))
  console.log(c.c('║') + ` Status: ${active === 'da' ? 'ACTIV' : 'INACTIV'}`.padEnd(58) + c.c('║'))
  console.log(c.c('║') + ` Categorie: ${category} (${selColor.name})`.padEnd(58) + c.c('║'))
  console.log(c.c('║') + ` Titlu: ${title}`.padEnd(58) + c.c('║'))
  console.log(c.c('║') + ` Data: ${date}`.padEnd(58) + c.c('║'))
  console.log(c.c('║') + ` Username: ${user}`.padEnd(58) + c.c('║'))
  console.log(c.c('║') + ` Tag-uri: ${tag1}, ${tag2}`.padEnd(58) + c.c('║'))
  console.log(c.c('║') + ` Link: ${link}`.padEnd(58) + c.c('║'))
  console.log(c.c('║') + ` Buton: ${btn}`.padEnd(58) + c.c('║'))
  console.log(c.c('╚════════════════════════════════════════════════════════╝'))
  
  const confirm = await ask(c.g('\n✅ Salvezi? (da/nu): '))
  
  if (confirm.toLowerCase() === 'da' || confirm.toLowerCase() === 'd') {
    const success = saveCard(parseInt(slot), {
      active: active === 'da',
      dotClass: selColor.dot,
      category,
      title,
      date,
      username: user,
      tagColor: selColor.tag,
      tag1,
      tag2,
      link,
      buttonText: btn
    })
    
    if (success) {
      console.log(c.g(`\n✅ Slot ${slot} salvat cu succes!`))
    } else {
      console.log(c.r('\n❌ Eroare la salvare!'))
    }
  }
}

async function copySlot() {
  const source = await ask(c.g('📌 Slot sursă (1-6): '))
  if (source < 1 || source > 6) {
    console.log(c.r('❌ Slot invalid!'))
    return
  }
  
  const targets = await ask(c.g('📌 Sloturi destinație (ex: 2,3,4 sau 2-4): '))
  const targetSlots = parseSlots(targets)
  
  if (targetSlots.length === 0) {
    console.log(c.r('❌ Niciun slot valid!'))
    return
  }
  
  console.log(c.y(`\n📋 Copiez din slot ${source} în sloturile ${targetSlots.join(', ')}`))
  const confirm = await ask(c.g('✅ Confirmi? (da/nu): '))
  
  if (confirm.toLowerCase() === 'da' || confirm.toLowerCase() === 'd') {
    const success = copyCard(parseInt(source), targetSlots)
    if (success) {
      console.log(c.g(`\n✅ Copiere realizată cu succes!`))
    } else {
      console.log(c.r('\n❌ Eroare la copiere!'))
    }
  }
}

function parseSlots(input) {
  const slots = new Set()
  const parts = input.split(',')
  
  for (const part of parts) {
    const trimmed = part.trim()
    if (trimmed.includes('-')) {
      const [start, end] = trimmed.split('-').map(n => parseInt(n))
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
          if (i >= 1 && i <= 6) slots.add(i)
        }
      }
    } else {
      const num = parseInt(trimmed)
      if (!isNaN(num) && num >= 1 && num <= 6) slots.add(num)
    }
  }
  
  return Array.from(slots).sort((a, b) => a - b)
}

// ===== GUI PREMIUM CU 6 CARDURI DIFERITE =====
function guiMode() {
  const html = `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wildfire • 6 Carduri Diferite</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    body {
      background: #0a0a0a;
      min-height: 100vh;
      padding: 30px;
      color: #fff;
    }
    
    .container {
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .header {
      background: #0f0f0f;
      border: 1px solid #ff4500;
      border-radius: 20px;
      padding: 25px;
      margin-bottom: 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 20px;
    }
    
    h1 {
      font-size: 28px;
      font-weight: 800;
      background: linear-gradient(135deg, #fff, #ffd700);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .stats {
      display: flex;
      gap: 15px;
    }
    
    .stat {
      background: #1a1a1a;
      border: 1px solid #ff4500;
      border-radius: 30px;
      padding: 8px 20px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .stat-value {
      color: #ff4500;
      font-weight: 700;
      font-size: 20px;
    }
    
    .slot-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 25px;
    }
    
    .slot-card {
      background: #0f0f0f;
      border: 1px solid #ff4500;
      border-radius: 16px;
      padding: 16px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .slot-card:hover {
      transform: translateY(-2px);
      border-color: #ffd700;
      box-shadow: 0 8px 16px -8px #ff4500;
    }
    
    .slot-card.selected {
      border-color: #ffd700;
      box-shadow: 0 0 0 2px #ffd700;
    }
    
    .slot-number {
      font-size: 24px;
      font-weight: 800;
      color: #ff4500;
      margin-bottom: 8px;
    }
    
    .slot-status {
      font-size: 11px;
      color: #9ca3af;
      margin-bottom: 8px;
    }
    
    .slot-title {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .slot-category {
      font-size: 11px;
      color: #ff4500;
    }
    
    .preview-section {
      background: #0f0f0f;
      border: 1px solid #ff4500;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 25px;
    }
    
    .preview-title {
      font-size: 16px;
      font-weight: 600;
      color: #ffd700;
      margin-bottom: 15px;
    }
    
    .preview-card {
      background: #0a0a0a;
      border-radius: 14px;
      padding: 16px;
      max-width: 350px;
      margin: 0 auto;
    }
    
    .preview-category {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 10px;
    }
    
    .preview-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    
    .preview-cat-name {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      color: #9ca3af;
    }
    
    .preview-card-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    
    .preview-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ff4500;
      font-size: 11px;
    }
    
    .preview-user {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .preview-avatar {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 2px solid #ff4500;
    }
    
    .preview-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .preview-tags {
      display: flex;
      gap: 6px;
    }
    
    .preview-tag {
      padding: 3px 10px;
      font-size: 9px;
      font-weight: 600;
      border-radius: 30px;
      border: 1px solid;
    }
    
    .preview-btn {
      padding: 4px 12px;
      border-radius: 30px;
      background: rgba(255,69,0,0.1);
      color: #ff4500;
      font-size: 10px;
      font-weight: 600;
    }
    
    .editor {
      background: #0f0f0f;
      border: 1px solid #ff4500;
      border-radius: 16px;
      padding: 25px;
    }
    
    .editor-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    
    .editor-title {
      font-size: 20px;
      font-weight: 700;
    }
    
    .editor-title span {
      color: #ffd700;
    }
    
    .copy-tools {
      display: flex;
      gap: 8px;
    }
    
    .copy-btn {
      background: #1a1a1a;
      border: 1px solid #ff4500;
      border-radius: 20px;
      padding: 6px 14px;
      color: white;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.2s;
    }
    
    .copy-btn:hover {
      background: #ff4500;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }
    
    .form-group {
      margin-bottom: 12px;
    }
    
    label {
      display: block;
      margin-bottom: 5px;
      color: #9ca3af;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    input, select {
      width: 100%;
      padding: 10px 14px;
      background: #1a1a1a;
      border: 1px solid #ff4500;
      border-radius: 10px;
      color: white;
      font-size: 14px;
    }
    
    input:focus, select:focus {
      outline: none;
      border-color: #ffd700;
    }
    
    .color-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }
    
    .color-opt {
      background: #1a1a1a;
      border: 1px solid #ff4500;
      border-radius: 8px;
      padding: 8px 4px;
      text-align: center;
      cursor: pointer;
      font-size: 11px;
      transition: all 0.2s;
    }
    
    .color-opt:hover {
      border-color: #ffd700;
    }
    
    .color-opt.selected {
      background: rgba(255,69,0,0.2);
      border-color: #ffd700;
    }
    
    .copy-panel {
      background: #1a1a1a;
      border: 1px dashed #ff4500;
      border-radius: 12px;
      padding: 15px;
      margin-top: 15px;
      display: none;
    }
    
    .copy-panel.active {
      display: block;
    }
    
    .slot-selector {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin: 10px 0;
    }
    
    .slot-option {
      background: #0f0f0f;
      border: 1px solid #ff4500;
      border-radius: 8px;
      padding: 6px 12px;
      cursor: pointer;
      font-size: 12px;
    }
    
    .slot-option.selected {
      background: rgba(255,69,0,0.3);
      border-color: #ffd700;
    }
    
    .action-btns {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }
    
    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 30px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      flex: 1;
    }
    
    .btn-reset {
      background: #1a1a1a;
      border: 1px solid #ff4500;
      color: white;
    }
    
    .btn-reset:hover {
      background: #2a2a2a;
    }
    
    .btn-save {
      background: linear-gradient(135deg, #ff4500, #ff8c00);
      color: white;
    }
    
    .btn-save:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(255,69,0,0.3);
    }
    
    .status {
      margin-top: 15px;
      padding: 12px;
      border-radius: 8px;
      display: none;
    }
    
    .status.success {
      display: block;
      background: rgba(16,185,129,0.2);
      color: #10b981;
      border: 1px solid #10b981;
    }
    
    .status.error {
      display: block;
      background: rgba(239,68,68,0.2);
      color: #ef4444;
      border: 1px solid #ef4444;
    }
    
    @media (max-width: 1024px) {
      .slot-grid { grid-template-columns: repeat(2, 1fr); }
    }
    
    @media (max-width: 768px) {
      .slot-grid { grid-template-columns: 1fr; }
      .form-row { grid-template-columns: 1fr; }
      .action-btns { flex-direction: column; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔥 WILDFIRE • 6 CARDURI DIFERITE</h1>
      <div class="stats">
        <div class="stat"><span class="stat-value" id="total">6</span> Total</div>
        <div class="stat"><span class="stat-value" id="active">0</span> Active</div>
        <div class="stat"><span class="stat-value" id="current">1</span> Curent</div>
      </div>
    </div>
    
    <div class="slot-grid" id="slotGrid"></div>
    
    <div class="preview-section">
      <div class="preview-title">👁️ PREVIEW CARD</div>
      <div id="previewCard" class="preview-card">
        <div class="preview-category">
          <span class="preview-dot" id="previewDot" style="background: #ff4500;"></span>
          <span class="preview-cat-name" id="previewCategory">Categorie</span>
        </div>
        <div class="preview-card-title" id="previewTitle">Titlu card</div>
        <div class="preview-meta">
          <span id="previewDate">📅 zz.ll.aaaa</span>
          <div class="preview-user">
            <img src="" class="preview-avatar" id="previewAvatar" onerror="this.src='https://github.com/identicons/default.png'">
            <span id="previewUser">user</span>
          </div>
        </div>
        <div class="preview-footer">
          <div class="preview-tags">
            <span class="preview-tag" id="previewTag1">tag1</span>
            <span class="preview-tag" id="previewTag2">tag2</span>
          </div>
          <span class="preview-btn" id="previewBtn">vezi →</span>
        </div>
      </div>
    </div>
    
    <div class="editor">
      <div class="editor-header">
        <div class="editor-title">✏️ Editează <span id="currentSlot">Slot 1</span></div>
        <div class="copy-tools">
          <button class="copy-btn" onclick="showCopyPanel()">📋 Copiază</button>
          <button class="copy-btn" onclick="showPastePanel()">📌 Paste</button>
        </div>
      </div>
      
      <div id="copyPanel" class="copy-panel">
        <h4 style="margin-bottom:10px;">Copiază în:</h4>
        <div class="slot-selector" id="copySlots"></div>
        <button class="btn btn-save" style="margin-top:10px;" onclick="executeCopy()">Confirmă copiere</button>
      </div>
      
      <div id="pastePanel" class="copy-panel">
        <h4 style="margin-bottom:10px;">Paste din:</h4>
        <div class="slot-selector" id="pasteSlots"></div>
        <button class="btn btn-save" style="margin-top:10px;" onclick="executePaste()">Confirmă paste</button>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>Status</label>
          <select id="activeSel" onchange="updatePreview()">
            <option value="true">✅ ACTIV</option>
            <option value="false">❌ INACTIV</option>
          </select>
        </div>
        <div class="form-group">
          <label>Culoare</label>
          <div id="colorGrid" class="color-grid"></div>
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group"><label>Categorie</label><input id="cat" oninput="updatePreview()" placeholder="SKINS"></div>
        <div class="form-group"><label>Titlu</label><input id="title" oninput="updatePreview()" placeholder="Cases System"></div>
      </div>
      
      <div class="form-row">
        <div class="form-group"><label>Data</label><input id="date" oninput="updatePreview()" placeholder="16.02.2026"></div>
        <div class="form-group"><label>Username</label><input id="user" oninput="updatePreview()" placeholder="ianncxd"></div>
      </div>
      
      <div class="form-row">
        <div class="form-group"><label>Tag 1</label><input id="tag1" oninput="updatePreview()" placeholder="skins"></div>
        <div class="form-group"><label>Tag 2</label><input id="tag2" oninput="updatePreview()" placeholder="crate"></div>
      </div>
      
      <div class="form-row">
        <div class="form-group"><label>Link</label><input id="link" placeholder="/systems/skins/cases"></div>
        <div class="form-group"><label>Buton</label><input id="btnText" oninput="updatePreview()" placeholder="deschide"></div>
      </div>
      
      <div class="action-btns">
        <button class="btn btn-reset" onclick="resetForm()">🔄 RESETEAZĂ</button>
        <button class="btn btn-save" onclick="saveCurrentSlot()">💾 SALVEAZĂ</button>
      </div>
      
      <div id="status" class="status"></div>
    </div>
  </div>
  
  <script>
    let cards = {
      card1: { active: false, dotClass: 'dot-blue', category: '', title: '', date: '', username: '', tagColor: 'blue', tag1: '', tag2: '', link: '', buttonText: '' },
      card2: { active: false, dotClass: 'dot-orange', category: '', title: '', date: '', username: '', tagColor: 'orange', tag1: '', tag2: '', link: '', buttonText: '' },
      card3: { active: false, dotClass: 'dot-teal', category: '', title: '', date: '', username: '', tagColor: 'teal', tag1: '', tag2: '', link: '', buttonText: '' },
      card4: { active: false, dotClass: 'dot-amber', category: '', title: '', date: '', username: '', tagColor: 'amber', tag1: '', tag2: '', link: '', buttonText: '' },
      card5: { active: false, dotClass: 'dot-purple', category: '', title: '', date: '', username: '', tagColor: 'purple', tag1: '', tag2: '', link: '', buttonText: '' },
      card6: { active: false, dotClass: 'dot-pink', category: '', title: '', date: '', username: '', tagColor: 'pink', tag1: '', tag2: '', link: '', buttonText: '' }
    }
    
    let colors = ${JSON.stringify(Object.entries(cardColors).map(([k, v]) => ({ id: k, ...v })))}
    let currentSlot = 1
    let selectedColor = 'blue'
    
    async function loadCards() {
      try {
        const res = await fetch('/api/cards')
        const data = await res.json()
        if (data.success) cards = data.cards
      } catch (e) {}
      updateUI()
    }
    
    function updateUI() {
      renderSlots()
      updateStats()
      renderColorOptions()
      loadSlot(currentSlot)
    }
    
    function renderSlots() {
      let html = ''
      for (let i = 1; i <= 6; i++) {
        const card = cards[\`card\${i}\`] || {}
        html += \`
          <div class="slot-card \${currentSlot === i ? 'selected' : ''}" onclick="selectSlot(\${i})">
            <div class="slot-number">#\${i}</div>
            <div class="slot-status">\${card.active ? 'ACTIV' : 'INACTIV'}</div>
            <div class="slot-title">\${card.title || 'Card gol'}</div>
            <div class="slot-category">\${card.category || ''}</div>
          </div>
        \`
      }
      document.getElementById('slotGrid').innerHTML = html
    }
    
    function selectSlot(i) {
      currentSlot = i
      document.getElementById('current').innerText = i
      renderSlots()
      loadSlot(i)
    }
    
    function loadSlot(i) {
      const card = cards[\`card\${i}\`] || {}
      document.getElementById('activeSel').value = card.active ? 'true' : 'false'
      document.getElementById('cat').value = card.category || ''
      document.getElementById('title').value = card.title || ''
      document.getElementById('date').value = card.date || ''
      document.getElementById('user').value = card.username || ''
      document.getElementById('tag1').value = card.tag1 || ''
      document.getElementById('tag2').value = card.tag2 || ''
      document.getElementById('link').value = card.link || ''
      document.getElementById('btnText').value = card.buttonText || ''
      
      document.getElementById('currentSlot').innerText = \`Slot \${i}\`
      
      if (card.dotClass) {
        const col = colors.find(c => c.dot === card.dotClass)
        if (col) selectedColor = col.id
      }
      renderColorOptions()
      updatePreview()
    }
    
    function updateStats() {
      let active = 0
      for (let i = 1; i <= 6; i++) {
        if (cards[\`card\${i}\`]?.active) active++
      }
      document.getElementById('active').innerText = active
    }
    
    function renderColorOptions() {
      let html = ''
      colors.forEach(c => {
        html += \`<div class="color-opt \${c.id === selectedColor ? 'selected' : ''}" onclick="selectColor('\${c.id}')">\${c.emoji} \${c.name}</div>\`
      })
      document.getElementById('colorGrid').innerHTML = html
    }
    
    function selectColor(id) {
      selectedColor = id
      renderColorOptions()
      updatePreview()
    }
    
    function updatePreview() {
      const colorInfo = colors.find(c => c.id === selectedColor) || colors[0]
      document.getElementById('previewDot').style.background = colorInfo.hex
      document.getElementById('previewCategory').innerText = document.getElementById('cat').value || 'Categorie'
      document.getElementById('previewTitle').innerText = document.getElementById('title').value || 'Titlu card'
      document.getElementById('previewDate').innerHTML = \`📅 \${document.getElementById('date').value || 'zz.ll.aaaa'}\`
      document.getElementById('previewUser').innerText = document.getElementById('user').value || 'user'
      document.getElementById('previewAvatar').src = \`https://github.com/\${document.getElementById('user').value || 'user'}.png\`
      document.getElementById('previewTag1').innerText = document.getElementById('tag1').value || 'tag1'
      document.getElementById('previewTag2').innerText = document.getElementById('tag2').value || 'tag2'
      document.getElementById('previewTag1').style.color = colorInfo.hex
      document.getElementById('previewTag1').style.borderColor = colorInfo.hex
      document.getElementById('previewTag2').style.color = colorInfo.hex
      document.getElementById('previewTag2').style.borderColor = colorInfo.hex
      document.getElementById('previewBtn').innerText = \`\${document.getElementById('btnText').value || 'vezi'} →\`
    }
    
    function resetForm() {
      document.getElementById('activeSel').value = 'false'
      document.getElementById('cat').value = ''
      document.getElementById('title').value = ''
      document.getElementById('date').value = ''
      document.getElementById('user').value = ''
      document.getElementById('tag1').value = ''
      document.getElementById('tag2').value = ''
      document.getElementById('link').value = ''
      document.getElementById('btnText').value = ''
      updatePreview()
    }
    
    function showCopyPanel() {
      document.getElementById('pastePanel').classList.remove('active')
      const panel = document.getElementById('copyPanel')
      panel.classList.toggle('active')
      if (panel.classList.contains('active')) {
        let html = ''
        for (let i = 1; i <= 6; i++) {
          if (i !== currentSlot) {
            html += \`<div class="slot-option" onclick="toggleCopySlot(\${i})" id="copySlot\${i}">Slot \${i}</div>\`
          }
        }
        document.getElementById('copySlots').innerHTML = html
      }
    }
    
    function showPastePanel() {
      document.getElementById('copyPanel').classList.remove('active')
      const panel = document.getElementById('pastePanel')
      panel.classList.toggle('active')
      if (panel.classList.contains('active')) {
        let html = ''
        for (let i = 1; i <= 6; i++) {
          if (i !== currentSlot) {
            html += \`<div class="slot-option" onclick="selectPasteSlot(\${i})" id="pasteSlot\${i}">Slot \${i}</div>\`
          }
        }
        document.getElementById('pasteSlots').innerHTML = html
      }
    }
    
    let copySlots = []
    function toggleCopySlot(slot) {
      const el = document.getElementById(\`copySlot\${slot}\`)
      if (copySlots.includes(slot)) {
        copySlots = copySlots.filter(s => s !== slot)
        el.classList.remove('selected')
      } else {
        copySlots.push(slot)
        el.classList.add('selected')
      }
    }
    
    async function executeCopy() {
      if (copySlots.length === 0) {
        showStatus('Selectează sloturi', 'error')
        return
      }
      
      const sourceCard = cards[\`card\${currentSlot}\`]
      if (!sourceCard || !sourceCard.title) {
        showStatus('Slotul sursă este gol', 'error')
        return
      }
      
      try {
        const res = await fetch('/api/card/copy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ source: currentSlot, targets: copySlots })
        })
        const data = await res.json()
        
        if (data.success) {
          showStatus(\`Copiat în sloturile \${copySlots.join(', ')}\`, 'success')
          setTimeout(() => location.reload(), 1500)
        }
      } catch (e) {
        showStatus('Eroare', 'error')
      }
    }
    
    let pasteSlot = null
    function selectPasteSlot(slot) {
      pasteSlot = slot
      document.querySelectorAll('#pasteSlots .slot-option').forEach(el => el.classList.remove('selected'))
      document.getElementById(\`pasteSlot\${slot}\`).classList.add('selected')
    }
    
    async function executePaste() {
      if (!pasteSlot) {
        showStatus('Selectează un slot sursă', 'error')
        return
      }
      
      try {
        const res = await fetch('/api/card/copy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ source: pasteSlot, targets: [currentSlot] })
        })
        const data = await res.json()
        
        if (data.success) {
          showStatus(\`Copiat din slot \${pasteSlot}\`, 'success')
          setTimeout(() => location.reload(), 1500)
        }
      } catch (e) {
        showStatus('Eroare', 'error')
      }
    }
    
    async function saveCurrentSlot() {
      const colorInfo = colors.find(c => c.id === selectedColor)
      if (!colorInfo) return showStatus('Alege o culoare', 'error')
      
      const data = {
        slot: currentSlot,
        active: document.getElementById('activeSel').value === 'true',
        dotClass: colorInfo.dot,
        category: document.getElementById('cat').value,
        title: document.getElementById('title').value,
        date: document.getElementById('date').value,
        username: document.getElementById('user').value,
        tagColor: colorInfo.tag,
        tag1: document.getElementById('tag1').value,
        tag2: document.getElementById('tag2').value,
        link: document.getElementById('link').value,
        buttonText: document.getElementById('btnText').value
      }
      
      if (!data.title || !data.category || !data.date || !data.username) {
        return showStatus('Completează toate câmpurile', 'error')
      }
      
      try {
        const res = await fetch('/api/card/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        const resData = await res.json()
        
        if (resData.success) {
          showStatus(\`Slot \${currentSlot} salvat!\`, 'success')
          cards[\`card\${currentSlot}\`] = {
            active: data.active,
            dotClass: data.dotClass,
            category: data.category,
            title: data.title,
            date: data.date,
            username: data.username,
            tagColor: data.tagColor,
            tag1: data.tag1,
            tag2: data.tag2,
            link: data.link,
            buttonText: data.buttonText
          }
          renderSlots()
          updateStats()
          loadSlot(currentSlot)
        }
      } catch (e) {
        showStatus('Eroare', 'error')
      }
    }
    
    function showStatus(msg, type) {
      const status = document.getElementById('status')
      status.className = 'status ' + type
      status.innerText = msg
      setTimeout(() => status.className = 'status', 2000)
    }
    
    loadCards()
  </script>
</body>
</html>`
  
  fs.writeFileSync(path.join(__dirname, 'card-editor.html'), html)
  
  const server = http.createServer((req, res) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`)
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
      
      if (req.method === 'OPTIONS') {
        res.writeHead(200)
        res.end()
        return
      }
      
      if (url.pathname === '/api/cards' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: true, cards: getAllCards() }))
        return
      }
      
      if (url.pathname === '/api/card/save' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => body += chunk)
        req.on('end', () => {
          try {
            const data = JSON.parse(body)
            const success = saveCard(data.slot, data)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ success }))
          } catch (e) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ success: false }))
          }
        })
        return
      }
      
      if (url.pathname === '/api/card/copy' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => body += chunk)
        req.on('end', () => {
          try {
            const { source, targets } = JSON.parse(body)
            const success = copyCard(source, targets)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ success }))
          } catch (e) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ success: false }))
          }
        })
        return
      }
      
      if (url.pathname === '/api/colors' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: true, colors: Object.entries(cardColors).map(([k, v]) => ({ id: k, ...v })) }))
        return
      }
      
      if (url.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(fs.readFileSync(path.join(__dirname, 'card-editor.html'), 'utf-8'))
        return
      }
      
      res.writeHead(404)
      res.end('Not found')
    } catch (e) {
      res.writeHead(500)
      res.end('Server error')
    }
  })
  
  const PORT = 3002
  server.listen(PORT, () => {
    console.clear()
    console.log(c.gold('\n╔════════════════════════════════════════════════════════╗'))
    console.log(c.gold('║') + '            ' + c.o('🔥 6 CARDURI DIFERITE') + '                 ' + c.gold('║'))
    console.log(c.gold('╠════════════════════════════════════════════════════════╣'))
    console.log(c.gold('║') + `  🌐 GUI: ${c.c(`http://localhost:${PORT}`)}`.padEnd(58) + c.gold('║'))
    console.log(c.gold('║') + '  📦 6 sloturi • Fiecare card diferit'.padEnd(58) + c.gold('║'))
    console.log(c.gold('╚════════════════════════════════════════════════════════╝\n'))
    
    const start = process.platform === 'win32' ? 'start' : 'open'
    exec(`${start} http://localhost:${PORT}`)
  })
}

// ===== MAIN =====
async function main() {
  console.clear()
  console.log(c.gold('\n╔════════════════════════════════════════════════════════╗'))
  console.log(c.gold('║') + '            ' + c.o('🔥 WILDFIRE CARD EDITOR') + '            ' + c.gold('║'))
  console.log(c.gold('╠════════════════════════════════════════════════════════╣'))
  console.log(c.gold('║') + '  ' + c.g('1.') + ' 🖥️  Terminal Mode'.padEnd(58) + c.gold('║'))
  console.log(c.gold('║') + '  ' + c.g('2.') + ' 🌐  GUI - 6 Carduri Diferite'.padEnd(58) + c.gold('║'))
  console.log(c.gold('║') + '  ' + c.r('0.') + ' ❌  Exit'.padEnd(60) + c.gold('║'))
  console.log(c.gold('╚════════════════════════════════════════════════════════╝\n'))
  
  const choice = await ask(c.g('🔸 Alege: '))
  
  if (choice === '1') {
    await terminalMode()
    await main()
  } else if (choice === '2') {
    guiMode()
  } else {
    process.exit(0)
  }
}

main().catch(console.error)
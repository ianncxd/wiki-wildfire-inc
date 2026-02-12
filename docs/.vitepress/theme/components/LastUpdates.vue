<template>
  <div class="last-updates">
    <div class="updates-header">
      <h2 class="section-title"><span>Recently Updated</span></h2>
      <span class="updates-badge">6 noi</span>
    </div>
    
    <div class="updates-grid">
      <!-- Informatii - Regulament -->
      <div class="update-card">
        <div class="card-category">
          <span class="category-dot dot-blue"></span>
          <span class="category-name" style="color: #3b82f6;">Informații</span>
        </div>
        <h3 class="card-title">Regulament</h3>
        <div class="card-meta">
          <span class="meta-date">📅 12.02.2026</span>
        </div>
        <div class="card-footer">
          <div class="card-tags">
            <span class="tag tag-blue">reguli</span>
            <span class="tag tag-blue">fair-play</span>
          </div>
          <a href="/informatii/regulament" class="card-button">
            <span>Vezi acum</span>
            <span class="button-arrow">→</span>
          </a>
        </div>
      </div>
      
      <!-- Sisteme - Crates -->
      <div class="update-card">
        <div class="card-category">
          <span class="category-dot dot-orange"></span>
          <span class="category-name" style="color: #ff4500;">Sisteme</span>
        </div>
        <h3 class="card-title">Crates</h3>
        <div class="card-meta">
          <span class="meta-date">📅 12.02.2026</span>
        </div>
        <div class="card-footer">
          <div class="card-tags">
            <span class="tag tag-orange">lucky</span>
            <span class="tag tag-orange">prizes</span>
          </div>
          <a href="/sisteme/crates" class="card-button">
            <span>Deschide</span>
            <span class="button-arrow">→</span>
          </a>
        </div>
      </div>

      <!-- Informatii - FAQ -->
      <div class="update-card">
        <div class="card-category">
          <span class="category-dot dot-blue"></span>
          <span class="category-name" style="color: #3b82f6;">Informații</span>
        </div>
        <h3 class="card-title">FAQ</h3>
        <div class="card-meta">
          <span class="meta-date">📅 11.02.2026</span>
        </div>
        <div class="card-footer">
          <div class="card-tags">
            <span class="tag tag-blue">faq</span>
            <span class="tag tag-blue">help</span>
          </div>
          <a href="/informatii/faq" class="card-button">
            <span>Citește</span>
            <span class="button-arrow">→</span>
          </a>
        </div>
      </div>

      <!-- Shop - MVP Anthem -->
      <div class="update-card">
        <div class="card-category">
          <span class="category-dot dot-purple"></span>
          <span class="category-name" style="color: #8b5cf6;">Premium</span>
        </div>
        <h3 class="card-title">MVP Anthem</h3>
        <div class="card-meta">
          <span class="meta-date">📅 12.02.2026</span>
        </div>
        <div class="card-footer">
          <div class="card-tags">
            <span class="tag tag-purple">vip</span>
            <span class="tag tag-purple">anthem</span>
          </div>
          <a href="/shop/mvp-anthem" class="card-button">
            <span>Cumpără</span>
            <span class="button-arrow">→</span>
          </a>
        </div>
      </div>

      <!-- Gambling - Blackjack -->
      <div class="update-card">
        <div class="card-category">
          <span class="category-dot dot-green"></span>
          <span class="category-name" style="color: #10b981;">Evenimente</span>
        </div>
        <h3 class="card-title">Blackjack</h3>
        <div class="card-meta">
          <span class="meta-date">📅 12.02.2026</span>
        </div>
        <div class="card-footer">
          <div class="card-tags">
            <span class="tag tag-green">lucky</span>
            <span class="tag tag-green">prizes</span>
          </div>
          <a href="/gambling/blackjack" class="card-button">
            <span>Joacă</span>
            <span class="button-arrow">→</span>
          </a>
        </div>
      </div>

      <!-- Anti-Cheat - Reports -->
      <div class="update-card">
        <div class="card-category">
          <span class="category-dot dot-red"></span>
          <span class="category-name" style="color: #ef4444;">Anti-Cheat</span>
        </div>
        <h3 class="card-title">Reports</h3>
        <div class="card-meta">
          <span class="meta-date">📅 11.02.2026</span>
        </div>
        <div class="card-footer">
          <div class="card-tags">
            <span class="tag tag-red">rewards</span>
            <span class="tag tag-red">income</span>
          </div>
          <a href="/sisteme/reports" class="card-button">
            <span>Vezi</span>
            <span class="button-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
    
    <div class="updates-footer">
      <a href="/updates" class="view-all-link">
        Arhivă actualizări
        <span class="arrow">→</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.last-updates {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 24px;
  position: relative;
  z-index: 30;
}

.updates-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #111827;
}

.dark .section-title {
  color: white;
}

.section-title span {
  background: linear-gradient(135deg, #ff4500, #ff8c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .section-title span {
  background: linear-gradient(135deg, #ff8c00, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.updates-badge {
  background: linear-gradient(135deg, #ff4500, #ff8c00);
  color: white;
  padding: 4px 16px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(255, 69, 0, 0.25);
  letter-spacing: 0.5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.updates-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 28px;
}

@media (max-width: 1024px) {
  .updates-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
}

@media (max-width: 640px) {
  .updates-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

.update-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 18px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;
}

.update-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #ff4500, #ff8c00, #ffd700);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.update-card:hover::before {
  opacity: 1;
}

.dark .update-card {
  background: rgba(17, 17, 17, 0.95);
  border: 1px solid #2a2a2a;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.update-card:hover {
  transform: translateY(-4px);
  border-color: transparent;
  box-shadow: 0 16px 24px -8px rgba(255, 69, 0, 0.15);
}

.dark .update-card:hover {
  border-color: transparent;
  background: rgba(25, 25, 25, 0.98);
  box-shadow: 0 16px 24px -8px rgba(255, 69, 0, 0.25);
}

.card-category {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

.category-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 8px currentColor;
}

/* TOATE DOT-URILE - sincronizate cu WildfireTag */
.dot-blue { background: #3b82f6; box-shadow: 0 0 8px #3b82f6; }
.dot-orange { background: #ff4500; box-shadow: 0 0 8px #ff4500; }
.dot-purple { background: #8b5cf6; box-shadow: 0 0 8px #8b5cf6; }
.dot-green { background: #10b981; box-shadow: 0 0 8px #10b981; }
.dot-pink { background: #ec4899; box-shadow: 0 0 8px #ec4899; }
.dot-red { background: #ef4444; box-shadow: 0 0 8px #ef4444; }
.dot-indigo { background: #6366f1; box-shadow: 0 0 8px #6366f1; }
.dot-yellow { background: #eab308; box-shadow: 0 0 8px #eab308; }
.dot-teal { background: #14b8a6; box-shadow: 0 0 8px #14b8a6; }
.dot-cyan { background: #06b6d4; box-shadow: 0 0 8px #06b6d4; }
.dot-fuchsia { background: #d946ef; box-shadow: 0 0 8px #d946ef; }
.dot-emerald { background: #10b981; box-shadow: 0 0 8px #10b981; }
.dot-amber { background: #f59e0b; box-shadow: 0 0 8px #f59e0b; }
.dot-gray { background: #64748b; box-shadow: 0 0 8px #64748b; }

.category-name {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.card-title {
  font-size: 17px;
  font-weight: 800;
  margin: 0 0 10px 0;
  line-height: 1.3;
  color: #111827;
  letter-spacing: -0.01em;
}

.dark .card-title {
  color: white;
}

.card-meta {
  display: flex;
  gap: 14px;
  margin-bottom: 16px;
  font-size: 11px;
  color: #6b7280;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding-bottom: 14px;
}

.dark .card-meta {
  color: #9ca3af;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.meta-date, .meta-time {
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 500;
}

/* Card footer */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  flex-wrap: wrap;
  gap: 10px;
}

.card-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

/* TOATE TAG-URILE - sincronizate 100% cu WildfireTag */
.tag {
  font-size: 9px;
  padding: 2px 8px;
  border-radius: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.2s ease;
  display: inline-block;
}

.tag-blue { background: linear-gradient(135deg, #3b82f6, #2563eb); }
.tag-orange { background: linear-gradient(135deg, #ff4500, #ff8c00); }
.tag-purple { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
.tag-green { background: linear-gradient(135deg, #10b981, #059669); }
.tag-pink { background: linear-gradient(135deg, #ec4899, #db2777); }
.tag-red { background: linear-gradient(135deg, #ef4444, #dc2626); }
.tag-indigo { background: linear-gradient(135deg, #6366f1, #4f46e5); }
.tag-yellow { background: linear-gradient(135deg, #eab308, #ca8a04); }
.tag-teal { background: linear-gradient(135deg, #14b8a6, #0d9488); }
.tag-cyan { background: linear-gradient(135deg, #06b6d4, #0891b2); }
.tag-fuchsia { background: linear-gradient(135deg, #d946ef, #c026d3); }
.tag-emerald { background: linear-gradient(135deg, #10b981, #059669); }
.tag-amber { background: linear-gradient(135deg, #f59e0b, #d97706); }
.tag-gray { background: linear-gradient(135deg, #64748b, #475569); }

.tag:hover {
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  filter: brightness(1.1);
}

/* Card button */
.card-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #ff4500;
  text-decoration: none;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 30px;
  background: rgba(255, 69, 0, 0.08);
  transition: all 0.2s ease;
  border: 1px solid transparent;
  white-space: nowrap;
  flex-shrink: 0;
}

.dark .card-button {
  background: rgba(255, 69, 0, 0.15);
  color: #ff8c00;
}

.card-button:hover {
  gap: 8px;
  background: rgba(255, 69, 0, 0.15);
  border-color: rgba(255, 69, 0, 0.3);
  color: #ff4500;
  transform: translateY(-1px);
}

.dark .card-button:hover {
  background: rgba(255, 69, 0, 0.25);
  color: #ffd700;
  border-color: rgba(255, 69, 0, 0.5);
}

.button-arrow {
  font-size: 13px;
  transition: transform 0.2s ease;
}

.card-button:hover .button-arrow {
  transform: translateX(4px);
}

/* Footer button */
.updates-footer {
  text-align: center;
  margin-top: 24px;
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 28px;
  border-radius: 30px;
  background: linear-gradient(135deg, #ff4500, #ff8c00);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 12px rgba(255, 69, 0, 0.25);
  letter-spacing: 0.5px;
}

.dark .view-all-link {
  box-shadow: 0 4px 12px rgba(255, 69, 0, 0.35);
}

.view-all-link:hover {
  gap: 12px;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 20px rgba(255, 69, 0, 0.4);
  filter: brightness(1.1);
}

.arrow {
  font-size: 18px;
  transition: transform 0.25s ease;
}

.view-all-link:hover .arrow {
  transform: translateX(5px);
}

/* Responsive */
@media (max-width: 768px) {
  .last-updates {
    margin: 32px auto;
    padding: 0 18px;
  }
  
  .section-title {
    font-size: 22px;
  }
  
  .section-title span {
    font-size: 22px;
  }
  
  .updates-badge {
    padding: 3px 14px;
    font-size: 12px;
  }
  
  .update-card {
    padding: 16px;
  }
  
  .card-title {
    font-size: 16px;
  }
  
  .card-footer {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .card-button {
    align-self: flex-end;
    padding: 4px 10px;
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .last-updates {
    padding: 0 16px;
  }
  
  .section-title {
    font-size: 20px;
  }
  
  .section-title span {
    font-size: 20px;
  }
  
  .tag {
    font-size: 8px;
    padding: 2px 6px;
  }
  
  .card-button {
    padding: 3px 8px;
    font-size: 9px;
  }
  
  .button-arrow {
    font-size: 11px;
  }
}
</style>
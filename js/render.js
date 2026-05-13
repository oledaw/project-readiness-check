// ─────────────────────────────────────────────
// render.js — HTML string builders; no DOM reads or writes
// ─────────────────────────────────────────────

import { SECTIONS, ALL_QUESTIONS, TIER_META, PRIORITY_META, classifyTier } from './data.js';

// ── Utilities ────────────────────────────────────────────────────────────────

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function bullets(items) {
  return `<ul>${items.map(b => `<li>${esc(b)}</li>`).join('')}</ul>`;
}

// ── Form ─────────────────────────────────────────────────────────────────────

function renderOption(opt, questionId) {
  const bulletHtml = bullets(opt.bullets);
  return `
    <label class="option">
      <div class="option-header">
        <input type="radio" name="${questionId}" value="${opt.value}">
        <span class="option-label">${esc(opt.label)}</span>
      </div>
      <div class="option-detail">
        ${bulletHtml}
        <div class="option-hint">👉 W praktyce: „${esc(opt.hint)}"</div>
      </div>
    </label>`;
}

function renderTooltip(tooltip) {
  return `
    <div class="tooltip-body">
      ${esc(tooltip.intro)}
      ${bullets(tooltip.bullets)}
    </div>`;
}

function renderQuestion(q, number) {
  return `
    <div class="question" id="wrap-${q.id}">
      <div class="question-title">
        ${number}. ${esc(q.title)}
        <button type="button" class="tooltip-btn" aria-label="Wskazówki">?</button>
      </div>
      ${renderTooltip(q.tooltip)}
      ${q.options.map(o => renderOption(o, q.id)).join('')}
    </div>`;
}

function renderSection(section, sectionIndex) {
  const num = sectionIndex + 1;
  // Question numbers are global (not reset per section)
  const offset = SECTIONS.slice(0, sectionIndex).reduce((sum, s) => sum + s.questions.length, 0);

  return `
    <h2>
      ${num}. ${esc(section.label)}
      <span class="section-score-badge" id="badge-${section.id}"></span>
    </h2>
    ${section.questions.map((q, qi) => renderQuestion(q, offset + qi + 1)).join('')}`;
}

/**
 * Renders the complete form interior.
 * @returns {string}
 */
export function renderFormContent() {
  const sections = SECTIONS.map((s, i) => renderSection(s, i)).join('');
  return `
    ${sections}
    <h2>Uwagi PM</h2>
    <textarea id="pmNotes" placeholder="Komentarze, ryzyka, decyzje, blokery..."></textarea>
    <button type="button" class="btn-primary" id="submitBtn">Generuj podsumowanie →</button>`;
}

// ── Result header ─────────────────────────────────────────────────────────────

/**
 * @param {{ totalPct: number, tier: string }} result
 * @returns {string}
 */
export function renderResultHeader(result) {
  // tier from scoring is 'low'|'med'|'high'; TIER_META keys are 'low'|'medium'|'high'
  const metaKey = result.tier === 'med' ? 'medium' : result.tier;
  const meta = TIER_META[metaKey];
  return `
    <div class="score">${meta.icon} ${result.totalPct}%</div>
    <div class="status-label">${esc(meta.label)}</div>
    <p>${esc(meta.desc)}</p>`;
}

// ── Section breakdown cards ───────────────────────────────────────────────────

function barClass(tier) {
  return tier === 'low' ? 'bar-low' : tier === 'med' ? 'bar-med' : 'bar-high';
}

/**
 * @param {SurveyResult['sections']} sections
 * @returns {string}
 */
export function renderBreakdownGrid(sections) {
  return sections.map(sec => `
    <div class="breakdown-card">
      <h4>${esc(sec.label)}</h4>
      <div class="bar-wrap">
        <div class="bar-fill ${barClass(sec.tier)}" style="width:${sec.pct}%"></div>
      </div>
      <div style="font-size:13px;font-weight:bold;margin-bottom:6px">
        ${sec.pts}/${sec.max} pkt · ${sec.pct}%
      </div>
      <div class="rec">
        <strong>💡 Next step dla PM:</strong>${esc(sec.rec.next)}
      </div>
    </div>`
  ).join('');
}

// ── Action plan ───────────────────────────────────────────────────────────────

function renderActionItem(action, idx) {
  const pm   = PRIORITY_META[action.priority];
  const opts = SECTIONS.map(s =>
    `<option value="${esc(s.label)}"${s.label === action.section ? ' selected' : ''}>${esc(s.label)}</option>`
  ).join('');

  return `
    <div class="action-item" data-idx="${idx}" draggable="true">
      <span class="ai-handle" title="Przeciągnij, aby zmienić kolejność">⠿</span>
      <span class="priority ${pm.cssClass}" data-idx="${idx}">${esc(pm.label)}</span>
      <div class="ai-body">
        <div class="ai-cat">
          <select data-idx="${idx}" data-action="section">${opts}</select>
        </div>
        <div class="ai-text"
             contenteditable="true"
             data-idx="${idx}"
             data-placeholder="Wpisz działanie naprawcze…"
             data-action="text">${esc(action.text)}</div>
      </div>
      <button class="ai-del" data-idx="${idx}" title="Usuń">✕</button>
    </div>`;
}

/**
 * Renders the full action plan section.
 * @param {PlanAction[]} actions
 * @returns {string}
 */
export function renderActionPlan(actions) {
  const intro = `
    <h3>🛠️ Dynamiczny plan działań naprawczych</h3>
    <p style="font-size:13px;color:#555;margin-bottom:14px">
      Działania wygenerowane automatycznie na podstawie ocen per obszar.<br>
      <em style="color:#888">Edytuj treść · zmieniaj kategorię · przeciągaj kolejność.</em>
    </p>`;

  const body = actions.length === 0
    ? `<p style="color:#1f6b2b;background:#e3f7e6;padding:14px;border-radius:8px">
        Brak wymaganych działań – projekt jest dobrze przygotowany.
       </p>`
    : `<div id="planList">${actions.map((a, i) => renderActionItem(a, i)).join('')}</div>`;

  return `
    ${intro}
    ${body}
    <button class="ai-add-btn" id="addActionBtn">＋ Dodaj działanie</button>`;
}

// ── Priority badge (partial re-render helper) ─────────────────────────────────

/**
 * Returns the badge HTML for a given priority — used when updating a single item.
 * @param {string} priority
 * @returns {{ cssClass: string, label: string }}
 */
export function priorityBadgeMeta(priority) {
  return PRIORITY_META[priority] ?? PRIORITY_META.MED;
}

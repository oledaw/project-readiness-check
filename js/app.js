// ─────────────────────────────────────────────
// app.js — DOM wiring; imports everything else
// ─────────────────────────────────────────────

import { ALL_QUESTIONS, QUESTION_COUNT, SECTIONS, TIER_META, classifyTier } from './data.js';
import { computeResult, buildInitialActions }   from './scoring.js';
import { renderFormContent, renderResultHeader, renderBreakdownGrid } from './render.js';
import { initPlan, getActions }                 from './actionPlan.js';
import { copyJsonSummary }                      from './export.js';

// ── State ─────────────────────────────────────────────────────────────────────

/** @type {Record<string, number>} */
let currentAnswers = {};

/** @type {SurveyResult|null} */
let currentResult = null;

// ── Init ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  buildForm();
  bindFormEvents();
  bindResultEvents();
});

function buildForm() {
  document.getElementById('surveyForm').innerHTML = renderFormContent();
}

// ── Form event binding ────────────────────────────────────────────────────────

function bindFormEvents() {
  const form = document.getElementById('surveyForm');

  // Radio change → highlight + progress
  form.addEventListener('change', e => {
    if (e.target.type !== 'radio') return;
    highlightSelected(e.target);
    updateProgress();
  });

  // Tooltip toggle — delegated, click-based (mobile-friendly)
  form.addEventListener('click', e => {
    const btn = e.target.closest('.tooltip-btn');
    if (!btn) {
      closeAllTooltips();
      return;
    }
    const body = btn.closest('.question-title').nextElementSibling;
    const wasOpen = body.classList.contains('open');
    closeAllTooltips();
    if (!wasOpen) body.classList.add('open');
  });

  // Submit
  document.getElementById('submitBtn').addEventListener('click', handleSubmit);
}

function bindResultEvents() {
  document.getElementById('jsonBtn').addEventListener('click', handleExportJson);
  document.getElementById('resetBtn').addEventListener('click', handleReset);
}

// ── Progress bar ──────────────────────────────────────────────────────────────

function updateProgress() {
  const answered = ALL_QUESTIONS.filter(q =>
    document.querySelector(`input[name="${q.id}"]:checked`)
  ).length;

  document.getElementById('progressLabel').textContent =
    `Wypełniono: ${answered} / ${QUESTION_COUNT} pytań`;
  document.getElementById('progressFill').style.width =
    `${(answered / QUESTION_COUNT) * 100}%`;
}

// ── Option highlight ──────────────────────────────────────────────────────────

function highlightSelected(radio) {
  const name = radio.name;
  document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
    r.closest('.option').classList.toggle('selected', r.checked);
  });
  radio.closest('.question').classList.add('answered');
}

// ── Tooltips ──────────────────────────────────────────────────────────────────

function closeAllTooltips() {
  document.querySelectorAll('.tooltip-body.open').forEach(el => el.classList.remove('open'));
}

// ── Validation ────────────────────────────────────────────────────────────────

/**
 * Checks all questions are answered; highlights and scrolls to the first gap.
 * @returns {Record<string, number>|null}  answers map, or null if invalid
 */
function validateAndReadAnswers() {
  const answers = {};

  for (const q of ALL_QUESTIONS) {
    const checked = document.querySelector(`input[name="${q.id}"]:checked`);
    if (!checked) {
      flagMissingQuestion(q.id);
      return null;
    }
    answers[q.id] = parseInt(checked.value, 10);
  }

  return answers;
}

function flagMissingQuestion(qId) {
  const wrap = document.getElementById(`wrap-${qId}`);
  wrap.style.borderColor = '#e05252';
  wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const hint = Object.assign(document.createElement('span'), {
    style: 'color:#e05252;font-size:12px;font-weight:normal',
    textContent: ' ← uzupełnij',
  });
  const title = wrap.querySelector('.question-title');
  title.appendChild(hint);

  setTimeout(() => {
    wrap.style.borderColor = '';
    hint.remove();
  }, 3000);
}

// ── Submit ────────────────────────────────────────────────────────────────────

function handleSubmit() {
  const answers = validateAndReadAnswers();
  if (!answers) return;

  currentAnswers = answers;
  currentResult  = computeResult(answers);

  renderResult(currentResult);
  updateSectionBadges(currentResult);
  initPlan(buildInitialActions(currentResult), currentResult);

  const resultEl = document.getElementById('result');
  resultEl.style.display = 'block';
  resultEl.scrollIntoView({ behavior: 'smooth' });
}

// ── Result rendering ──────────────────────────────────────────────────────────

function renderResult(result) {
  const headerEl = document.getElementById('resultHeader');
  const metaKey  = result.tier === 'med' ? 'medium' : result.tier;
  headerEl.className = `result-header ${TIER_META[metaKey].cssClass}`;
  headerEl.innerHTML = renderResultHeader(result);

  document.getElementById('breakdownGrid').innerHTML = renderBreakdownGrid(result.sections);
}

function updateSectionBadges(result) {
  result.sections.forEach(sec => {
    const badge = document.getElementById(`badge-${sec.id}`);
    if (!badge) return;
    badge.style.display   = 'inline-block';
    badge.textContent     = `${sec.pct}%`;
    badge.style.background =
      sec.tier === 'low' ? '#e05252' :
      sec.tier === 'med' ? '#e0a030' : '#28a745';
  });
}

// ── JSON export ───────────────────────────────────────────────────────────────

async function handleExportJson() {
  if (!currentResult) return;
  try {
    await copyJsonSummary({
      answers:  currentAnswers,
      result:   currentResult,
      actions:  getActions(),
      pmNotes:  document.getElementById('pmNotes')?.value.trim() ?? '',
    });
    showToast('✅ JSON skopiowany do schowka!');
  } catch {
    showToast('❌ Nie udało się skopiować');
  }
}

// ── Reset ─────────────────────────────────────────────────────────────────────

function handleReset() {
  document.getElementById('surveyForm').reset();
  document.getElementById('result').style.display = 'none';

  document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
  document.querySelectorAll('.question').forEach(q => {
    q.classList.remove('answered');
    q.style.borderColor = '';
  });
  document.querySelectorAll('.section-score-badge').forEach(b => {
    b.style.display = 'none';
  });
  closeAllTooltips();

  currentAnswers = {};
  currentResult  = null;
  updateProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Toast ─────────────────────────────────────────────────────────────────────

function showToast(message) {
  const toast = document.getElementById('jsonToast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

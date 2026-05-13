// ─────────────────────────────────────────────
// actionPlan.js — plan state, CRUD, drag-and-drop
// Single responsibility: manage the mutable plan list and its DOM binding.
// ─────────────────────────────────────────────

import { SECTIONS, PRIORITY_META } from './data.js';
import { renderActionPlan, priorityBadgeMeta } from './render.js';

// ── State ─────────────────────────────────────────────────────────────────────

/** @type {PlanAction[]} */
let actions = [];

/** @type {number|null} */
let dragSrcIdx = null;

/** @type {SurveyResult|null} — kept for priority recalculation on section change */
let _lastResult = null;

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Initialise (or re-initialise) the plan from a fresh survey result.
 * @param {PlanAction[]} initialActions
 * @param {SurveyResult} result
 */
export function initPlan(initialActions, result) {
  actions      = initialActions;
  _lastResult  = result;
  _repaint();
}

/** Returns a snapshot of current actions for JSON export. */
export function getActions() {
  return actions.map((a, i) => ({ order: i + 1, ...a }));
}

// ── Internal helpers ──────────────────────────────────────────────────────────

function _repaint() {
  const container = document.getElementById('actionPlan');
  if (!container) return;
  container.innerHTML = renderActionPlan(actions);
  _bindEvents(container);
}

function _priorityForSection(sectionLabel) {
  if (!_lastResult) return 'MED';
  const sec = _lastResult.sections.find(s => s.label === sectionLabel);
  if (!sec) return 'MED';
  return sec.tier === 'low' ? 'HIGH' : sec.tier === 'med' ? 'MED' : 'LOW';
}

function _newAction() {
  const section = SECTIONS[0].label;
  return {
    id:       crypto.randomUUID(),
    text:     '',
    section,
    priority: _priorityForSection(section),
  };
}

// ── Event binding (delegated — one listener per container repaint) ────────────

function _bindEvents(container) {
  // ── Delegated clicks: delete button, add button ──
  container.addEventListener('click', e => {
    const del = e.target.closest('.ai-del');
    if (del) { _deleteItem(parseInt(del.dataset.idx)); return; }

    if (e.target.id === 'addActionBtn') { _addItem(); }
  });

  // ── Section dropdown change → recalculate priority badge ──
  container.addEventListener('change', e => {
    const sel = e.target.closest('select[data-action="section"]');
    if (!sel) return;
    const idx = parseInt(sel.dataset.idx);
    _updateSection(idx, sel.value);
  });

  // ── Contenteditable blur → persist text ──
  container.addEventListener('focusout', e => {
    const el = e.target.closest('[data-action="text"]');
    if (!el) return;
    const idx = parseInt(el.dataset.idx);
    if (actions[idx]) actions[idx].text = el.textContent.trim();
  });

  // ── Drag-and-drop ──
  container.querySelectorAll('.action-item').forEach(el => {
    el.addEventListener('dragstart',  _onDragStart);
    el.addEventListener('dragover',   _onDragOver);
    el.addEventListener('dragleave',  _onDragLeave);
    el.addEventListener('drop',       _onDrop);
    el.addEventListener('dragend',    _onDragEnd);
  });
}

// ── CRUD ──────────────────────────────────────────────────────────────────────

function _addItem() {
  actions.push(_newAction());
  _repaint();
  // Focus the new item's text field
  requestAnimationFrame(() => {
    const list = document.getElementById('planList');
    list?.querySelector('.action-item:last-child [data-action="text"]')?.focus();
  });
}

function _deleteItem(idx) {
  actions.splice(idx, 1);
  _repaint();
}

function _updateSection(idx, sectionLabel) {
  if (!actions[idx]) return;
  actions[idx].section  = sectionLabel;
  actions[idx].priority = _priorityForSection(sectionLabel);

  // Patch badge in-place — avoids full repaint and preserves focus
  const badge = document.querySelector(`.priority[data-idx="${idx}"]`);
  if (badge) {
    const meta = priorityBadgeMeta(actions[idx].priority);
    badge.className = `priority ${meta.cssClass}`;
    badge.textContent = meta.label;
  }
}

// ── Drag-and-drop handlers ────────────────────────────────────────────────────

function _onDragStart(e) {
  dragSrcIdx = parseInt(this.dataset.idx);
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', dragSrcIdx);
}

function _onDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  document.querySelectorAll('.action-item').forEach(el => el.classList.remove('drag-over'));
  this.classList.add('drag-over');
}

function _onDragLeave() {
  this.classList.remove('drag-over');
}

function _onDrop(e) {
  e.preventDefault();
  const destIdx = parseInt(this.dataset.idx);
  if (dragSrcIdx === null || dragSrcIdx === destIdx) return;
  const [moved] = actions.splice(dragSrcIdx, 1);
  actions.splice(destIdx, 0, moved);
  _repaint();
}

function _onDragEnd() {
  document.querySelectorAll('.action-item').forEach(el =>
    el.classList.remove('dragging', 'drag-over')
  );
  dragSrcIdx = null;
}

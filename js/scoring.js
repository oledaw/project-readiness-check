// ─────────────────────────────────────────────
// scoring.js — pure functions; no DOM, no side effects
// ─────────────────────────────────────────────

import { SECTIONS, MAX_TOTAL_SCORE, classifyTier } from './data.js';

/**
 * Reads current answer values from a name→value map and returns
 * per-section and overall scores.
 * @param {Record<string, number>} answers  e.g. { q1: 4, q2: 3, ... }
 * @returns {SurveyResult}
 */
export function computeResult(answers) {
  const totalScore = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const totalPct   = Math.round((totalScore / MAX_TOTAL_SCORE) * 100);

  const sections = SECTIONS.map(sec => {
    const pts = sec.questions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
    const max = sec.questions.length * 5;
    const pct = Math.round((pts / max) * 100);
    const tier = classifyTier(pct);
    return {
      id:       sec.id,
      label:    sec.label,
      pts,
      max,
      pct,
      tier,
      rec:      sec.recs[tier],
    };
  });

  return { totalScore, totalPct, tier: classifyTier(totalPct), sections };
}

/**
 * Derives the action priority for a section based on its tier.
 * @param {string} sectionLabel
 * @param {SurveyResult} result
 * @returns {'HIGH'|'MED'|'LOW'}
 */
export function priorityForSection(sectionLabel, result) {
  const sec = result.sections.find(s => s.label === sectionLabel);
  if (!sec) return 'MED';
  return sec.tier === 'low' ? 'HIGH' : sec.tier === 'med' ? 'MED' : 'LOW';
}

/**
 * Builds the initial flat action list from a survey result.
 * @param {SurveyResult} result
 * @returns {PlanAction[]}
 */
export function buildInitialActions(result) {
  return result.sections.flatMap(sec =>
    sec.rec.actions.map(a => ({
      id:       crypto.randomUUID(),
      text:     a.text,
      section:  sec.label,
      priority: a.priority,
    }))
  );
}

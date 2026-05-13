// ─────────────────────────────────────────────
// export.js — JSON summary builder and clipboard copy
// ─────────────────────────────────────────────

/**
 * Builds a structured JSON summary from survey state and copies it to clipboard.
 * @param {{ answers: Record<string,number>, result: SurveyResult, actions: object[], pmNotes: string }} params
 */
export async function copyJsonSummary({ answers, result, actions, pmNotes }) {
  const questions = buildQuestionsPayload(answers);
  const sections  = buildSectionsPayload(result);

  const summary = {
    generated_at:  new Date().toISOString(),
    tool:          'PM Toolbox – Ankieta oceny gotowości projektu',
    overall: {
      total_score:    result.totalScore,
      max_score:      Object.keys(answers).length * 5,
      percentage:     result.totalPct,
      readiness_tier: result.tier,
    },
    sections,
    questions,
    action_plan: actions,
    pm_notes:    pmNotes || null,
  };

  const json = JSON.stringify(summary, null, 2);
  await writeToClipboard(json);
}

// ── Payload builders ──────────────────────────────────────────────────────────

function buildQuestionsPayload(answers) {
  // Import SECTIONS lazily to avoid circular deps — use dynamic import pattern
  // Actually we pass answers and scrape labels from the live DOM (safe; elements exist at export time)
  return Object.entries(answers).map(([id, score]) => {
    const labelEl = document.querySelector(`input[name="${id}"][value="${score}"]`);
    const selectedLabel = labelEl
      ? labelEl.closest('.option')?.querySelector('.option-label')?.textContent?.trim() ?? ''
      : '';
    const titleEl = document.querySelector(`#wrap-${id} .question-title`);
    // Strip the tooltip button text from the title
    const title = titleEl
      ? [...titleEl.childNodes]
          .filter(n => n.nodeType === Node.TEXT_NODE)
          .map(n => n.textContent.trim())
          .join(' ')
          .trim()
      : '';
    return { id, question: title, score, max_score: 5, selected_answer: selectedLabel };
  });
}

function buildSectionsPayload(result) {
  return result.sections.map(sec => ({
    id:             sec.id,
    label:          sec.label,
    score:          sec.pts,
    max_score:      sec.max,
    percentage:     sec.pct,
    readiness_tier: sec.tier,
    next_step:      sec.rec.next,
    actions:        sec.rec.actions.map(a => ({ priority: a.priority, action: a.text })),
  }));
}

// ── Clipboard ─────────────────────────────────────────────────────────────────

async function writeToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
  } else {
    // Fallback for non-secure contexts (http://, file://)
    const ta = Object.assign(document.createElement('textarea'), {
      value: text,
      style: 'position:fixed;opacity:0;top:0;left:0',
    });
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
}

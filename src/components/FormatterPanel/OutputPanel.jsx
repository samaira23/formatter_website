// src/components/FormatterPanel/OutputPanel.jsx
import { PIPELINE_STAGES } from '../../utils/constants';
import Button from '../Button/Button';

/* ── Idle state ── */
function OutputIdle() {
  return (
    <div className="output-idle">
      <div className="output-idle__glyph" aria-hidden="true">∫</div>
      <span className="output-idle__label">Your formatted paper will appear here</span>
      <span className="output-idle__label">Upload a document to begin</span>
    </div>
  );
}

/* ── Progress state ── */
function OutputProgress({ stageStates }) {
  const visibleStages = PIPELINE_STAGES.filter(
    (s) => stageStates[s.n] !== undefined
  );

  return (
    <div className="progress-list">
      <div className="progress-list__title">Running pipeline…</div>
      {visibleStages.map((stage) => {
        const state = stageStates[stage.n];
        return (
          <div
            key={stage.n}
            className={`progress-item progress-item--${state}`}
          >
            <div className="progress-item__icon">
              {state === 'done' ? '✓' : stage.icon}
            </div>
            <div className="progress-item__label">
              Stage {stage.n}: {stage.name}
            </div>
            <div className="progress-item__time">
              {state === 'running' ? 'running…' : 'done'}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Syntax highlight the .tex preview (simple regex approach) ── */
function HighlightedTex({ code }) {
  // Split into lines and highlight
  const lines = code.split('\n').map((line, i) => {
    let cls = '';
    if (line.trim().startsWith('%')) cls = 'tex-comment';
    else if (/^\\[a-zA-Z]/.test(line.trim())) cls = 'tex-cmd';

    return (
      <span key={i} className={cls}>
        {line}
        {'\n'}
      </span>
    );
  });
  return <>{lines}</>;
}

/* ── Result state ── */
function OutputResult({ result }) {
  function copyTex() {
    navigator.clipboard?.writeText(result.texPreview).catch(() => {});
  }

  return (
    <div className="result" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Stats row */}
      <div className="result-stats">
        <div className="result-stat">
          <span className="result-stat__val">{result.sections}</span>
          <span className="result-stat__label">Sections</span>
        </div>
        <div className="result-stat">
          <span className="result-stat__val">{result.refs}</span>
          <span className="result-stat__label">References</span>
        </div>
        <div className="result-stat">
          <span className="result-stat__val">{result.tables}</span>
          <span className="result-stat__label">Tables</span>
        </div>
        <div className="result-stat">
          <span className="result-stat__val">{result.elapsed}</span>
          <span className="result-stat__label">Runtime</span>
        </div>
      </div>

      {/* Confidence bar */}
      <div className="confidence-bar">
        <div className="confidence-bar__header">
          <span className="confidence-bar__label">Canon confidence</span>
          <span className="confidence-bar__value">{result.confidence}%</span>
        </div>
        <div className="confidence-bar__track">
          <div
            className="confidence-bar__fill"
            style={{ width: `${result.confidence}%` }}
          />
        </div>
      </div>

      {/* .tex preview */}
      <pre className="tex-preview">
        <HighlightedTex code={result.texPreview} />
      </pre>

      {/* Actions */}
      <div className="result-actions">
        <Button variant="secondary" size="sm" onClick={copyTex}>
          Copy .tex
        </Button>
        <Button variant="secondary" size="sm">
          Download .tex
        </Button>
        <Button variant="primary" size="sm">
          Download PDF
        </Button>
      </div>
    </div>
  );
}

/* ── OutputPanel (selects state to render) ── */
export default function OutputPanel({ status, stageStates, result }) {
  return (
    <div
      className={`panel${status === 'done' ? ' panel--active' : ''}`}
      id="pf-output-panel"
    >
      {/* Top bar */}
      <div className="panel__topbar">
        <div className="panel__topbar-left">
          <div className="panel__topbar-dots">
            <div className="panel__topbar-dot" />
            <div className="panel__topbar-dot" />
            <div className="panel__topbar-dot" />
          </div>
          <span className="panel__topbar-title">
            {status === 'done'
              ? `output/paper_${result?.template}.pdf`
              : 'output.pdf'}
          </span>
        </div>
        <div className="panel__topbar-right">
          {status === 'idle' && (
            <span className="panel__status-pill">
              <span className="panel__status-dot" />
              <span className="panel__status-text">Idle</span>
            </span>
          )}
          {status === 'running' && (
            <span className="panel__status-pill panel__status-pill--running">
              <span className="panel__status-dot" />
              <span className="panel__status-text">Running</span>
            </span>
          )}
          {status === 'done' && (
            <span className="panel__status-pill panel__status-pill--ok">
              <span className="panel__status-dot" />
              <span className="panel__status-text">Ready</span>
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      {status === 'idle'    && <OutputIdle />}
      {status === 'running' && <OutputProgress stageStates={stageStates} />}
      {status === 'done'    && result && <OutputResult result={result} />}
    </div>
  );
}

// src/components/FormatterPanel/InputPanel.jsx
import { useRef, useState } from 'react';
import { TEMPLATES, formatFileSize } from '../../utils/constants';
import Button from '../Button/Button';

export default function InputPanel({
  template,
  onTemplateChange,
  file,
  onFileChange,
  text,
  onTextChange,
  onFormat,
  isRunning,
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const canFormat = (file || text.trim().length > 20) && !isRunning;
  const fileExt   = file ? file.name.split('.').pop().toUpperCase() : null;

  function handleDrop(e) {
    e.preventDefault();
    setIsDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) validateAndSet(f);
  }

  function validateAndSet(f) {
    const ext = f.name.split('.').pop().toLowerCase();
    if (['pdf', 'docx', 'doc'].includes(ext)) onFileChange(f);
  }

  return (
    <div className={`panel${isRunning ? ' panel--active' : ''}`} id="pf-input-panel">
      {/* Top bar */}
      <div className="panel__topbar">
        <div className="panel__topbar-left">
          <div className="panel__topbar-dots">
            <div className="panel__topbar-dot" />
            <div className="panel__topbar-dot" />
            <div className="panel__topbar-dot" />
          </div>
          <span className="panel__topbar-title">input.pdf / input.docx</span>
        </div>
        <div className="panel__topbar-right">
          {isRunning ? (
            <span className="panel__status-pill panel__status-pill--running">
              <span className="panel__status-dot" />
              <span className="panel__status-text">Processing</span>
            </span>
          ) : file ? (
            <span className="panel__status-pill panel__status-pill--ok">
              <span className="panel__status-dot" />
              <span className="panel__status-text">File ready</span>
            </span>
          ) : (
            <span className="panel__status-pill">
              <span className="panel__status-dot" />
              <span className="panel__status-text">Awaiting input</span>
            </span>
          )}
        </div>
      </div>

      {/* Template selector */}
      <div className="template-row">
        <span className="template-row__label">Template</span>
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            className={`template-chip${template === t.id ? ' template-chip--active' : ''}`}
            onClick={() => onTemplateChange(t.id)}
            title={t.desc}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* File info pill */}
      {file && (
        <div className="file-pill">
          <div className="file-pill__icon">{fileExt}</div>
          <div className="file-pill__info">
            <div className="file-pill__name">{file.name}</div>
            <div className="file-pill__meta">
              {formatFileSize(file.size)} · {fileExt} document
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            icon
            onClick={() => onFileChange(null)}
            aria-label="Remove file"
          >
            ✕
          </Button>
        </div>
      )}

      {/* Drop zone */}
      {!file && (
        <div
          className={`dropzone${isDragOver ? ' dropzone--over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
          aria-label="Upload paper — drop PDF or DOCX, or click to browse"
        >
          <span className="dropzone__icon" aria-hidden="true">
            {isDragOver ? '📄' : '⬡'}
          </span>
          <div>
            <div className="dropzone__title">Drop your paper here</div>
          </div>
          <span className="dropzone__sub">PDF · DOCX · DOC &nbsp;·&nbsp; or click to browse</span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc"
            style={{ display: 'none' }}
            onChange={(e) => validateAndSet(e.target.files[0])}
          />
        </div>
      )}

      {/* Textarea for raw paste */}
      <textarea
        className="input-textarea"
        placeholder="…or paste raw paper text / abstract here to test without a file"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        spellCheck={false}
        aria-label="Raw paper text input"
      />

      {/* Format button */}
      <div className="panel__footer">
        <Button
          variant="primary"
          size="lg"
          full
          disabled={!canFormat}
          loading={isRunning}
          onClick={onFormat}
        >
          {isRunning
            ? 'Formatting…'
            : `Format → ${template.toUpperCase()}`}
        </Button>
      </div>
    </div>
  );
}

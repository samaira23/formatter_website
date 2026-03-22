// src/components/LogConsole/LogConsole.jsx
import { useEffect, useRef } from 'react';

export default function LogConsole({ logs }) {
  const bodyRef = useRef(null);

  // Auto-scroll to bottom on new log entries
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [logs]);

  if (!logs || logs.length === 0) return null;

  return (
    <div className="log-console" id="pf-log-console">
      <div className="log-console__topbar">
        <div className="log-console__title">
          <span className="log-console__title-dot" />
          pipeline_latest.log
        </div>
        <span className="log-console__meta">{logs.length} lines</span>
      </div>

      <div className="log-console__body" ref={bodyRef}>
        {logs.map((entry) => (
          <div
            key={entry.id}
            className={`log-line log-line--${entry.type}`}
          >
            <span className="log-line__ts">{entry.ts}</span>
            <span className="log-line__text">{entry.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

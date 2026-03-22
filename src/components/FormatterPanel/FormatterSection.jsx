// src/components/FormatterPanel/FormatterSection.jsx
import { useState, useCallback } from 'react';
import { simulatePipeline } from '../../utils/constants';
import InputPanel  from './InputPanel';
import OutputPanel from './OutputPanel';
import LogConsole  from '../LogConsole/LogConsole';

export default function FormatterSection({ onStageChange }) {
  const [template,     setTemplate]     = useState('ieee');
  const [file,         setFile]         = useState(null);
  const [text,         setText]         = useState('');
  const [status,       setStatus]       = useState('idle');  // idle | running | done | error
  const [stageStates,  setStageStates]  = useState({});
  const [logs,         setLogs]         = useState([]);
  const [result,       setResult]       = useState(null);

  const handleFormat = useCallback(() => {
    if (status === 'running') return;
    setStatus('running');
    setLogs([]);
    setResult(null);
    setStageStates({});
    if (onStageChange) onStageChange({});

    simulatePipeline({
      onStage: (stageN, state) => {
        setStageStates((prev) => {
          const next = { ...prev, [stageN]: state };
          if (onStageChange) onStageChange(next);
          return next;
        });
      },
      onLog: (entry) => {
        setLogs((prev) => [...prev, { ...entry, id: `${Date.now()}-${Math.random()}` }]);
      },
      onDone: (res) => {
        setResult(res);
        setStatus('done');
      },
    });
  }, [status]);

  const showLog = (status === 'running' || status === 'done') && logs.length > 0;

  return (
    <section className="formatter" id="formatter">
      {/* Section header */}
      <div className="formatter__header">
        <div className="formatter__header-line" />
        <span className="formatter__header-tag">Formatter</span>
        <div className="formatter__header-line" />
      </div>

      {/* Main two-column grid */}
      <div className="formatter__grid">
        <InputPanel
          template={template}
          onTemplateChange={setTemplate}
          file={file}
          onFileChange={setFile}
          text={text}
          onTextChange={setText}
          onFormat={handleFormat}
          isRunning={status === 'running'}
        />
        <OutputPanel
          status={status}
          stageStates={stageStates}
          result={result}
        />

        {/* Log console spans full width */}
        {showLog && <LogConsole logs={logs} />}
      </div>
    </section>
  );
}

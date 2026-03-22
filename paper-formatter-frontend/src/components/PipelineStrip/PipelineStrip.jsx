// src/components/PipelineStrip/PipelineStrip.jsx
import { PIPELINE_STAGES } from '../../utils/constants';

export default function PipelineStrip({ stageStates }) {


  return (
    <div className="pipeline-strip">
      <div className="pipeline-strip__inner">
        {PIPELINE_STAGES.map((stage) => {
          const state = stageStates[stage.n]; // 'running' | 'done' | undefined
          return (
            <div
              key={stage.n}
              className={[
                'pipeline-stage',
                state === 'running' ? 'pipeline-stage--running' : '',
                state === 'done'    ? 'pipeline-stage--done'    : '',
              ].filter(Boolean).join(' ')}
              title={stage.desc}
            >
              <span className="pipeline-stage__num">{String(stage.n).padStart(2, '0')}</span>
              <span className="pipeline-stage__icon" aria-hidden="true">
                {state === 'done' ? '✓' : stage.icon}
              </span>
              <span className="pipeline-stage__name">{stage.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

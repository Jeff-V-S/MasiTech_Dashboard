import { useState } from 'react';
import { STAGES } from '../types';
import type { Activity, Stage, StageStyle } from '../types';
import ActivityCard from './ActivityCard';

interface Props {
  stage: Stage;
  style: StageStyle;
  activities: Activity[];
  onMove: (id: string, stage: Stage) => void;
  onDelete: (id: string) => void;
}

export default function KanbanColumn({ stage, style, activities, onMove, onDelete }: Props) {
  const [over, setOver] = useState(false);
  const idx = STAGES.indexOf(stage);

  return (
    <div
      onDragOver={e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setOver(true);
      }}
      onDragLeave={e => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOver(false);
      }}
      onDrop={e => {
        e.preventDefault();
        setOver(false);
        const id = e.dataTransfer.getData('text/plain');
        if (id) onMove(id, stage);
      }}
      className={`kanban-col flex-1 rounded-xl p-3 border transition ${
        over ? 'bg-teal-100/70 border-masiTeal border-dashed' : 'bg-slate-200/60 border-slate-300'
      }`}
    >
      <div className={`flex items-center justify-between mb-3 pb-2 border-b ${style.border}`}>
        <span className={`font-bold text-xs uppercase ${style.text}`}>{style.title}</span>
      </div>
      <div className="space-y-3 min-h-[300px]">
        {activities.map(act => (
          <ActivityCard
            key={act.id}
            activity={act}
            onPrev={idx > 0 ? () => onMove(act.id, STAGES[idx - 1]) : undefined}
            onNext={idx < STAGES.length - 1 ? () => onMove(act.id, STAGES[idx + 1]) : undefined}
            onDelete={() => onDelete(act.id)}
          />
        ))}
      </div>
    </div>
  );
}

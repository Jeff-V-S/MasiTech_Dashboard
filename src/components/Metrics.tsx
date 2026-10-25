import { STAGES, STAGE_STYLES } from '../types';
import type { Activity } from '../types';

export default function Metrics({ activities }: { activities: Activity[] }) {
  const done = activities.filter(a => a.stage === 'Conclusão').length;
  const pct = activities.length ? Math.round((done / activities.length) * 100) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
      {STAGES.map(stage => (
        <div
          key={stage}
          className={`bg-white rounded-xl p-3 shadow-sm border border-slate-200 border-l-4 ${STAGE_STYLES[stage].metric}`}
        >
          <p className="text-xs text-slate-500 font-semibold uppercase">{STAGE_STYLES[stage].label}</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{activities.filter(a => a.stage === stage).length}</p>
        </div>
      ))}
      <div className="col-span-2 lg:col-span-1 bg-masiNavy text-white rounded-xl p-3 shadow-sm flex flex-col justify-between">
        <p className="text-xs text-teal-300 font-semibold uppercase">Progresso</p>
        <div>
          <p className="text-2xl font-bold mt-0.5">{pct}%</p>
          <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-masiTeal h-full transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

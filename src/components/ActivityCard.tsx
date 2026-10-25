import type { Activity } from '../types';

interface Props {
  activity: Activity;
  onPrev?: () => void;
  onNext?: () => void;
  onDelete: () => void;
}

export default function ActivityCard({ activity, onPrev, onNext, onDelete }: Props) {
  return (
    <div className="bg-white p-3.5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">{activity.code || 'MST'}</span>
        <span className="text-[10px] font-bold text-amber-600">{activity.priority || 'Média'}</span>
      </div>
      <h4 className="font-bold text-slate-800 text-sm mt-1.5">{activity.name}</h4>
      <p className="text-xs text-slate-500">{activity.client || 'Sem cliente'}</p>
      <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-100">
        <button onClick={onDelete} className="text-xs text-red-500 hover:text-red-700 font-medium">Excluir</button>
        <div className="flex space-x-1">
          {onPrev && (
            <button onClick={onPrev} aria-label="Etapa anterior" className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-xs font-bold">←</button>
          )}
          {onNext && (
            <button onClick={onNext} aria-label="Próxima etapa" className="p-1 rounded bg-masiTeal text-white text-xs font-bold">→</button>
          )}
        </div>
      </div>
    </div>
  );
}

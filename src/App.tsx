import { useCallback, useEffect, useState } from 'react';
import { fetchActivities, sendAction } from './api';
import { STAGES, STAGE_STYLES } from './types';
import type { Activity, NewActivity, Stage } from './types';
import Header from './components/Header';
import Metrics from './components/Metrics';
import KanbanColumn from './components/KanbanColumn';
import ActivityModal from './components/ActivityModal';

const POLL_MS = 3000;

export default function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [synced, setSynced] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      setActivities(await fetchActivities());
      setSynced(true);
    } catch (err) {
      console.error('Erro ao carregar dados da API:', err);
      setSynced(false);
    }
  }, []);

  useEffect(() => {
    void load();
    const timer = setInterval(() => void load(), POLL_MS);
    return () => clearInterval(timer);
  }, [load]);

  const run = async (fn: () => Promise<void>) => {
    try {
      await fn();
    } catch (err) {
      console.error(err);
    }
    await load();
  };

  const create = (data: NewActivity) => run(() => sendAction({ action: 'CREATE', ...data }));
  const move = (id: string, stage: Stage) => {
    if (activities.find(a => a.id === id)?.stage === stage) return;
    // Atualização otimista: o card muda de coluna na hora, a API confirma depois.
    setActivities(list => list.map(a => (a.id === id ? { ...a, stage } : a)));
    return run(() => sendAction({ action: 'UPDATE_STAGE', id, stage }));
  };
  const remove = (id: string) => run(() => sendAction({ action: 'DELETE', id }));

  return (
    <>
      <Header synced={synced} onNew={() => setModalOpen(true)} />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 space-y-6">
        <Metrics activities={activities} />
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scroll items-start">
          {STAGES.map(stage => (
            <KanbanColumn
              key={stage}
              stage={stage}
              style={STAGE_STYLES[stage]}
              activities={activities.filter(a => a.stage === stage)}
              onMove={move}
              onDelete={remove}
            />
          ))}
        </div>
      </main>
      {modalOpen && <ActivityModal onClose={() => setModalOpen(false)} onSave={create} />}
    </>
  );
}

import { useState } from 'react';
import type { FormEvent } from 'react';
import { STAGES, STAGE_STYLES } from '../types';
import type { NewActivity, Priority, Stage } from '../types';

interface Props {
  onClose: () => void;
  onSave: (data: NewActivity) => Promise<void>;
}

const INPUT = 'w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-masiTeal outline-none';
const LABEL = 'block text-xs font-bold uppercase text-slate-600 mb-1';

export default function ActivityModal({ onClose, onSave }: Props) {
  const [form, setForm] = useState<NewActivity>({
    name: '',
    code: '',
    client: '',
    stage: STAGES[0],
    priority: 'Média'
  });

  const set = <K extends keyof NewActivity>(key: K, value: NewActivity[K]) =>
    setForm(f => ({ ...f, [key]: value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    await onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden">
        <div className="bg-masiNavy p-4 text-white flex justify-between items-center">
          <h3 className="font-bold text-lg">Nova Atividade</h3>
          <button onClick={onClose} aria-label="Fechar" className="text-slate-300 hover:text-white text-xl">&times;</button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div>
            <label className={LABEL} htmlFor="itemName">Nome do Item / Estrutura</label>
            <input id="itemName" required value={form.name} onChange={e => set('name', e.target.value)}
              placeholder="Ex: Painel de Alumínio Tipo A" className={INPUT} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL} htmlFor="itemCode">Código / ID</label>
              <input id="itemCode" required value={form.code} onChange={e => set('code', e.target.value)}
                placeholder="Ex: MST-001" className={INPUT} />
            </div>
            <div>
              <label className={LABEL} htmlFor="clientName">Cliente / Obra</label>
              <input id="clientName" value={form.client} onChange={e => set('client', e.target.value)}
                placeholder="Ex: Obra Ville" className={INPUT} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL} htmlFor="stageSelect">Etapa Inicial</label>
              <select id="stageSelect" value={form.stage} onChange={e => set('stage', e.target.value as Stage)} className={INPUT}>
                {STAGES.map(s => <option key={s} value={s}>{STAGE_STYLES[s].title}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="prioritySelect">Prioridade</label>
              <select id="prioritySelect" value={form.priority} onChange={e => set('priority', e.target.value as Priority)} className={INPUT}>
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium">Cancelar</button>
            <button type="submit" className="px-5 py-2 rounded-lg bg-masiTeal hover:bg-teal-600 text-white font-medium text-sm shadow">Salvar no Postgres</button>
          </div>
        </form>
      </div>
    </div>
  );
}

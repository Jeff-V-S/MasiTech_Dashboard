export const STAGES = [
  'Preparo do Material',
  'Montagem',
  'Soldagem',
  'Acabamento',
  'Pintura',
  'Conclusão'
] as const;

export type Stage = (typeof STAGES)[number];
export type Priority = 'Baixa' | 'Média' | 'Alta';

export interface Activity {
  id: string;
  code: string;
  name: string;
  client: string | null;
  stage: Stage;
  priority: Priority;
  createdAt: string;
}

export interface NewActivity {
  name: string;
  code: string;
  client: string;
  stage: Stage;
  priority: Priority;
}

export type ActivityAction =
  | ({ action: 'CREATE' } & Partial<NewActivity>)
  | { action: 'UPDATE_STAGE'; id: string; stage: Stage }
  | { action: 'DELETE'; id: string };

export interface StageStyle {
  label: string;
  title: string;
  border: string;
  text: string;
  metric: string;
}

export const STAGE_STYLES: Record<Stage, StageStyle> = {
  'Preparo do Material': { label: 'Preparo', title: '1. Preparo Material', border: 'border-amber-300', text: 'text-amber-800', metric: 'border-l-amber-500' },
  'Montagem': { label: 'Montagem', title: '2. Montagem', border: 'border-blue-300', text: 'text-blue-800', metric: 'border-l-blue-500' },
  'Soldagem': { label: 'Soldagem', title: '3. Soldagem', border: 'border-indigo-300', text: 'text-indigo-800', metric: 'border-l-indigo-500' },
  'Acabamento': { label: 'Acabamento', title: '4. Acabamento', border: 'border-purple-300', text: 'text-purple-800', metric: 'border-l-purple-500' },
  'Pintura': { label: 'Pintura', title: '5. Pintura', border: 'border-sky-300', text: 'text-sky-800', metric: 'border-l-sky-500' },
  'Conclusão': { label: 'Conclusão', title: '6. Conclusão', border: 'border-emerald-300', text: 'text-emerald-800', metric: 'border-l-emerald-500' }
};

import type { Activity, ActivityAction } from './types';

const ENDPOINT = '/api/activities';

export async function fetchActivities(): Promise<Activity[]> {
  const res = await fetch(ENDPOINT);
  if (!res.ok) throw new Error(`Erro ao carregar dados (${res.status})`);
  const data: unknown = await res.json();
  return Array.isArray(data) ? (data as Activity[]) : [];
}

export async function sendAction(body: ActivityAction): Promise<void> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`Erro na ação ${body.action} (${res.status})`);
}

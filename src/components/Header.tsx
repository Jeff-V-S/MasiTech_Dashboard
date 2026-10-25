interface Props {
  synced: boolean;
  onNew: () => void;
}

export default function Header({ synced, onNew }: Props) {
  const badge = synced
    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    : 'bg-red-500/20 text-red-300 border-red-500/30';
  const dot = synced ? 'bg-emerald-400' : 'bg-red-400';

  return (
    <header className="bg-masiNavy text-white shadow-lg border-b-4 border-masiTeal sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-wide text-white leading-none">MASITECH INSTALLATION</h1>
          <p className="text-xs text-teal-200 mt-1">Painel de Produção (PostgreSQL Neon)</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge}`}>
            <span className={`w-2 h-2 rounded-full animate-pulse ${dot}`} />
            <span>{synced ? 'Sincronizado' : 'Sem conexão'}</span>
          </div>
          <button
            onClick={onNew}
            className="bg-masiTeal hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition shadow"
          >
            + Nova Atividade
          </button>
        </div>
      </div>
    </header>
  );
}

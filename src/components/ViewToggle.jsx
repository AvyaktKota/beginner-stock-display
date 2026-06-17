import { LayoutGrid, List, Star } from 'lucide-react'

export default function ViewToggle({ view, onChange, favoriteCount }) {
  const btn = (v, Icon, label) => (
    <button
      onClick={() => onChange(v)}
      title={label}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
        ${view === v
          ? 'bg-white/10 text-white'
          : 'text-gray-600 hover:text-gray-300'
        }`}
    >
      <Icon size={13} />
      <span className="hidden sm:inline">{label}</span>
      {v === 'watchlist' && favoriteCount > 0 && (
        <span className="ml-0.5 text-yellow-400">({favoriteCount})</span>
      )}
    </button>
  )

  return (
    <div className="flex items-center gap-1 bg-white/4 border border-white/6 rounded-xl p-1">
      {btn('grid',      LayoutGrid, 'Cards')}
      {btn('list',      List,       'List')}
      {btn('watchlist', Star,       'Watchlist')}
    </div>
  )
}

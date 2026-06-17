const ALL = 'All'

export default function SectorFilter({ sectors, active, onChange }) {
  const tabs = [ALL, ...sectors]

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {tabs.map(s => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
            ${active === s
              ? 'bg-green-500/20 text-green-400 border border-green-500/40'
              : 'bg-white/4 text-gray-500 border border-white/6 hover:text-gray-300 hover:border-white/15'
            }`}
        >
          {s}
        </button>
      ))}
    </div>
  )
}

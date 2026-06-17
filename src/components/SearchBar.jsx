import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full sm:w-72">
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
      <input
        type="text"
        placeholder="Search symbol or company…"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-8 py-2 text-sm
          text-gray-200 placeholder-gray-600 focus:outline-none focus:border-green-500/60
          focus:ring-1 focus:ring-green-500/30 transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
        >
          <X size={13} />
        </button>
      )}
    </div>
  )
}

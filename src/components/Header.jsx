import { RefreshCw, BarChart2 } from 'lucide-react'
import Spinner from './Spinner'

export default function Header({ lastUpdated, loading, onRefresh, usingMock }) {
  const timeStr = lastUpdated
    ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : null

  return (
    <header className="border-b border-white/5 bg-black/80 backdrop-blur-xl sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-xl blur-md" />
            <div className="relative bg-black border border-green-500/30 rounded-xl p-2">
              <BarChart2 size={18} className="text-green-400" />
            </div>
          </div>
          <div>
            <h1 className="text-base font-bold text-white leading-none tracking-tight">ValueGlance</h1>
            <p className="text-[11px] text-gray-600 leading-none mt-0.5">Stock Dashboard</p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 text-xs text-gray-600">
          {usingMock && (
            <span
              title="No API key — showing demo data. Add VITE_FINNHUB_API_KEY to .env for live prices."
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full
                bg-yellow-500/8 text-yellow-500/80 border border-yellow-500/15 cursor-help"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse-green" />
              Demo data
            </span>
          )}
          {!usingMock && timeStr && (
            <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full
              bg-green-500/8 text-green-500/80 border border-green-500/15">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-green" />
              Live · {timeStr}
            </span>
          )}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8
              text-gray-400 hover:text-white hover:bg-white/10 transition-all
              disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium"
          >
            {loading ? <Spinner size="sm" /> : <RefreshCw size={12} />}
            Refresh
          </button>
        </div>
      </div>
    </header>
  )
}

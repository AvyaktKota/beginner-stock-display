import { RefreshCw, BarChart2 } from 'lucide-react'
import Spinner from './Spinner'

export default function Header({ lastUpdated, loading, onRefresh, usingMock }) {
  const timeStr = lastUpdated
    ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : null

  return (
    <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-1.5">
            <BarChart2 size={20} className="text-green-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-none">ValueGlance</h1>
            <p className="text-xs text-gray-500 leading-none mt-0.5">Stock Dashboard</p>
          </div>
        </div>

        {/* Status + refresh */}
        <div className="flex items-center gap-3 text-sm text-gray-500">
          {usingMock && (
            <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 text-xs border border-yellow-500/20">
              Demo data
            </span>
          )}
          {timeStr && (
            <span className="hidden sm:inline">Updated {timeStr}</span>
          )}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700
              text-gray-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium"
          >
            {loading
              ? <Spinner size="sm" />
              : <RefreshCw size={13} />
            }
            Refresh
          </button>
        </div>
      </div>
    </header>
  )
}

import { TrendingUp, TrendingDown, Activity } from 'lucide-react'

export default function SummaryBar({ stocks }) {
  if (!stocks.length) return null

  const gainers  = stocks.filter(s => s.changePct > 0).length
  const losers   = stocks.filter(s => s.changePct < 0).length
  const avgChange = (stocks.reduce((sum, s) => sum + (s.changePct ?? 0), 0) / stocks.length).toFixed(2)
  const positive  = parseFloat(avgChange) >= 0

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3">
        <div className="bg-green-500/10 rounded-lg p-2">
          <TrendingUp size={18} className="text-green-400" />
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Gainers</p>
          <p className="text-xl font-bold text-green-400">{gainers}</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3">
        <div className="bg-red-500/10 rounded-lg p-2">
          <TrendingDown size={18} className="text-red-400" />
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Losers</p>
          <p className="text-xl font-bold text-red-400">{losers}</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3">
        <div className={`rounded-lg p-2 ${positive ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
          <Activity size={18} className={positive ? 'text-green-400' : 'text-red-400'} />
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Avg Change</p>
          <p className={`text-xl font-bold ${positive ? 'text-green-400' : 'text-red-400'}`}>
            {positive ? '+' : ''}{avgChange}%
          </p>
        </div>
      </div>
    </div>
  )
}

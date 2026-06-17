import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

function getMood(ratio) {
  if (ratio >= 0.7) return { label: 'Bullish',  color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/25', Icon: TrendingUp  }
  if (ratio <= 0.3) return { label: 'Bearish',  color: 'text-red-400',   bg: 'bg-red-500/10',   border: 'border-red-500/25',   Icon: TrendingDown }
  return             { label: 'Neutral',  color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/25', Icon: Minus }
}

const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export default function MarketMood({ stocks }) {
  if (!stocks.length) return null

  const gainers   = stocks.filter(s => s.changePct > 0)
  const losers    = stocks.filter(s => s.changePct < 0)
  const ratio     = gainers.length / stocks.length
  const mood      = getMood(ratio)
  const { Icon } = mood

  const topGainer = [...gainers].sort((a, b) => b.changePct - a.changePct)[0]
  const topLoser  = [...losers].sort((a, b)  => a.changePct - b.changePct)[0]
  const totalCap  = stocks.reduce((s, x) => s + (x.marketCap || 0), 0)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {/* Mood */}
      <div className={`col-span-2 md:col-span-1 ${mood.bg} border ${mood.border} rounded-2xl p-5 flex items-center gap-4`}>
        <div className={`rounded-xl p-3 ${mood.bg} border ${mood.border}`}>
          <Icon size={22} className={mood.color} />
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-0.5 font-medium uppercase tracking-wider">Market Mood</p>
          <p className={`text-xl font-bold ${mood.color}`}>{mood.label}</p>
          <p className="text-xs text-gray-600 mt-0.5">{gainers.length} up · {losers.length} down</p>
        </div>
      </div>

      {/* Top gainer */}
      {topGainer && (
        <div className="bg-[#0a0a0a] border border-white/6 rounded-2xl p-5">
          <p className="text-xs text-gray-600 mb-1 font-medium uppercase tracking-wider">Top Gainer</p>
          <p className="text-base font-bold text-white">{topGainer.symbol}</p>
          <p className="text-green-400 font-semibold text-sm tabular-nums">
            +{topGainer.changePct?.toFixed(2)}%
          </p>
        </div>
      )}

      {/* Top loser */}
      {topLoser && (
        <div className="bg-[#0a0a0a] border border-white/6 rounded-2xl p-5">
          <p className="text-xs text-gray-600 mb-1 font-medium uppercase tracking-wider">Top Loser</p>
          <p className="text-base font-bold text-white">{topLoser.symbol}</p>
          <p className="text-red-400 font-semibold text-sm tabular-nums">
            {topLoser.changePct?.toFixed(2)}%
          </p>
        </div>
      )}

      {/* Total market cap */}
      {totalCap > 0 && (
        <div className="bg-[#0a0a0a] border border-white/6 rounded-2xl p-5">
          <p className="text-xs text-gray-600 mb-1 font-medium uppercase tracking-wider">Combined Cap</p>
          <p className="text-base font-bold text-white tabular-nums">
            ${(totalCap / 1e12).toFixed(2)}T
          </p>
          <p className="text-xs text-gray-600 mt-0.5">{stocks.length} stocks</p>
        </div>
      )}
    </div>
  )
}

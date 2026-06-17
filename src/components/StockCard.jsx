import { TrendingUp, TrendingDown, Star } from 'lucide-react'
import StockLogo from './StockLogo'
import Sparkline  from './Sparkline'

const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const fmtCap = v => {
  if (!v) return null
  if (v >= 1e12) return `$${(v / 1e12).toFixed(2)}T`
  if (v >= 1e9)  return `$${(v / 1e9).toFixed(1)}B`
  return null
}

export default function StockCard({ stock, onClick, isFavorite, onToggleFavorite, index = 0 }) {
  const positive = stock.changePct >= 0

  return (
    <div
      onClick={onClick}
      className={`relative group bg-[#0a0a0a] border border-white/8 rounded-2xl p-5 cursor-pointer
        transition-all duration-300 hover:-translate-y-1
        ${positive ? 'card-glow' : 'card-glow-red'}
        animate-fade-up`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Star */}
      <button
        onClick={e => { e.stopPropagation(); onToggleFavorite(stock.symbol) }}
        className={`absolute top-4 right-4 transition-all duration-200 z-10
          ${isFavorite ? 'text-yellow-400 scale-110' : 'text-gray-800 hover:text-gray-500'}`}
        title={isFavorite ? 'Remove from watchlist' : 'Add to watchlist'}
      >
        <Star size={14} fill={isFavorite ? 'currentColor' : 'none'} />
      </button>

      {/* Logo + identity */}
      <div className="flex items-center gap-3 mb-4">
        <StockLogo symbol={stock.symbol} size={44} />
        <div className="min-w-0 flex-1">
          <p className="font-bold text-white text-sm leading-tight">{stock.symbol}</p>
          <p className="text-gray-600 text-xs mt-0.5 truncate leading-tight">{stock.name}</p>
        </div>
      </div>

      {/* Price row */}
      <p className="text-2xl font-bold text-white tabular-nums leading-none mb-2">
        {fmt.format(stock.price)}
      </p>

      <div className="flex items-center gap-2 mb-4">
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full
          ${positive ? 'bg-green-500/12 text-green-400' : 'bg-red-500/12 text-red-400'}`}>
          {positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {positive ? '+' : ''}{stock.changePct?.toFixed(2)}%
        </span>
        <span className={`text-xs tabular-nums ${positive ? 'text-green-500/70' : 'text-red-500/70'}`}>
          {positive ? '+' : ''}{stock.change?.toFixed(2)}
        </span>
      </div>

      {/* Sparkline */}
      {stock.sparkline && (
        <div className="h-14 -mx-1">
          <Sparkline data={stock.sparkline} positive={positive} />
        </div>
      )}

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
        <span className="text-[11px] text-gray-700 font-medium">{stock.sector}</span>
        {fmtCap(stock.marketCap) && (
          <span className="text-[11px] text-gray-700 tabular-nums">{fmtCap(stock.marketCap)}</span>
        )}
      </div>
    </div>
  )
}

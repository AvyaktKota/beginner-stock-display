import { X, TrendingUp, TrendingDown } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'

function buildExpandedData(sparkline, price) {
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return sparkline.map((v, i) => ({ day: labels[i] ?? `D${i + 1}`, price: v }))
}

export default function StockModal({ stock, onClose }) {
  if (!stock) return null

  const positive   = stock.changePct >= 0
  const color      = positive ? '#22c55e' : '#ef4444'
  const chartData  = buildExpandedData(stock.sparkline, stock.price)

  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
  const fmtBig = v => {
    if (!v) return '—'
    if (v >= 1e12) return `$${(v / 1e12).toFixed(2)}T`
    if (v >= 1e9)  return `$${(v / 1e9).toFixed(2)}B`
    return fmt.format(v)
  }
  const fmtVol = v => {
    if (!v) return '—'
    if (v >= 1e6) return `${(v / 1e6).toFixed(2)}M`
    if (v >= 1e3) return `${(v / 1e3).toFixed(1)}K`
    return v.toLocaleString()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-xl p-6 shadow-2xl animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">{stock.symbol}</span>
              <span className={`flex items-center gap-1 text-sm font-medium px-2 py-0.5 rounded-full ${
                positive ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'
              }`}>
                {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {positive ? '+' : ''}{stock.changePct?.toFixed(2)}%
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-0.5">{stock.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Price */}
        <div className="mb-5">
          <span className="text-4xl font-bold text-white">{fmt.format(stock.price)}</span>
          <span className={`ml-2 text-sm ${positive ? 'text-green-400' : 'text-red-400'}`}>
            {positive ? '+' : ''}{stock.change?.toFixed(2)} today
          </span>
        </div>

        {/* Chart */}
        <div className="h-44 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={color} stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: '#6b7280', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={['auto', 'auto']}
                tickFormatter={v => `$${v.toFixed(0)}`}
                width={55}
              />
              <Tooltip
                contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8 }}
                labelStyle={{ color: '#9ca3af', fontSize: 12 }}
                itemStyle={{ color: color }}
                formatter={v => [fmt.format(v), 'Price']}
              />
              <Area type="monotone" dataKey="price" stroke={color} strokeWidth={2} fill="url(#grad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Day High',   value: fmt.format(stock.high)  },
            { label: 'Day Low',    value: fmt.format(stock.low)   },
            { label: 'Volume',     value: fmtVol(stock.volume)    },
            { label: 'Market Cap', value: fmtBig(stock.marketCap) },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-800 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">{label}</p>
              <p className="text-sm font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-600 mt-4 text-center">
          7-day trend · Click anywhere outside to close
        </p>
      </div>
    </div>
  )
}

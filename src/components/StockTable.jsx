import { useState } from 'react'
import { TrendingUp, TrendingDown, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import Sparkline from './Sparkline'
import StockModal from './StockModal'

const fmt    = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
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
  return v?.toLocaleString() ?? '—'
}

const COLUMNS = [
  { key: 'symbol',    label: 'Symbol',     sortable: true  },
  { key: 'name',      label: 'Company',    sortable: true  },
  { key: 'sector',    label: 'Sector',     sortable: true  },
  { key: 'price',     label: 'Price',      sortable: true  },
  { key: 'change',    label: 'Change',     sortable: true  },
  { key: 'changePct', label: '% Change',   sortable: true  },
  { key: 'marketCap', label: 'Market Cap', sortable: true  },
  { key: 'volume',    label: 'Volume',     sortable: true  },
  { key: 'sparkline', label: '7d Trend',   sortable: false },
]

function SortIcon({ col, sortKey, sortDir }) {
  if (col !== sortKey) return <ChevronsUpDown size={13} className="text-gray-600" />
  return sortDir === 'asc'
    ? <ChevronUp size={13} className="text-green-400" />
    : <ChevronDown size={13} className="text-green-400" />
}

export default function StockTable({ stocks }) {
  const [sortKey, setSortKey] = useState('marketCap')
  const [sortDir, setSortDir] = useState('desc')
  const [selected, setSelected] = useState(null)

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const sorted = [...stocks].sort((a, b) => {
    const av = a[sortKey] ?? -Infinity
    const bv = b[sortKey] ?? -Infinity
    if (typeof av === 'string') {
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    }
    return sortDir === 'asc' ? av - bv : bv - av
  })

  return (
    <>
      <div className="overflow-x-auto scrollbar-thin rounded-xl border border-gray-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-900/60">
              {COLUMNS.map(col => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap
                    ${col.sortable ? 'cursor-pointer select-none hover:text-gray-300 transition-colors' : ''}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && <SortIcon col={col.key} sortKey={sortKey} sortDir={sortDir} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((stock, idx) => {
              const positive = stock.changePct >= 0
              return (
                <tr
                  key={stock.symbol}
                  onClick={() => setSelected(stock)}
                  className={`border-b border-gray-800/50 cursor-pointer transition-colors
                    hover:bg-gray-800/60 active:bg-gray-700/60
                    ${idx % 2 === 0 ? 'bg-gray-900/20' : 'bg-transparent'}`}
                >
                  <td className="px-4 py-3 font-bold text-white whitespace-nowrap">{stock.symbol}</td>
                  <td className="px-4 py-3 text-gray-300 whitespace-nowrap max-w-[160px] truncate">{stock.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-gray-800 text-gray-400">{stock.sector}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-white whitespace-nowrap tabular-nums">{fmt.format(stock.price)}</td>
                  <td className={`px-4 py-3 whitespace-nowrap tabular-nums font-medium ${positive ? 'text-green-400' : 'text-red-400'}`}>
                    {positive ? '+' : ''}{stock.change?.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
                      ${positive ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
                      {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                      {positive ? '+' : ''}{stock.changePct?.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-300 whitespace-nowrap tabular-nums">{fmtBig(stock.marketCap)}</td>
                  <td className="px-4 py-3 text-gray-400 whitespace-nowrap tabular-nums">{fmtVol(stock.volume)}</td>
                  <td className="px-4 py-3 w-28 min-w-[7rem]">
                    {stock.sparkline && <Sparkline data={stock.sparkline} positive={positive} />}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {selected && <StockModal stock={selected} onClose={() => setSelected(null)} />}
    </>
  )
}

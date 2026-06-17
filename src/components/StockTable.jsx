import { useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import Sparkline from './Sparkline'
import StockModal from './StockModal'

const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export default function StockTable({ stocks }) {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <div className="overflow-x-auto scrollbar-thin rounded-xl border border-gray-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-900/60">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Symbol</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Company</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Price</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">% Change</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">7d Trend</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, idx) => {
              const positive = stock.changePct >= 0
              return (
                <tr
                  key={stock.symbol}
                  onClick={() => setSelected(stock)}
                  className={`border-b border-gray-800/50 cursor-pointer transition-colors hover:bg-gray-800/60
                    ${idx % 2 === 0 ? 'bg-gray-900/20' : 'bg-transparent'}`}
                >
                  <td className="px-4 py-3 font-bold text-white">{stock.symbol}</td>
                  <td className="px-4 py-3 text-gray-300">{stock.name}</td>
                  <td className="px-4 py-3 font-semibold text-white tabular-nums">{fmt.format(stock.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
                      ${positive ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
                      {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                      {positive ? '+' : ''}{stock.changePct?.toFixed(2)}%
                    </span>
                  </td>
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

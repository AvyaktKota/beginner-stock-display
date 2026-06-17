import StockCard   from './StockCard'
import StockModal  from './StockModal'
import { useState } from 'react'

export default function StockGrid({ stocks, favorites, onToggleFavorite }) {
  const [selected, setSelected] = useState(null)

  if (stocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-700">
        <p className="text-lg font-medium">No stocks match your filter</p>
        <p className="text-sm mt-1">Try a different sector or clear the search</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stocks.map((stock, i) => (
          <StockCard
            key={stock.symbol}
            stock={stock}
            index={i}
            onClick={() => setSelected(stock)}
            isFavorite={favorites.has(stock.symbol)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      {selected && (
        <StockModal stock={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}

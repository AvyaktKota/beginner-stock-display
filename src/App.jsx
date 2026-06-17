import { useState } from 'react'
import Header    from './components/Header'
import SearchBar from './components/SearchBar'
import StockTable from './components/StockTable'
import Spinner   from './components/Spinner'
import { useStockData } from './hooks/useStockData'

export default function App() {
  const { stocks, loading, lastUpdated, usingMock, refresh } = useStockData()
  const [query, setQuery] = useState('')

  const filtered = stocks.filter(s =>
    s.symbol.toLowerCase().includes(query.toLowerCase()) ||
    s.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header lastUpdated={lastUpdated} loading={loading} onRefresh={refresh} usingMock={usingMock} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Beginner-Friendly Stocks</h2>
          <p className="text-gray-500 text-sm mt-1">A curated list of stable, widely-held stocks.</p>
        </div>
        {loading && stocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Spinner size="lg" />
            <p className="text-gray-500 text-sm">Fetching stock data…</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <SearchBar value={query} onChange={setQuery} />
            </div>
            <StockTable stocks={filtered} />
          </>
        )}
      </main>
    </div>
  )
}

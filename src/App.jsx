import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import Header     from './components/Header'
import SearchBar  from './components/SearchBar'
import SummaryBar from './components/SummaryBar'
import StockTable from './components/StockTable'
import Spinner    from './components/Spinner'
import { useStockData } from './hooks/useStockData'

export default function App() {
  const { stocks, loading, error, lastUpdated, usingMock, refresh } = useStockData()
  const [query, setQuery] = useState('')

  const filtered = stocks.filter(s =>
    s.symbol.toLowerCase().includes(query.toLowerCase()) ||
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.sector.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header lastUpdated={lastUpdated} loading={loading} onRefresh={refresh} usingMock={usingMock} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Beginner-Friendly Stocks</h2>
          <p className="text-gray-500 text-sm mt-1">
            A curated list of stable, widely-held stocks — a great starting point for new investors.
            Prices auto-refresh every 60 seconds with a live API key.
          </p>
        </div>
        {error && (
          <div className="mb-5 flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/20
            rounded-lg px-4 py-3 text-yellow-400 text-sm">
            <AlertTriangle size={16} className="shrink-0" />
            {error}
          </div>
        )}
        {loading && stocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Spinner size="lg" />
            <p className="text-gray-500 text-sm">Fetching stock data…</p>
          </div>
        ) : (
          <>
            <SummaryBar stocks={stocks} />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <SearchBar value={query} onChange={setQuery} />
              <p className="text-xs text-gray-600">
                {filtered.length} of {stocks.length} stocks · Click any row for details
              </p>
            </div>
            {filtered.length > 0 ? (
              <StockTable stocks={filtered} />
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-600">
                <p className="text-lg font-medium">No results for "{query}"</p>
                <p className="text-sm mt-1">Try a symbol like AAPL or a name like Apple</p>
              </div>
            )}
          </>
        )}
      </main>
      <footer className="text-center py-6 text-xs text-gray-700 border-t border-gray-800/50 mt-8">
        Data via Finnhub · For educational purposes only · Not financial advice
      </footer>
    </div>
  )
}

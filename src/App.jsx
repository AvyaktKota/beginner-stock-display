import { useState, useMemo } from 'react'
import { AlertTriangle } from 'lucide-react'
import Header       from './components/Header'
import TickerTape   from './components/TickerTape'
import SearchBar    from './components/SearchBar'
import SectorFilter from './components/SectorFilter'
import ViewToggle   from './components/ViewToggle'
import MarketMood   from './components/MarketMood'
import StockGrid    from './components/StockGrid'
import StockTable   from './components/StockTable'
import HowToUse     from './components/HowToUse'
import Spinner      from './components/Spinner'
import { useStockData } from './hooks/useStockData'
import { useWatchlist  } from './hooks/useWatchlist'

export default function App() {
  const { stocks, loading, error, lastUpdated, usingMock, refresh } = useStockData()
  const { favorites, toggle } = useWatchlist()

  const [query,  setQuery]  = useState('')
  const [sector, setSector] = useState('All')
  const [view,   setView]   = useState('grid')

  const sectors = useMemo(
    () => [...new Set(stocks.map(s => s.sector))].sort(),
    [stocks]
  )

  const visible = useMemo(() => {
    let list = stocks
    if (view === 'watchlist') list = list.filter(s => favorites.has(s.symbol))
    if (sector !== 'All')    list = list.filter(s => s.sector === sector)
    if (query)               list = list.filter(s =>
      s.symbol.toLowerCase().includes(query.toLowerCase()) ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.sector.toLowerCase().includes(query.toLowerCase())
    )
    return list
  }, [stocks, view, sector, query, favorites])

  return (
    <div className="min-h-screen bg-black text-gray-100 dot-grid">
      {/* Ambient glow blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[500px]
          bg-green-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px]
          bg-blue-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Header
          lastUpdated={lastUpdated}
          loading={loading}
          onRefresh={refresh}
          usingMock={usingMock}
        />

        {/* Ticker tape */}
        {stocks.length > 0 && <TickerTape stocks={stocks} />}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {/* Hero text */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/8
              border border-green-500/20 text-green-400 text-xs font-medium mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-green" />
              Beginner-Friendly
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              Today's Market<br />
              <span className="text-gray-600">at a glance</span>
            </h2>
            <p className="text-gray-600 text-sm mt-3 max-w-lg">
              A curated selection of stable, widely-held stocks — the best starting point
              for new investors. Click any card for detailed charts and stats.
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-6 flex items-center gap-3 bg-yellow-500/8 border border-yellow-500/15
              rounded-xl px-4 py-3 text-yellow-400/90 text-sm">
              <AlertTriangle size={15} className="shrink-0" />
              {error}
            </div>
          )}

          {loading && stocks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-40 gap-5">
              <Spinner size="lg" />
              <p className="text-gray-600 text-sm">Fetching market data…</p>
            </div>
          ) : (
            <>
              {/* Market mood */}
              <MarketMood stocks={stocks} />

              {/* Controls */}
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                  <SearchBar value={query} onChange={setQuery} />
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-gray-700 hidden sm:block">
                      {visible.length} stock{visible.length !== 1 ? 's' : ''}
                    </p>
                    <ViewToggle
                      view={view}
                      onChange={v => { setView(v); setSector('All') }}
                      favoriteCount={favorites.size}
                    />
                  </div>
                </div>

                {view !== 'watchlist' && (
                  <SectorFilter
                    sectors={sectors}
                    active={sector}
                    onChange={setSector}
                  />
                )}
              </div>

              {/* Empty watchlist state */}
              {view === 'watchlist' && visible.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-gray-700">
                  <p className="text-lg font-medium">Your watchlist is empty</p>
                  <p className="text-sm mt-1">Star any stock card to add it here</p>
                </div>
              )}

              {/* Stock display */}
              {view === 'list' ? (
                <StockTable stocks={visible} />
              ) : (
                <StockGrid
                  stocks={visible}
                  favorites={favorites}
                  onToggleFavorite={toggle}
                />
              )}

              {/* How to use */}
              <HowToUse />
            </>
          )}
        </main>

        <footer className="text-center py-6 text-xs text-gray-800 border-t border-white/4">
          Data via Finnhub · For educational purposes only · Not financial advice
        </footer>
      </div>
    </div>
  )
}

import { useState, useEffect, useCallback } from 'react'
import { BEGINNER_STOCKS, MOCK_QUOTES } from '../data/mockData'

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY

// Generates a realistic sparkline anchored to the actual current price
function buildSparkline(price) {
  const points = []
  let val = price * 0.97
  for (let i = 0; i < 7; i++) {
    val = val + (Math.random() - 0.48) * price * 0.008
    points.push(parseFloat(val.toFixed(2)))
  }
  points[6] = parseFloat(price.toFixed(2))
  return points
}

async function fetchQuote(symbol) {
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  // Finnhub returns: c=current, d=change, dp=change%, h=high, l=low, v=volume
  if (!data.c) throw new Error('No data')
  return {
    price:     data.c,
    change:    data.d,
    changePct: data.dp,
    high:      data.h,
    low:       data.l,
    volume:    data.v,
    marketCap: null,
    sparkline: buildSparkline(data.c),
  }
}

export function useStockData() {
  const [stocks, setStocks]     = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [usingMock, setUsingMock]     = useState(false)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)

    if (!API_KEY || API_KEY === 'your_api_key_here') {
      // No key — use mock data immediately
      await new Promise(r => setTimeout(r, 800)) // simulate loading feel
      const data = BEGINNER_STOCKS.map(s => ({
        ...s,
        ...MOCK_QUOTES[s.symbol],
      }))
      setStocks(data)
      setUsingMock(true)
      setLastUpdated(new Date())
      setLoading(false)
      return
    }

    // Real API path — fetch all symbols in parallel
    try {
      const results = await Promise.allSettled(
        BEGINNER_STOCKS.map(s => fetchQuote(s.symbol))
      )

      const data = BEGINNER_STOCKS.map((s, i) => {
        const r = results[i]
        if (r.status === 'fulfilled') {
          return { ...s, ...r.value }
        } else {
          // Fall back to mock for this symbol
          return { ...s, ...MOCK_QUOTES[s.symbol] }
        }
      })

      setStocks(data)
      setUsingMock(false)
      setLastUpdated(new Date())
    } catch (err) {
      setError('Failed to fetch stock data. Showing demo data instead.')
      const data = BEGINNER_STOCKS.map(s => ({ ...s, ...MOCK_QUOTES[s.symbol] }))
      setStocks(data)
      setUsingMock(true)
      setLastUpdated(new Date())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
    // Auto-refresh every 60 seconds if using real API
    if (API_KEY && API_KEY !== 'your_api_key_here') {
      const interval = setInterval(loadData, 60_000)
      return () => clearInterval(interval)
    }
  }, [loadData])

  return { stocks, loading, error, lastUpdated, usingMock, refresh: loadData }
}

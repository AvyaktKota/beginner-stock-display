import { useState, useCallback } from 'react'

const KEY = 'vg_watchlist'

function load() {
  try { return new Set(JSON.parse(localStorage.getItem(KEY) ?? '[]')) }
  catch { return new Set() }
}

function save(set) {
  localStorage.setItem(KEY, JSON.stringify([...set]))
}

export function useWatchlist() {
  const [favorites, setFavorites] = useState(load)

  const toggle = useCallback(symbol => {
    setFavorites(prev => {
      const next = new Set(prev)
      next.has(symbol) ? next.delete(symbol) : next.add(symbol)
      save(next)
      return next
    })
  }, [])

  return { favorites, toggle }
}

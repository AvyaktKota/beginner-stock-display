import { useState } from 'react'
import { LOGO_URLS, AVATAR_COLORS } from '../data/mockData'

export default function StockLogo({ symbol, size = 44 }) {
  const [err, setErr] = useState(false)
  const url = LOGO_URLS[symbol]

  if (url && !err) {
    return (
      <img
        src={url}
        alt={symbol}
        width={size}
        height={size}
        onError={() => setErr(true)}
        className="rounded-xl object-contain bg-white p-1.5 shrink-0"
        style={{ width: size, height: size }}
      />
    )
  }

  const [c1, c2] = AVATAR_COLORS[symbol] ?? ['#14532d', '#22c55e']
  const initials  = symbol.replace(/[^A-Z]/g, '').slice(0, 3)
  const fontSize  = size < 36 ? size * 0.3 : size * 0.27

  return (
    <div
      style={{
        width: size, height: size,
        background: `linear-gradient(135deg, ${c1}, ${c2})`,
        borderRadius: 12, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize, fontWeight: 700, color: 'white', letterSpacing: '-0.5px',
      }}
    >
      {initials}
    </div>
  )
}

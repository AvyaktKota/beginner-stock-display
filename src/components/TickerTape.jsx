export default function TickerTape({ stocks }) {
  if (!stocks.length) return null
  const items = [...stocks, ...stocks]

  return (
    <div className="bg-black border-b border-white/5 overflow-hidden py-2.5 select-none">
      <div className="flex animate-ticker whitespace-nowrap">
        {items.map((s, i) => {
          const positive = s.changePct >= 0
          return (
            <span key={i} className="inline-flex items-center gap-2 mx-5 text-xs">
              <span className="font-bold text-white tracking-wide">{s.symbol}</span>
              <span className="text-gray-400 tabular-nums">${s.price?.toFixed(2)}</span>
              <span className={`font-medium tabular-nums ${positive ? 'text-green-400' : 'text-red-400'}`}>
                {positive ? '▲' : '▼'} {Math.abs(s.changePct).toFixed(2)}%
              </span>
              <span className="text-white/10">|</span>
            </span>
          )
        })}
      </div>
    </div>
  )
}

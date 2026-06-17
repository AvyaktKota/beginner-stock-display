import { Search, MousePointerClick, ArrowUpDown, Star, TrendingUp, RefreshCw, BarChart2, Shield } from 'lucide-react'

const FEATURES = [
  {
    icon: MousePointerClick,
    title: 'Click Any Card',
    desc: 'Tap a stock card to open a detailed view with a 7-day area chart, day high/low, volume, and market cap.',
    color: 'text-green-400',
    bg:   'bg-green-500/8',
  },
  {
    icon: Search,
    title: 'Search & Filter',
    desc: 'Use the search bar to find stocks by symbol, company name, or sector. Filter by sector using the pill tabs.',
    color: 'text-blue-400',
    bg:   'bg-blue-500/8',
  },
  {
    icon: Star,
    title: 'Watchlist',
    desc: 'Star any stock to save it to your personal watchlist. Switch to Watchlist view to focus on your picks.',
    color: 'text-yellow-400',
    bg:   'bg-yellow-500/8',
  },
  {
    icon: ArrowUpDown,
    title: 'Sort the Table',
    desc: 'In list view, click any column header to sort by price, % change, market cap, volume, and more.',
    color: 'text-purple-400',
    bg:   'bg-purple-500/8',
  },
  {
    icon: TrendingUp,
    title: '7-Day Sparkline',
    desc: 'Each card shows a mini trend line for the past 7 sessions — green for uptrend, red for downtrend.',
    color: 'text-emerald-400',
    bg:   'bg-emerald-500/8',
  },
  {
    icon: RefreshCw,
    title: 'Auto Refresh',
    desc: 'With a live API key, prices refresh automatically every 60 seconds. Hit Refresh manually any time.',
    color: 'text-cyan-400',
    bg:   'bg-cyan-500/8',
  },
  {
    icon: BarChart2,
    title: 'Market Mood',
    desc: 'The top bar shows the overall sentiment of this watchlist — Bullish, Bearish, or Neutral — based on gainers vs. losers.',
    color: 'text-orange-400',
    bg:   'bg-orange-500/8',
  },
  {
    icon: Shield,
    title: 'For Education Only',
    desc: 'This dashboard is a learning tool. Always do your own research before making any investment decisions.',
    color: 'text-gray-400',
    bg:   'bg-white/4',
  },
]

export default function HowToUse() {
  return (
    <section className="mt-20 mb-8">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="h-px flex-1 bg-white/6" />
        <span className="text-xs text-gray-600 uppercase tracking-widest font-semibold">How to use</span>
        <div className="h-px flex-1 bg-white/6" />
      </div>

      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-white mt-4">Everything you need to know</h3>
        <p className="text-gray-600 text-sm mt-2 max-w-md mx-auto">
          ValueGlance surfaces key market data in one place — here's what each feature does.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURES.map(({ icon: Icon, title, desc, color, bg }) => (
          <div
            key={title}
            className="bg-[#080808] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors"
          >
            <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${bg} mb-4`}>
              <Icon size={17} className={color} />
            </div>
            <h4 className="font-semibold text-white text-sm mb-1.5">{title}</h4>
            <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

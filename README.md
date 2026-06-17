# ValueGlance Stock Dashboard

A responsive stock price dashboard built with React, Tailwind CSS, and Recharts. Fetches live data from the [Finnhub API](https://finnhub.io) and falls back to realistic demo data when no API key is configured.

## Features

- **Live stock data** via Finnhub (free API key, 60-second auto-refresh)
- **Sortable table** — click any column header to sort ascending/descending
- **Search** — filter by symbol, company name, or sector
- **Summary bar** — gainers, losers, and average % change at a glance
- **Sparkline charts** — 7-day trend mini-chart per row
- **Detail modal** — click any row for an expanded area chart + day high/low/volume/market cap
- **Loading spinner** and **error handling** with graceful fallback to demo data
- **Demo data badge** — clear indicator when running without a live API key

## Getting Started

```bash
npm install
cp .env.example .env
# Add your free Finnhub key to .env
npm run dev
```

Get a free API key at [finnhub.io](https://finnhub.io) (30-second signup).

## Tech Stack

- React 18
- Tailwind CSS 3
- Recharts
- Lucide React icons
- Vite

## Deployment

Deployed on Vercel. Set `VITE_FINNHUB_API_KEY` in your Vercel project's environment variables.

// Realistic mock data used when no API key is set
// Sparkline = last 7 data points for the mini chart

export const BEGINNER_STOCKS = [
  { symbol: 'AAPL',  name: 'Apple Inc.',              sector: 'Technology' },
  { symbol: 'MSFT',  name: 'Microsoft Corp.',          sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.',            sector: 'Technology' },
  { symbol: 'AMZN',  name: 'Amazon.com Inc.',          sector: 'Consumer Cyclical' },
  { symbol: 'NVDA',  name: 'NVIDIA Corp.',             sector: 'Technology' },
  { symbol: 'TSLA',  name: 'Tesla Inc.',               sector: 'Automotive' },
  { symbol: 'SPY',   name: 'SPDR S&P 500 ETF',        sector: 'ETF' },
  { symbol: 'QQQ',   name: 'Invesco QQQ (Nasdaq ETF)', sector: 'ETF' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway B',     sector: 'Financials' },
  { symbol: 'KO',    name: 'Coca-Cola Co.',            sector: 'Consumer Staples' },
  { symbol: 'V',     name: 'Visa Inc.',                sector: 'Financials' },
  { symbol: 'JNJ',   name: 'Johnson & Johnson',        sector: 'Healthcare' },
]

export const MOCK_QUOTES = {
  AAPL:  { price: 213.49, change: 2.31,  changePct:  1.09, high: 214.20, low: 210.10, volume: 54_230_100, marketCap: 3.28e12, sparkline: [208,209,211,210,212,211,213] },
  MSFT:  { price: 415.32, change: -1.84, changePct: -0.44, high: 418.50, low: 413.20, volume: 18_420_300, marketCap: 3.09e12, sparkline: [418,417,416,419,417,417,415] },
  GOOGL: { price: 175.84, change: 3.12,  changePct:  1.81, high: 176.90, low: 173.10, volume: 22_150_800, marketCap: 2.18e12, sparkline: [170,171,173,172,174,173,176] },
  AMZN:  { price: 193.61, change: 1.57,  changePct:  0.82, high: 194.80, low: 191.30, volume: 31_670_200, marketCap: 2.02e12, sparkline: [190,191,192,191,193,192,194] },
  NVDA:  { price: 875.39, change: 22.45, changePct:  2.63, high: 880.10, low: 860.50, volume: 41_890_600, marketCap: 2.16e12, sparkline: [840,848,855,862,858,868,875] },
  TSLA:  { price: 177.48, change: -4.32, changePct: -2.38, high: 183.20, low: 176.10, volume: 87_340_400, marketCap: 5.65e11, sparkline: [185,183,181,180,182,179,177] },
  SPY:   { price: 527.14, change: 2.08,  changePct:  0.40, high: 528.30, low: 524.90, volume: 62_110_500, marketCap: null,    sparkline: [522,523,524,525,525,526,527] },
  QQQ:   { price: 448.82, change: 3.21,  changePct:  0.72, high: 449.90, low: 445.60, volume: 35_450_700, marketCap: null,    sparkline: [443,444,446,445,447,447,449] },
  'BRK.B':{ price: 405.67, change: 0.88, changePct:  0.22, high: 406.90, low: 403.10, volume: 3_210_400,  marketCap: 8.84e11, sparkline: [403,403,404,404,405,405,406] },
  KO:    { price: 62.43,  change: 0.31,  changePct:  0.50, high: 62.80,  low: 61.90,  volume: 11_230_200, marketCap: 2.69e11, sparkline: [61,61,62,62,62,62,62] },
  V:     { price: 275.18, change: 1.44,  changePct:  0.53, high: 276.30, low: 273.40, volume: 5_670_300,  marketCap: 5.58e11, sparkline: [272,273,274,274,275,274,275] },
  JNJ:   { price: 147.92, change: -0.63, changePct: -0.42, high: 149.10, low: 147.20, volume: 6_340_100,  marketCap: 3.57e11, sparkline: [149,149,148,149,148,148,148] },
}

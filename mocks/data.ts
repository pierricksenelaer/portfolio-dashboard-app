import { Asset, Position } from '../src/types/api';

const assets: Asset[] = [
  { id: 'a1', name: 'APPL', type: 'stock', assetClass: 'Equity' },
  { id: 'a2', name: 'TSLA', type: 'stock', assetClass: 'Equity' },
  { id: 'a3', name: 'BTC', type: 'crypto', assetClass: 'Cryptocurrency' },
  { id: 'a4', name: 'ETH', type: 'crypto', assetClass: 'Cryptocurrency' },
  { id: 'a5', name: 'GBP', type: 'fiat', assetClass: 'Currency' },
];

const currentPortfolio: Position[] = [
  { id: 101, asset: 'a1', quantity: 50, asOf: new Date().toISOString() }, // 50 shares of APPL
  { id: 102, asset: 'a3', quantity: 1.5, asOf: new Date().toISOString() }, // 1.5 BTC
  { id: 103, asset: 'a5', quantity: 10000, asOf: new Date().toISOString() }, // 10,000 GBP cash
];

// Historical prices for BTC for the past 5 days (for Historical Chart)
const historicalPrices = [
    { asset: 'BTC', price: 40000, asOf: '2025-11-14' },
    { asset: 'BTC', price: 41000, asOf: '2025-11-15' },
    { asset: 'BTC', price: 40500, asOf: '2025-11-16' },
    { asset: 'BTC', price: 42000, asOf: '2025-11-17' },
    { asset: 'BTC', price: 43000, asOf: '2025-11-18' }, // Today's price
];

// Current prices for all assets
const currentPrices = [
    { asset: 'APPL', price: 185.50, asOf: new Date().toISOString() },
    { asset: 'TSLA', price: 230.10, asOf: new Date().toISOString() },
    { asset: 'BTC', price: 43000.00, asOf: new Date().toISOString() },
    { asset: 'ETH', price: 2500.00, asOf: new Date().toISOString() },
    { asset: 'GBP', price: 1.25, asOf: new Date().toISOString() }, // GBP price in USD
];

export { assets, currentPortfolio, historicalPrices, currentPrices };
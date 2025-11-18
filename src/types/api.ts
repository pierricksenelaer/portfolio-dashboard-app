export type AssetType = 'stock' | 'crypto' | 'fiat';

export interface Asset {
  id: string; // uuid
  name: string; // e.g., 'APPL', 'BTC', 'GBP'
  type: AssetType;
  assetClass: 'Equity' | 'Currency' | 'Commodity' | 'Cryptocurrency'; // Added for donut chart breakdown
}

export interface Price {
  id: string; // uuid
  asset: string; // e.g., 'APPL'
  price: number; // In USD, e.g., 290.32
  asOf: string; // date-time, for historical data
}

export interface Position {
  id: number; // int64
  asset: string; // uuid/Asset ID
  quantity: number; // int32
  asOf: string; // date-time

}

export interface Portfolio {
  id: string; // uuid
  asOf: string; // date-time
  positions: Position[];
}
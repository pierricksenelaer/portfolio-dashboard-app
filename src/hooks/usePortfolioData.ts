// src/hooks/usePortfolioData.ts
import { useQuery } from '@tanstack/react-query';
import { 
  fetchAssets, 
  fetchPortfolio, 
  fetchPrices 
} from '@/lib/api';
import { Asset } from '@/types/api';

const QUERY_KEYS = {
  assets: ['assets'],
  portfolio: (asOf?: string) => ['portfolio', asOf],
  prices: (assetIds: string[], asOf?: string) => ['prices', assetIds, asOf],
  historicalPrices: (assets: string[], from: string, to: string) => ['historicalPrices', assets, from, to]
};

// --- Core Data Fetching Hooks ---

export const useAssets = () => {
  return useQuery({
    queryKey: QUERY_KEYS.assets,
    queryFn: fetchAssets,
    staleTime: Infinity, // Assets rarely change, so cache indefinitely
  });
};

export const usePortfolio = (asOf?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.portfolio(asOf),
    queryFn: () => fetchPortfolio(asOf),
    // Portfolio is highly time-sensitive, so shorter stale time is used
    staleTime: 1000 * 30, // 30 seconds
  });
};

// --- Combined and Derived Data Hooks ---

/**
 * Fetches assets and the current portfolio, then we combine them to calculate market value.
 */
export const usePortfolioMarketValue = () => {
  const { data: assets, isLoading: isLoadingAssets, isError: isErrorAssets } = useAssets();
  const { data: portfolio, isLoading: isLoadingPortfolio, isError: isErrorPortfolio } = usePortfolio();

  // Get a list of all unique asset IDs currently held
  const assetIds = portfolio?.positions.map(p => p.asset) ?? [];
  
  // Fetch the current price for all held assets
  const { 
    data: currentPrices, 
    isLoading: isLoadingPrices, 
    isError: isErrorPrices 
  } = useQuery({
    queryKey: QUERY_KEYS.prices(assetIds),
    queryFn: () => fetchPrices(assetIds),
    // Only fetch prices if the portfolio and assets are loaded
    enabled: !!assets && !!portfolio, 
    staleTime: 1000 * 15, // Prices are very volatile
  });

  const isLoading = isLoadingAssets || isLoadingPortfolio || isLoadingPrices;
  const isError = isErrorAssets || isErrorPortfolio || isErrorPrices;

  // Process the data into a structure suitable for the Donut Chart and Positions Table
  const portfolioData = (portfolio?.positions || []).map(position => {
    const assetDetail = assets?.find(a => a.id === position.asset);
    const priceDetail = currentPrices?.find(p => p.asset === assetDetail?.name);
    
    // Calculate Market Value (MV)
    const marketValue = (position.quantity ?? 0) * (priceDetail?.price ?? 0);

    return {
      assetId: position.asset,
      name: assetDetail?.name || 'Unknown',
      assetClass: assetDetail?.assetClass || 'Other',
      quantity: position.quantity,
      price: priceDetail?.price || 0,
      marketValue: marketValue,
    };
  });

  // Calculate the total portfolio value
  const totalValue = portfolioData.reduce((sum, item) => sum + item.marketValue, 0);

  return {
    data: portfolioData,
    totalValue,
    isLoading,
    isError,
  };
};

/**
 * Fetches historical price data for a single asset or the entire portfolio.
 * For now, we only fetch mock historical data.
 */
export const useHistoricalPortfolioValue = (from: string, to: string) => {
  // We hardcode assets=[] here because the mock data is assumed to be the total portfolio value over time
  // Note: In a real app, fetch prices for ALL assets at each date, then we sum them up
  return useQuery({
    queryKey: QUERY_KEYS.historicalPrices([], from, to),
    queryFn: () => fetchPrices([], from, to),
    // Recharts expects an array of {date, value}
  });
};
import { Asset, Portfolio, Price } from '@/types/api';

const BASE_URL = ''; // empty string since MSW intercepts local paths

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  return response.json();
};

export const fetchAssets = async (): Promise<Asset[]> => {
  const response = await fetch(`${BASE_URL}/assets`);
  return handleResponse<Asset[]>(response);
};

export const fetchPortfolio = async (asOf?: string): Promise<Portfolio> => {
  const url = new URL(`${BASE_URL}/portfolios`, window.location.origin);
  if (asOf) {
    url.searchParams.append('asOf', asOf);
  }
  const response = await fetch(url.toString());
  return handleResponse<Portfolio>(response);
};

export const fetchPrices = async (assets: string[], asOf?: string, from?: string, to?: string): Promise<Price[]> => {
  const url = new URL(`${BASE_URL}/prices`, window.location.origin);
  if (assets.length > 0) {
    url.searchParams.append('assets', assets.join(','));
  }
  if (asOf) url.searchParams.append('asOf', asOf);
  if (from) url.searchParams.append('from', from);
  if (to) url.searchParams.append('to', to);
  
  const response = await fetch(url.toString());
  return handleResponse<Price[]>(response);
};
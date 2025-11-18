import { http, HttpResponse } from 'msw';
import { assets, currentPrices, currentPortfolio, historicalPrices } from './data';
import { Portfolio, Price } from '../src/types/api';

export const handlers = [
  // 1. GET /assets
  http.get('/assets', () => {
    return HttpResponse.json(assets);
  }),

  // 2. GET /prices
  http.get('/prices', ({ request }) => {
    const url = new URL(request.url);
    const asOf = url.searchParams.get('asOf');
    const from = url.searchParams.get('from');

    // If 'from' is present, return historical data (for the chart)
    if (from) {
        return HttpResponse.json(historicalPrices);
    }
    
    // Default: Return current prices
    return HttpResponse.json(currentPrices);
  }),

  // 3. GET /portfolios
  http.get('/portfolios', () => {
    const portfolio: Portfolio = {
        id: 'portfolio-123',
        asOf: new Date().toISOString(),
        positions: currentPortfolio,
    };
    return HttpResponse.json(portfolio);
  }),
];
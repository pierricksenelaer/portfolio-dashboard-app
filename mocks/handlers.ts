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
    const from = url.searchParams.get('from');

    if (from) {
        // Convert the string 'from' date to a Date object for comparison
        const fromDate = new Date(from);
        
        // Filter the historical data array
        const filteredPrices = historicalPrices.filter(priceEntry => {
            const entryDate = new Date(priceEntry.asOf);
            // Include entry if its date is greater than or equal to the 'from' date
            return entryDate.getTime() >= fromDate.getTime(); 
        });

        console.log(`Filtering from: ${fromDate.toISOString()}, Results: ${filteredPrices.length}`);
        
        return HttpResponse.json(filteredPrices);
    }
    
    // Default: Return current prices for non-historical requests
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
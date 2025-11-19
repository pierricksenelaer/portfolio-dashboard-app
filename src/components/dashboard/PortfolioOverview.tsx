'use client';

import React, { useState, useMemo } from 'react';
import { usePortfolioMarketValue } from '@/hooks/usePortfolioData';
import DonutChart from '@/components/charts/DonutChart';
import PositionsTable from '@/components/dashboard/PositionsTable';
//import { Button } from '../common/Button'; // Assuming a simple Button component exists

type ViewType = 'asset' | 'class';

export default function PortfolioOverview() {
  const { data, totalValue, isLoading, isError } = usePortfolioMarketValue();
  const [view, setView] = useState<ViewType>('asset');

  // Logic to transform the detailed portfolio data based on the selected view
  const chartData = useMemo(() => {
    if (!data) return [];

    if (view === 'asset') {
      // Group by individual asset name (e.g., APPL, BTC)
      return data.map(item => ({
        name: item.name,
        value: item.marketValue,
      })).filter(item => item.value > 0);
    } 
    
    // Group by asset class (e.g., Equity, Cryptocurrency)
    const classMap = data.reduce((acc, item) => {
      const key = item.assetClass;
      acc[key] = (acc[key] || 0) + item.marketValue;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(classMap).map(([name, value]) => ({
      name,
      value,
    })).filter(item => item.value > 0);
  }, [data, view]);

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading portfolio data...</div>;
  }

  if (isError) {
    return <div className="p-8 text-center text-red-500">Error loading portfolio. Please check API status.</div>;
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold dark:text-white">Portfolio Balance: {formatter.format(totalValue)}</h2>
        
        {/* Toggle Buttons */}
        <div className="flex space-x-2">
          {/* <Button 
            onClick={() => setView('asset')}
            variant={view === 'asset' ? 'primary' : 'outline'}
          >
            By Asset
          </Button> */}
          <button onClick={() => setView('asset')}>
            By Asset
          </button>
          {/* <Button 
            onClick={() => setView('class')}
            variant={view === 'class' ? 'primary' : 'outline'}
          >
            By Asset Class
          </Button> */}
          <button onClick={() => setView('class')}>
            By Asset Class 
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <DonutChart data={chartData} totalValue={totalValue} />
        </div>
        
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto">
          <h3 className="text-lg font-medium mb-4 dark:text-white">Positions Breakdown</h3>
          <PositionsTable data={data} totalValue={totalValue} />
        </div>
      </div>
    </div>
  );
}
'use client';

import React, { useState, useMemo } from 'react';
import { useHistoricalPortfolioValue } from '@/hooks/usePortfolioData';
import HistoricalChart from '@/components/charts/HistoricalChart';
import { Button } from '@/components/global/Button';

type TimePeriod = '7d' | '30d' | '90d' | '1y';

const periodDays: Record<TimePeriod, number> = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
  '1y': 365,
};

// Simple utility to calculate dates
const getDateXDaysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
};

export default function HistoricalPortfolioView() {
  const [period, setPeriod] = useState<TimePeriod>('30d');
  
  // Calculate `from` and `to` dates based on the selected period
  const { from, to } = useMemo(() => {
    const days = periodDays[period];
    // NOTE: MSW is mocked to return the same 5 data points regardless of this range for simplicity
    // In a real API, these parameters would correctly filter the data.
    return {
      from: getDateXDaysAgo(days),
      to: getDateXDaysAgo(0), // Today
    };
  }, [period]);

  // Fetch historical data
  const { data: historicalDataPrices, isLoading, isError } = useHistoricalPortfolioValue(from, to);

  const chartData = useMemo(() => {
    if (!historicalDataPrices) return [];
    
    return historicalDataPrices.map(item => ({
      // Map the 'asOf' date (YYYY-MM-DD format) to the 'name' property for Recharts X-Axis
      name: item.asOf.split('T')[0], 
      // Map the 'price' to the 'price' property (already correct, but explicitly mapping)
      price: item.price,
    }));
  }, [historicalDataPrices]);

  if (isError) {
    return <div className="p-4 text-center text-red-500">Error loading historical data.</div>;
  }

  // The mock data structure (Price[]) is used directly by the chart
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold dark:text-white">Portfolio Performance</h2>
        
        {/* Time Period Selector Buttons */}
        <div className="flex space-x-2">
          {Object.keys(periodDays).map((key) => (
            <Button 
              key={key}
              onClick={() => setPeriod(key as TimePeriod)}
              variant={period === key ? 'primary' : 'outline'}
              className="px-3 py-1 text-sm"
            >
              {key}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="h-80 flex items-center justify-center text-gray-500">Loading chart...</div>
      ) : (
        <HistoricalChart data={chartData} />
      )}
    </div>
  );
}
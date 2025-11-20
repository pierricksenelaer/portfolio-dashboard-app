import React from 'react';

// Define the shape of the processed data from usePortfolioMarketValue
interface PositionData {
  name: string;
  assetClass: string;
  quantity: number;
  price: number;
  marketValue: number;
}

interface PositionsTableProps {
  data: PositionData[];
  totalValue: number;
}

export default function PositionsTable({ data, totalValue }: PositionsTableProps) {
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  
  // Sort data by market value descending
  const sortedData = [...data].sort((a, b) => b.marketValue - a.marketValue);

  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Asset
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Class
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Quantity
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Price (USD)
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Market Value
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            % of Total
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
        {sortedData.map((item, index) => {
          const percentage = totalValue > 0 ? (item.marketValue / totalValue) * 100 : 0;
          return (
            <tr key={index}>
              <td 
                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-theme-primary-600 dark:text-theme-primary-500"
              >
                {item.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {item.assetClass}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-400">
                {item.quantity.toFixed(4)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-400">
                {formatter.format(item.price)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900 dark:text-white">
                {formatter.format(item.marketValue)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-400">
                {percentage.toFixed(2)}%
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
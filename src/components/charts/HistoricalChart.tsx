import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface HistoricalDataItem {
  // name here refers to the date (asOf)
  name: string; 
  // price here refers to the total portfolio value at that date
  price: number;
}

interface HistoricalChartProps {
  data: HistoricalDataItem[];
}

// Custom Tooltip for better formatting
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    
    return (
      <div className="p-2 bg-white border border-gray-200 shadow-md dark:bg-gray-700 dark:border-gray-600 rounded-md">
        <p className="font-semibold dark:text-white">Date: {label}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">Value: {formatter.format(value)}</p>
      </div>
    );
  }
  return null;
};

// Custom Y-Axis Tick Formatter
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD', 
    notation: 'compact', 
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(value);
};


export default function HistoricalChart({ data }: HistoricalChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
          
          <XAxis 
            dataKey="name" 
            tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            stroke="#6b7280" // Tailwind gray-500
          />
          
          <YAxis 
            tickFormatter={formatCurrency} 
            domain={['auto', 'auto']}
            stroke="#6b7280" // Tailwind gray-500
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#3b82f6" // Tailwind blue-500
            fill="#3b82f6" 
            fillOpacity={0.3}
            name="Portfolio Value"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
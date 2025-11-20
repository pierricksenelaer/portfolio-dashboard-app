import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface ChartDataItem {
  name: string;
  value: number;
}

interface DonutChartProps {
  data: ChartDataItem[];
  totalValue: number;
}

// These are hardcoded hex colors that map to the new theme primary color,
// or a selection of other distinct colors to ensure visibility.
// For demonstration, we mix theme-primary with a couple of neutral/secondary colors.
const THEME_COLORS = [
  '#3b82f6', // theme-primary-500 equivalent (Blue)
  '#22c55e', // secondary color (Green)
  '#ef4444', // destructive color (Red)
  '#f59e0b', // warning color (Yellow)
  '#8b5cf6', // tertiary color (Violet)
  '#ec4899', // alternative color (Pink)
];

// Custom Tooltip for displaying Name and Value
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const value = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(item.value);
    const percent = ((item.value / item.totalValue) * 100).toFixed(2);
    
    return (
      <div className="p-2 bg-white border border-gray-200 shadow-md dark:bg-gray-700 dark:border-gray-600 rounded-md">
        <p className="font-semibold dark:text-white">{`${item.name}`}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">{`${value} (${percent}%)`}</p>
      </div>
    );
  }
  return null;
};

export default function DonutChart({ data, totalValue }: DonutChartProps) {
  // Add totalValue to each item for percentage calculation in tooltip
  const dataWithTotal = data.map(item => ({ ...item, totalValue }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dataWithTotal}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            labelLine={false}
          >
            {dataWithTotal.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={THEME_COLORS[index % THEME_COLORS.length]} 
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          
          {/* Center Text for Total Value */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-lg font-bold dark:text-white"
          >
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            }).format(totalValue)}
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
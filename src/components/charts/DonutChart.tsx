import React, { useState, useEffect } from 'react';
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

// Define the color string using the CSS variable
const PRIMARY_THEME_COLOR = 'rgb(var(--color-primary-500))';

// Secondary colors are kept fixed (Green, Red, etc.) as they are distinct for data visualization
const SECONDARY_COLORS = [
  '#22c55e', // Green
  '#ef4444', // Red
  '#f59e0b', // Yellow
  '#8b5cf6', // Violet
  '#ec4899', // Pink
];

// The final array starts with the primary theme color
const THEME_COLORS = [PRIMARY_THEME_COLOR, ...SECONDARY_COLORS]

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

  const [textColor, setTextColor] = useState('black'); // Safe initial value

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const foregroundColor = rootStyles.getPropertyValue('--foreground').trim();
    
    if (foregroundColor) {
      if (foregroundColor.includes(' ')) {
        setTextColor(`rgb(${foregroundColor})`);
      } else {
        setTextColor(foregroundColor);
      }
    }
  }, []);

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dataWithTotal}
            cx="50%"
            cy="50%"
            innerRadius={110}
            outerRadius={140}
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
            className="text-2xl font-bold"
            fill={textColor}
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
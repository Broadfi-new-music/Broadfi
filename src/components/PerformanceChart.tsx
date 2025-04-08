import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { useStaking } from "../context/StakingContext";

type TimeRange = "1w" | "1m" | "3m" | "1y" | "all";

const PerformanceChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("1m");
  const [chartData, setChartData] = useState<any[]>([]);
  const { positions } = useStaking();
  
  // Generate mock data for chart
  useEffect(() => {
    const generateData = () => {
      const data = [];
      const now = new Date();
      let days = 0;
      
      switch (timeRange) {
        case "1w": days = 7; break;
        case "1m": days = 30; break;
        case "3m": days = 90; break;
        case "1y": days = 365; break;
        case "all": days = 365; break; // Just using a year for "all" in our demo
      }
      
      let baseValue = 1000;
      
      for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(now.getDate() - i);
        
        // Add some randomness but with an upward trend
        const positiveVariance = Math.random() * 5;
        baseValue = Math.max(baseValue + (Math.random() > 0.3 ? positiveVariance : -positiveVariance * 0.5), 800);
        
        data.push({
          date: date.toISOString().split('T')[0],
          value: parseFloat(baseValue.toFixed(2)),
        });
      }
      
      return data;
    };
    
    setChartData(generateData());
  }, [timeRange, positions]);
  
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-2 shadow-sm">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-sm font-medium">{payload[0].value} BRD</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Performance</h3>
        <div className="flex space-x-1">
          {(["1w", "1m", "3m", "1y", "all"] as TimeRange[]).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "secondary" : "ghost"}
              size="sm"
              className="h-7 text-xs"
              onClick={() => setTimeRange(range)}
            >
              {range.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0066FF" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#0066FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              minTickGap={30}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              domain={['dataMin - 100', 'dataMax + 100']}
              tickFormatter={(value) => `${value}`}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#0066FF" 
              fill="url(#gradientArea)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;

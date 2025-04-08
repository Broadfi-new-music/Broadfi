import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
  date: string;
  tokens: number;
}

interface EarningsChartProps {
  data: DataPoint[];
  title: string;
  height?: number;
}

export function EarningsChart({ data, title, height = 300 }: EarningsChartProps) {
  return (
    <div className="glass-card p-4 rounded-lg">
      <h3 className="text-sm font-medium mb-4 text-white/70">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
          />
          <YAxis 
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
            tickFormatter={(value) => `${value} BRD`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(30, 30, 36, 0.9)',
              borderColor: 'rgba(255,255,255,0.1)',
              borderRadius: '6px',
              color: 'white'
            }}
            labelStyle={{ fontWeight: 'bold', marginBottom: '5px' }}
            formatter={(value) => [`${value} BRD`, 'Earnings']}
          />
          <Area 
            type="monotone" 
            dataKey="tokens" 
            stroke="#8B5CF6" 
            fillOpacity={1} 
            fill="url(#colorTokens)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CalculationResult } from '../types';

interface DashboardProps {
  data: CalculationResult;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl z-50">
        <p className="font-medium text-slate-100">{payload[0].name}</p>
        <p className="text-brand-400 font-bold">{payload[0].value.toFixed(1)} GB</p>
      </div>
    );
  }
  return null;
};

// Custom label render function for clearer visibility
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }: any) => {
  const RADIAN = Math.PI / 180;
  // Increase radius for the label position so it sits outside
  const radius = outerRadius + 20;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  return (
    <text 
      x={x} 
      y={y} 
      fill="#cbd5e1" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize="11"
      className="font-medium"
    >
      {`${name} (${(percent * 100).toFixed(1)}%)`}
    </text>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const chartData = data.breakdown.filter(item => item.value > 0);
  const totalGB = data.totalMonthlyGB;
  const totalKWh = data.totalMonthlyKWh;
  
  // Scale max value for bar chart: use larger of user total or default 600, plus buffer
  const maxScale = Math.max(totalGB, 600) * 1.1;
  const userPercent = Math.min((totalGB / maxScale) * 100, 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Total Card */}
      <div className="col-span-1 lg:col-span-2 bg-gradient-to-r from-brand-900 to-slate-900 rounded-2xl p-6 border border-brand-800 relative overflow-visible">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none overflow-hidden"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-6">
             
             {/* Energy Impact (Dominant/Left) */}
             <div className="flex-1">
                <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Energy Impact</h2>
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl md:text-6xl font-bold text-yellow-400">{totalKWh.toFixed(0)}</span>
                    <span className="text-xl text-yellow-200">kWh</span>
                </div>
            </div>

            {/* Estimated Usage (Right) */}
            <div className="flex-1 flex flex-col items-start border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-8 w-full">
               <div className="flex justify-between items-start w-full">
                 <div>
                    <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Estimated Monthly Usage</h2>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl md:text-4xl font-bold text-white">{totalGB.toFixed(0)}</span>
                        <span className="text-lg text-brand-300">GB</span>
                    </div>
                 </div>
               </div>
            </div>
          </div>
          
           {/* Visual Bar Indicator */}
           <div className="w-full mt-4">
             <div className="relative w-full h-6 bg-slate-800 rounded-full mt-6">
                {/* User Bar */}
                <div 
                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out z-10 bg-brand-500"
                  style={{ width: `${userPercent}%` }}
                ></div>
             </div>
             <div className="flex justify-between text-xs text-slate-500 mt-2">
               <span>0 GB</span>
               <span>{maxScale.toFixed(0)} GB Scale</span>
             </div>
           </div>
        </div>
      </div>

      {/* Breakdown Pie Chart */}
      <div className="col-span-1 lg:col-span-2 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 min-h-[450px] flex flex-col">
        <h3 className="text-lg font-semibold text-white mb-4">Usage Breakdown</h3>
        {chartData.length > 0 ? (
          <div className="flex-1 w-full h-full min-h-[350px]">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={90} 
                  outerRadius={140} 
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                  label={renderCustomizedLabel}
                  labelLine={{ stroke: '#64748b', strokeWidth: 1 }}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500">
            Add activity to see breakdown
          </div>
        )}
      </div>
    </div>
  );
};
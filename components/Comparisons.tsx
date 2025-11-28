import React from 'react';
import { 
  CO2_PER_KWH, 
  GAS_CAR_CO2_PER_MILE, 
  SMARTPHONE_CHARGE_ENERGY, 
  LAUNDRY_KWH 
} from '../constants';

interface ComparisonsProps {
  totalKWh: number;
}

export const Comparisons: React.FC<ComparisonsProps> = ({ totalKWh }) => {
  // Calculate impacts
  const totalCO2Kg = totalKWh * CO2_PER_KWH;
  
  const milesDriven = totalCO2Kg / GAS_CAR_CO2_PER_MILE;
  const laundryLoads = totalKWh / LAUNDRY_KWH;
  const phoneCharges = totalKWh / SMARTPHONE_CHARGE_ENERGY;

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">Real-World Comparisons</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Transport Industry Comparison */}
        <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 flex flex-col items-center text-center group hover:border-brand-500/30 transition-colors">
          <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
            🚗
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Transportation</div>
          <div className="text-slate-300 text-sm mb-2">Equivalent to driving</div>
          <div className="text-2xl font-bold text-white mb-1">
            {milesDriven.toFixed(1)} <span className="text-sm font-normal text-slate-400">miles</span>
          </div>
          <div className="text-xs text-slate-500">in a standard gas car</div>
        </div>

        {/* Laundry Comparison */}
        <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 flex flex-col items-center text-center group hover:border-brand-500/30 transition-colors">
           <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
            🧺
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Household</div>
          <div className="text-slate-300 text-sm mb-2">Energy to power</div>
          <div className="text-2xl font-bold text-white mb-1">
            {laundryLoads.toFixed(1)} <span className="text-sm font-normal text-slate-400">loads</span>
          </div>
          <div className="text-xs text-slate-500">of laundry</div>
        </div>

        {/* Consumer Electronics Comparison */}
        <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 flex flex-col items-center text-center group hover:border-brand-500/30 transition-colors">
           <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
            📱
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Electronics</div>
          <div className="text-slate-300 text-sm mb-2">Energy to charge</div>
          <div className="text-2xl font-bold text-white mb-1">
            {Math.floor(phoneCharges).toLocaleString()} <span className="text-sm font-normal text-slate-400">phones</span>
          </div>
          <div className="text-xs text-slate-500">from 0% to 100%</div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
         <p className="text-xs text-slate-500 italic">
           *Estimates based on your calculated monthly energy usage of <span className="text-brand-400">{totalKWh.toFixed(1)} kWh</span>.
         </p>
      </div>
    </div>
  );
};
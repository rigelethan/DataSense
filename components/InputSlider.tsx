import React from 'react';
import { ActivityInput, ActivityType } from '../types';

interface InputSliderProps {
  activity: ActivityInput;
  onChange: (id: string, newValue: number) => void;
}

export const InputSlider: React.FC<InputSliderProps> = ({ activity, onChange }) => {
  // Determine max value based on unit and specific activity type
  let max = 168; // Default max for hours/week (24 * 7)
  let step = 1;

  if (activity.unit.includes('prompts')) {
    max = 2000; // Increased limit for AI Text
    step = 50;
  } else if (activity.unit.includes('images')) {
    max = 500; // Increased limit for AI Images
    step = 10;
  } else if (activity.unit.includes('videos')) {
    max = 200; // Increased limit for AI Video
    step = 5;
  } else {
    // For all hour-based activities, max is total hours in a week
    max = 168;
    step = 1;
  }

  return (
    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-brand-500 transition-colors duration-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label={activity.label}>{activity.icon}</span>
          <div>
            <h3 className="font-medium text-slate-200 text-sm md:text-base">{activity.label}</h3>
            <p className="text-xs text-slate-400">Estimated {activity.multiplierMB} MB / unit</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xl font-bold text-brand-400">{activity.value}</span>
          <span className="text-xs text-slate-500 ml-1">{activity.unit.split('/')[0]}/wk</span>
        </div>
      </div>
      
      <input
        type="range"
        min="0"
        max={max}
        step={step}
        value={activity.value}
        onChange={(e) => onChange(activity.id, parseFloat(e.target.value))}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500 hover:accent-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
      />
      <div className="flex justify-between text-xs text-slate-500 mt-2">
        <span>0</span>
        <span>{Math.round(max / 2)}</span>
        <span>{max}+</span>
      </div>
    </div>
  );
};
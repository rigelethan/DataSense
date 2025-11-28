import React from 'react';
import { GeminiAnalysisResult } from '../types';

interface GeminiReportProps {
  analysis: GeminiAnalysisResult | null;
  loading: boolean;
  onAnalyze: () => void;
  hasData: boolean;
}

export const GeminiReport: React.FC<GeminiReportProps> = ({ analysis, loading, onAnalyze, hasData }) => {
  if (!analysis) {
    return (
      <div className="mt-8 text-center p-8 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
        <div className="mb-4">
          <span className="text-4xl">⚡</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Analyze Your Impact</h3>
        <p className="text-slate-400 mb-6 max-w-md mx-auto">
          Use Google's Gemini AI to find your global usage percentile and get specific strategies to reduce your digital carbon footprint.
        </p>
        <button
          onClick={onAnalyze}
          disabled={loading || !hasData}
          className={`px-8 py-3 rounded-full font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/20 ${
            loading 
              ? 'bg-slate-700 cursor-wait' 
              : !hasData 
                ? 'bg-slate-700 opacity-50 cursor-not-allowed' 
                : 'bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500'
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Impact...
            </span>
          ) : (
            "Analyze Results"
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-slate-800 rounded-2xl border border-brand-500/30 overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-r from-brand-900 to-accent-900 p-6 border-b border-white/10">
        <div className="flex flex-col items-center text-center">
            <div className="text-sm text-brand-300 uppercase tracking-wider mb-2">Global Standing</div>
            <div className="text-5xl font-bold text-white mb-1">{analysis.percentile}<span className="text-2xl align-top text-brand-400">%</span></div>
            <div className="text-sm text-slate-300">You use more data than <br/> {analysis.percentile}% of users globally.</div>
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Ways to Reduce Your Usage</h4>
        <div className="space-y-4">
          {analysis.reductionStrategies.map((strategy, idx) => (
            <div key={idx} className="bg-slate-700/50 p-4 rounded-xl border border-slate-600 flex gap-4 items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 font-bold text-xs border border-green-500/30 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-slate-200 text-sm leading-relaxed break-words">{strategy}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button 
             onClick={onAnalyze} 
             className="text-xs text-brand-400 hover:text-brand-300 underline"
          >
            Refresh Analysis
          </button>
        </div>
      </div>
    </div>
  );
};
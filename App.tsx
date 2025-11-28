import React, { useState, useEffect, useMemo } from 'react';
import { DEFAULT_ACTIVITIES, WEEKS_PER_MONTH, KWH_PER_GB, DATA_SOURCES, DID_YOU_KNOW_FACTS } from './constants';
import { ActivityInput, CalculationResult, GeminiAnalysisResult } from './types';
import { InputSlider } from './components/InputSlider';
import { Dashboard } from './components/Dashboard';
import { GeminiReport } from './components/GeminiReport';
import { Comparisons } from './components/Comparisons';
import { analyzeDataUsage } from './services/geminiService';

const App: React.FC = () => {
  const [activities, setActivities] = useState<ActivityInput[]>(DEFAULT_ACTIVITIES);
  const [analysis, setAnalysis] = useState<GeminiAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [randomFact, setRandomFact] = useState<string>("");

  // Select a random fact on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * DID_YOU_KNOW_FACTS.length);
    setRandomFact(DID_YOU_KNOW_FACTS[randomIndex]);
  }, []);
  
  // Calculate totals whenever inputs change
  const results: CalculationResult = useMemo(() => {
    let totalMonthlyGB = 0;
    const breakdown = activities.map(activity => {
      // Inputs are standardized to Weekly frequency
      const monthlyUnits = activity.value * WEEKS_PER_MONTH;
      
      const monthlyMB = monthlyUnits * activity.multiplierMB;
      const monthlyGB = monthlyMB / 1024;
      
      totalMonthlyGB += monthlyGB;
      
      return {
        name: activity.label,
        value: monthlyGB,
        color: activity.color
      };
    });

    const totalMonthlyKWh = totalMonthlyGB * KWH_PER_GB;

    return {
      totalMonthlyGB,
      totalMonthlyKWh,
      breakdown
    };
  }, [activities]);

  const handleActivityChange = (id: string, newValue: number) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, value: newValue } : a));
  };

  const handleAnalyze = async () => {
    if (results.totalMonthlyGB <= 0) return;
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeDataUsage(results);
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-brand-500 to-accent-500 rounded-lg flex items-center justify-center text-white font-bold">
              DS
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-white">
              DataSense
            </h1>
          </div>
          <div className="text-xs text-slate-500 hidden sm:block">
            Powered by Gemini
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Data Usage Calculator</h2>
          <p className="text-slate-400">
            Plug in your weekly habits to see your monthly digital footprint.
          </p>
        </div>

        {/* Top Section: Dashboard Visualization */}
        <Dashboard 
           data={results} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4 px-1">Your Weekly Activities</h3>
            <div className="grid gap-4 sm:grid-cols-2">
               {activities.map(activity => (
                 <InputSlider 
                   key={activity.id} 
                   activity={activity} 
                   onChange={handleActivityChange} 
                 />
               ))}
            </div>
          </div>

          {/* Right Column: AI Analysis */}
          <div className="lg:col-span-1">
             <div className="sticky top-24">
                <GeminiReport 
                  analysis={analysis} 
                  loading={isAnalyzing} 
                  onAnalyze={handleAnalyze}
                  hasData={results.totalMonthlyGB > 0}
                />
                
                {/* Contextual Facts */}
                {!analysis && (
                  <div className="mt-6 p-4 rounded-xl bg-slate-800/30 border border-slate-800 text-sm text-slate-500">
                    <p className="mb-2"><strong className="text-slate-400">Did you know?</strong></p>
                    <p className="italic text-slate-400">
                      "{randomFact}"
                    </p>
                  </div>
                )}
             </div>
          </div>
        </div>
        
        {/* Industry Comparisons Section */}
        <Comparisons totalKWh={results.totalMonthlyKWh} />

        {/* What is DataSense? Section */}
        <div className="mb-12 bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
          <h3 className="text-xl font-bold text-white mb-3">What is DataSense?</h3>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="text-slate-300 leading-relaxed mb-4">
                DataSense is a <strong>digital footprint calculator</strong> designed to visualize the invisible weight of your online life. 
                While we often think of the cloud as ethereal, every video watched, AI image generated, and hour streamed consumes real data and energy.
              </p>
              <p className="text-slate-300 leading-relaxed">
                We help you translate "hours online" into <strong>Gigabytes (GB)</strong> and <strong>Kilowatt-hours (kWh)</strong>, 
                giving you a tangible metric for your digital consumption.
              </p>
            </div>
            <div className="flex-1 bg-slate-900/50 p-6 rounded-xl border border-slate-800 flex items-center justify-center">
               <p className="text-center text-slate-400 font-medium">
                 DataSense promotes Sustainability, Awareness, and Energy Efficiency.
               </p>
            </div>
          </div>
        </div>

        {/* Methodology & Sources Section */}
        <div className="border-t border-slate-800 pt-8 mt-12 mb-8">
          <h3 className="text-lg font-semibold text-slate-300 mb-4">Methodology & Sources</h3>
          <p className="text-sm text-slate-400 mb-6">
            Our calculator uses average estimates for data consumption based on standard high-quality settings. 
            Inputs are summed weekly and multiplied by {WEEKS_PER_MONTH} to estimate monthly totals.
            Energy calculations are approximate ({KWH_PER_GB} kWh/GB) and represent the energy used for data transmission and data center processing, not the energy of your personal device.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {DATA_SOURCES.map((source, index) => (
              <a 
                key={index} 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-brand-500/50 hover:bg-slate-800/80 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-brand-400 uppercase mb-1">{source.category}</div>
                  <div className="text-sm text-slate-200 font-medium mb-1 group-hover:text-white transition-colors">{source.statistic}</div>
                </div>
                <div 
                  className="text-xs text-slate-500 group-hover:text-brand-300 flex items-center gap-1 mt-3 transition-colors"
                >
                  Source: {source.sourceName}
                  <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
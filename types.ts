export enum ActivityType {
  SOCIAL_VIDEO = 'SOCIAL_VIDEO', // Reels, TikTok
  STREAMING_HD = 'STREAMING_HD', // Netflix, YouTube
  STREAMING_AUDIO = 'STREAMING_AUDIO', // Spotify
  GAMING = 'GAMING', // Online gaming
  VIDEO_CALLS = 'VIDEO_CALLS', // Zoom, Meet
  AI_TEXT = 'AI_TEXT', // LLM Chat
  AI_IMAGE = 'AI_IMAGE', // Image Gen
  AI_VIDEO = 'AI_VIDEO', // Video Gen
}

export interface ActivityInput {
  id: ActivityType;
  label: string;
  unit: string; // e.g., "hours/week", "count/week"
  value: number;
  multiplierMB: number; // MB per unit
  icon: string;
  color: string;
}

export interface CalculationResult {
  totalMonthlyGB: number;
  totalMonthlyKWh: number; // Added energy metric
  breakdown: {
    name: string;
    value: number; // GB
    color: string;
  }[];
}

export interface GeminiAnalysisResult {
  percentile: number;
  reductionStrategies: string[]; // Changed from tips to specific strategies
}

export interface DataSource {
  category: string;
  statistic: string;
  sourceName: string;
  url: string;
}
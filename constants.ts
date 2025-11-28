import { ActivityType, ActivityInput, DataSource } from './types';

// Multipliers are approximate MB usage per unit (per week inputs)
export const DEFAULT_ACTIVITIES: ActivityInput[] = [
  {
    id: ActivityType.SOCIAL_VIDEO,
    label: 'Insta Reels/TikTok',
    unit: 'hours/week',
    value: 7, // Avg ~1 hr/day
    multiplierMB: 840, // ~840MB per hour (WhistleOut)
    icon: '📱',
    color: '#E1306C' // Instagram-ish
  },
  {
    id: ActivityType.STREAMING_HD,
    label: 'Video/TV Streaming',
    unit: 'hours/week',
    value: 7, // Avg ~1 hr/day
    multiplierMB: 3000, // ~3GB per hour for HD
    icon: '🎬',
    color: '#E50914' // Netflix Red
  },
  {
    id: ActivityType.STREAMING_AUDIO,
    label: 'Music Streaming',
    unit: 'hours/week',
    value: 14, // Avg ~2 hr/day
    multiplierMB: 144, // ~144MB per hour (Very High Quality)
    icon: '🎵',
    color: '#1DB954' // Spotify Green
  },
  {
    id: ActivityType.GAMING,
    label: 'Online Gaming',
    unit: 'hours/week',
    value: 2,
    multiplierMB: 200, // ~40-300MB avg
    icon: '🎮',
    color: '#9333EA' // Purple
  },
  {
    id: ActivityType.VIDEO_CALLS,
    label: 'Video Calls',
    unit: 'hours/week',
    value: 3,
    multiplierMB: 1200, // ~1.2GB per hour (Zoom HD)
    icon: '📹',
    color: '#2563EB' // Blue
  },
  {
    id: ActivityType.AI_TEXT,
    label: 'AI Text Chat',
    unit: 'prompts/week',
    value: 50,
    multiplierMB: 0.1, // ~100KB per interaction
    icon: '💬',
    color: '#10B981' // Emerald
  },
  {
    id: ActivityType.AI_IMAGE,
    label: 'AI Image Generation',
    unit: 'images/week',
    value: 5,
    multiplierMB: 5, // ~5MB per HD image
    icon: '🎨',
    color: '#F59E0B' // Amber
  },
  {
    id: ActivityType.AI_VIDEO,
    label: 'AI Video Generation',
    unit: 'videos/week',
    value: 2,
    multiplierMB: 50, // ~50MB per short clip
    icon: '🎥',
    color: '#EC4899' // Pink
  }
];

export const MONTHLY_DAYS = 30;
export const WEEKS_PER_MONTH = 4.3;

// Average kWh per GB (Data Center + Transmission).
export const KWH_PER_GB = 0.3; 

// Environmental & Industry Comparisons
export const CO2_PER_KWH = 0.436; // IEA global average kgCO2/kWh
export const GAS_CAR_CO2_PER_MILE = 0.404; // EPA estimate kg CO2/mile
export const SMARTPHONE_CHARGE_ENERGY = 0.012; // kWh (iPhone 14 approx)
export const LAUNDRY_KWH = 1.9; // kWh per load (warm wash + machine usage)

export const DATA_SOURCES: DataSource[] = [
  {
    category: "Video Streaming",
    statistic: "~3GB/hr for HD Streaming",
    sourceName: "Netflix Help Center",
    url: "https://help.netflix.com/en/node/87"
  },
  {
    category: "Social Media",
    statistic: "~840MB/hr for TikTok",
    sourceName: "WhistleOut",
    url: "https://www.whistleout.com.au/MobilePhones/Guides/how-much-data-does-tiktok-use"
  },
  {
    category: "Music Streaming",
    statistic: "~144MB/hr (Very High Quality)",
    sourceName: "Android Authority",
    url: "https://www.androidauthority.com/spotify-data-usage-918265/"
  },
  {
    category: "Online Gaming",
    statistic: "~40MB - 300MB/hr",
    sourceName: "Holafly",
    url: "https://esim.holafly.com/internet/how-much-data-does-gaming-use/"
  },
  {
    category: "Generative AI",
    statistic: "1 Image ~ 1 Phone Charge",
    sourceName: "MIT Technology Review",
    url: "https://www.technologyreview.com/2023/12/05/1084417/ais-carbon-footprint-is-bigger-than-you-think/" 
  },
  {
    category: "Video Calls",
    statistic: "800MB - 2.4GB/hr",
    sourceName: "Zoom Support",
    url: "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060748"
  },
  {
    category: "Energy Impact",
    statistic: "~0.3 kWh per GB",
    sourceName: "ScienceDirect",
    url: "https://www.sciencedirect.com/science/article/pii/S019689042300571X#:~:text=Estimation%20of%20energy%20consumption%20of,minimum%20limit%20for%20energy%20consumption."
  },
  {
    category: "Car Emissions",
    statistic: "0.404 kg CO2/mile",
    sourceName: "EPA Vehicle Standards",
    url: "https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle"
  },
  {
    category: "Household Energy",
    statistic: "~1.9 kWh per Laundry Load",
    sourceName: "Silicon Valley Power",
    url: "https://www.siliconvalleypower.com/residents/save-energy/appliance-energy-use-chart"
  },
  {
    category: "Smartphone Charging",
    statistic: "~0.012 kWh per full charge",
    sourceName: "ZDNET",
    url: "https://www.zdnet.com/article/how-much-does-it-cost-to-charge-an-iphone-for-a-year/"
  }
];

export const DID_YOU_KNOW_FACTS = [
  "Streaming 4K video can use up to 7GB per hour, while 1080p uses about 3GB.",
  "One hour of scrolling TikTok or Instagram Reels burns approximately 840MB of data.",
  "Generating a single high-res AI image uses roughly the same energy as charging a smartphone.",
  "Data centers currently consume about 1-1.5% of global electricity use.",
  "Standard definition (SD) streaming uses only about 0.7GB per hour—switching saves ~75% data.",
  "Training a large AI model can emit as much CO2 as five cars in their lifetimes.",
  "Sending an email with a large attachment consumes significantly more energy than a simple text email.",
  "Turning off 'Autoplay' on video apps is the easiest way to cut your data usage in half."
];
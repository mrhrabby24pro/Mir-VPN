
import { Server } from './types.ts';

export const SERVERS: Server[] = [
  { id: '1', country: 'United States', city: 'New York', flag: '🇺🇸', latency: 45, isPremium: true },
  { id: '2', country: 'United Kingdom', city: 'London', flag: '🇬🇧', latency: 82, isPremium: true },
  { id: '3', country: 'Singapore', city: 'Jurong East', flag: '🇸🇬', latency: 32, isPremium: true },
  { id: '4', country: 'Germany', city: 'Frankfurt', flag: '🇩🇪', latency: 95, isPremium: true },
  { id: '5', country: 'Japan', city: 'Tokyo', flag: '🇯🇵', latency: 120, isPremium: true },
  { id: '6', country: 'India', city: 'Mumbai', flag: '🇮🇳', latency: 15, isPremium: false },
  { id: '7', country: 'Canada', city: 'Toronto', flag: '🇨🇦', latency: 110, isPremium: true },
  { id: '8', country: 'Netherlands', city: 'Amsterdam', flag: '🇳🇱', latency: 88, isPremium: true },
  { id: '9', country: 'France', city: 'Paris', flag: '🇫🇷', latency: 92, isPremium: true },
  { id: '10', country: 'Australia', city: 'Sydney', flag: '🇦🇺', latency: 210, isPremium: true },
  { id: '11', country: 'Switzerland', city: 'Zurich', flag: '🇨🇭', latency: 105, isPremium: true },
  { id: '12', country: 'Brazil', city: 'São Paulo', flag: '🇧🇷', latency: 180, isPremium: true },
  { id: '13', country: 'South Korea', city: 'Seoul', flag: '🇰🇷', latency: 135, isPremium: true },
  { id: '14', country: 'UAE', city: 'Dubai', flag: '🇦🇪', latency: 145, isPremium: true },
];

export const APP_STRINGS = {
  en: {
    status_disconnected: 'Disconnected',
    status_connecting: 'Connecting...',
    status_connected: 'Connected',
    connect: 'Connect',
    disconnect: 'Disconnect',
    select_server: 'Select Location',
    download: 'Download',
    upload: 'Upload',
    premium_title: 'Go Premium',
    smart_location: 'Smart Location',
    ip_address: 'Your IP:',
    settings: 'Settings',
    account: 'Account',
    sponsored: 'SPONSORED',
    latency: 'Latency',
    premium_gateways: 'Premium Gateways'
  }
};

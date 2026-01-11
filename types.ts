
export interface Server {
  id: string;
  country: string;
  city: string;
  flag: string;
  latency: number;
  isPremium: boolean;
}

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

export interface TrafficData {
  down: string;
  up: string;
}

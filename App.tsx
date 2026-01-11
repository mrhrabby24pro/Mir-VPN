
import React, { useState, useEffect } from 'react';
import { Shield, ShieldCheck, Globe, Zap, Settings, User, ChevronRight, BarChart3, Wifi, Lock, ExternalLink } from 'lucide-react';
import { SERVERS, APP_STRINGS } from './constants';
import { Server, ConnectionStatus, TrafficData } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [selectedServer, setSelectedServer] = useState<Server>(SERVERS[0]); // Default to US
  const [showServerList, setShowServerList] = useState(false);
  const [traffic, setTraffic] = useState<TrafficData>({ down: '0.0', up: '0.0' });
  const [ip, setIp] = useState('103.145.72.12');
  const [activeTab, setActiveTab] = useState<'home' | 'settings' | 'stats'>('home');

  const t = APP_STRINGS.en;

  // Simulate connection process
  const toggleConnection = () => {
    if (status === 'disconnected') {
      setStatus('connecting');
      setTimeout(() => {
        setStatus('connected');
        setIp('192.168.1.' + Math.floor(Math.random() * 255));
      }, 2500);
    } else {
      setStatus('disconnected');
      setTraffic({ down: '0.0', up: '0.0' });
      setIp('103.145.72.12');
    }
  };

  // Simulate real-time traffic
  useEffect(() => {
    let interval: any;
    if (status === 'connected') {
      interval = setInterval(() => {
        setTraffic({
          down: (Math.random() * 5 + 1).toFixed(1),
          up: (Math.random() * 2 + 0.5).toFixed(1),
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleServerSelect = (server: Server) => {
    setSelectedServer(server);
    setShowServerList(false);
    if (status === 'connected') {
      setStatus('disconnected');
      setTimeout(() => setStatus('connecting'), 300);
      setTimeout(() => setStatus('connected'), 2800);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#020617] relative overflow-hidden shadow-2xl text-slate-50">
      
      {/* Background Glow Decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[20%] right-[-10%] w-64 h-64 bg-emerald-600/10 rounded-full blur-[100px]" />

      {/* Header */}
      <header className="p-6 flex justify-between items-center z-10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center glow-blue">
            <Zap className="text-white fill-current" size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight uppercase">MIR VPN</span>
        </div>
        <button className="p-2 rounded-full glass hover:bg-slate-800 transition-all active:scale-90">
          <User className="text-slate-400" size={24} />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-6 overflow-y-auto z-10 scrollbar-hide flex flex-col">
        {activeTab === 'home' && (
          <div className="flex flex-col items-center pt-4 space-y-10 flex-1">
            
            {/* Status Info */}
            <div className="text-center">
              <h2 className={`text-2xl font-bold mb-1 transition-colors duration-500 ${status === 'connected' ? 'text-emerald-400' : status === 'connecting' ? 'text-blue-400' : 'text-slate-500'}`}>
                {status === 'connected' ? t.status_connected : status === 'connecting' ? t.status_connecting : t.status_disconnected}
              </h2>
              <p className="text-slate-500 text-sm font-medium tracking-wide">{t.ip_address} <span className="text-slate-300">{ip}</span></p>
            </div>

            {/* Power Button */}
            <div className="relative group">
              <div className={`absolute inset-0 rounded-full blur-3xl transition-all duration-700 ${status === 'connected' ? 'bg-emerald-500/20' : status === 'connecting' ? 'bg-blue-500/20' : 'bg-slate-800/20'}`} />
              <button 
                onClick={toggleConnection}
                className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-500 active:scale-95 border-4 
                  ${status === 'connected' 
                    ? 'border-emerald-500/30 glass shadow-[0_0_50px_rgba(16,185,129,0.2)]' 
                    : status === 'connecting' 
                    ? 'border-blue-500/30 glass' 
                    : 'border-slate-800 glass'}`}
              >
                <div className={`p-6 rounded-full transition-all duration-500 ${status === 'connected' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50 scale-110' : 'bg-slate-800'}`}>
                  {status === 'connected' ? <ShieldCheck size={48} className="text-white" /> : <Shield size={48} className="text-slate-400" />}
                </div>
                <span className={`mt-4 font-black uppercase tracking-[0.2em] text-[10px] transition-colors ${status === 'connected' ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {status === 'connected' ? t.disconnect : t.connect}
                </span>
              </button>
            </div>

            {/* Traffic Stats */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="glass p-4 rounded-2xl flex items-center gap-3 border border-white/5">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <BarChart3 className="text-blue-500" size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-slate-500 font-bold tracking-tight">{t.download}</p>
                  <p className="text-lg font-bold leading-none mt-1">{traffic.down} <span className="text-[10px] text-slate-500">Mb/s</span></p>
                </div>
              </div>
              <div className="glass p-4 rounded-2xl flex items-center gap-3 border border-white/5">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Zap className="text-purple-500" size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-slate-500 font-bold tracking-tight">{t.upload}</p>
                  <p className="text-lg font-bold leading-none mt-1">{traffic.up} <span className="text-[10px] text-slate-500">Mb/s</span></p>
                </div>
              </div>
            </div>

            {/* Server Selector Button */}
            <button 
              onClick={() => setShowServerList(true)}
              className="w-full glass p-4 rounded-2xl flex items-center justify-between hover:bg-slate-800/50 transition-all border border-white/5 active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{selectedServer.flag}</div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{t.select_server}</p>
                  <p className="font-bold text-slate-200">{selectedServer.country}, {selectedServer.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                    <Wifi size={10} />
                    {selectedServer.latency}ms
                  </div>
                <ChevronRight className="text-slate-600" size={18} />
              </div>
            </button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="py-6 space-y-6">
            <h2 className="text-2xl font-bold mb-4">{t.settings}</h2>
            <div className="space-y-3">
              {['Auto-connect on Start', 'Kill Switch', 'Split Tunneling', 'Low Latency Protocol'].map(item => (
                <div key={item} className="glass p-4 rounded-2xl flex justify-between items-center border border-white/5">
                  <span className="font-semibold text-slate-300">{item}</span>
                  <div className="w-10 h-5 bg-slate-800 rounded-full relative p-0.5 cursor-pointer">
                    <div className="w-4 h-4 bg-blue-600 rounded-full shadow-lg shadow-blue-500/30"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl shadow-blue-900/20">
              <h3 className="text-white font-black text-lg">{t.premium_title}</h3>
              <p className="text-white/70 text-xs mb-4">Unlimited bandwidth, 50+ locations, and military-grade encryption.</p>
              <button className="w-full bg-white text-blue-700 py-3 rounded-xl font-bold text-sm tracking-wide shadow-lg active:scale-95 transition-transform">Get Access Now</button>
            </div>
          </div>
        )}

        {/* Ad Slot */}
        <div className="mt-auto mb-4">
          <div className="glass rounded-2xl p-3 border border-blue-500/10 bg-gradient-to-r from-slate-900 to-slate-800 overflow-hidden relative">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center shrink-0">
                <Globe className="text-blue-400" size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-black text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded leading-none uppercase">{t.sponsored}</span>
                  <ExternalLink size={12} className="text-slate-500" />
                </div>
                <p className="text-sm font-bold text-slate-200 mt-1">MIR Cloud Storage</p>
                <p className="text-[10px] text-slate-500 line-clamp-1">Securely backup your files with MIR VPN ecosystem.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="p-4 glass border-t border-white/5 z-20 flex justify-around shrink-0 backdrop-blur-xl">
        <button onClick={() => setActiveTab('home')} className={`p-3 rounded-2xl transition-all duration-300 ${activeTab === 'home' ? 'bg-blue-600 text-white glow-blue scale-110 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
          <Shield size={22} />
        </button>
        <button onClick={() => setActiveTab('stats')} className={`p-3 rounded-2xl transition-all duration-300 ${activeTab === 'stats' ? 'bg-blue-600 text-white glow-blue scale-110 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
          <Globe size={22} />
        </button>
        <button onClick={() => setActiveTab('settings')} className={`p-3 rounded-2xl transition-all duration-300 ${activeTab === 'settings' ? 'bg-blue-600 text-white glow-blue scale-110 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
          <Settings size={22} />
        </button>
      </footer>

      {/* Server List Modal */}
      {showServerList && (
        <div className="absolute inset-0 bg-slate-950 z-50 flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setShowServerList(false)} className="p-2 hover:bg-slate-800 rounded-full transition-colors active:scale-90">
                <ChevronRight size={24} className="rotate-180" />
              </button>
              <h3 className="text-xl font-bold">{t.select_server}</h3>
            </div>
            <div className="p-2 glass rounded-full">
              <Zap size={18} className="text-amber-500 fill-amber-500/20" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
            <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-between mb-4 group cursor-pointer hover:bg-blue-600/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
                  <Zap size={20} className="text-blue-400" />
                </div>
                <span className="font-bold text-blue-400 text-sm">{t.smart_location}</span>
              </div>
              <div className="px-2 py-1 bg-blue-600 text-[9px] font-black text-white rounded uppercase tracking-tighter">Recommended</div>
            </div>

            <div className="pb-2">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 mb-2">{t.premium_gateways}</p>
              {SERVERS.map((server) => (
                <button 
                  key={server.id}
                  onClick={() => handleServerSelect(server)}
                  className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all duration-200 mb-2 ${selectedServer.id === server.id ? 'bg-slate-800/80 border border-blue-500/30 ring-1 ring-blue-500/20' : 'bg-slate-900/40 border border-transparent hover:border-white/10'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl grayscale-[0.2]">{server.flag}</span>
                    <div className="text-left">
                      <p className="font-bold text-slate-200">{server.country}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{server.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-1 text-[10px] font-bold ${server.latency < 50 ? 'text-emerald-500' : server.latency < 100 ? 'text-blue-500' : 'text-slate-500'}`}>
                      <Wifi size={12} />
                      {server.latency}ms
                    </div>
                    {server.isPremium && (
                      <div className="p-1.5 bg-amber-500/10 rounded-lg">
                        <Lock size={14} className="text-amber-500" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

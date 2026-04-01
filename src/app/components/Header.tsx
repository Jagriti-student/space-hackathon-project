import { Activity, Wifi, WifiOff } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border-b border-cyan-500/20 bg-gradient-to-r from-black via-slate-900 to-black p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Autonomous Constellation Manager
            </h1>
            <p className="text-cyan-300/70 text-sm mt-1">Real-time Satellite Monitoring & Collision Avoidance</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            {connected ? (
              <Wifi className="w-5 h-5 text-green-400 animate-pulse" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-400" />
            )}
            <span className={connected ? 'text-green-400' : 'text-red-400'}>
              {connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <div className="px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg">
            <div className="text-xs text-cyan-400/70">UTC TIME</div>
            <div className="text-cyan-300 font-mono">
              {currentTime.toISOString().split('.')[0].replace('T', ' ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

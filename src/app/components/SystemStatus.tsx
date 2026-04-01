import { Server, Wifi, Database, Cpu } from 'lucide-react';
import { useState, useEffect } from 'react';

export function SystemStatus() {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const systems = [
    { name: 'Ground Station', status: 'online', icon: Server, latency: '12ms' },
    { name: 'Telemetry Link', status: 'online', icon: Wifi, latency: '45ms' },
    { name: 'Database', status: 'online', icon: Database, latency: '8ms' },
    { name: 'Compute', status: 'online', icon: Cpu, latency: '3ms' },
  ];

  return (
    <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-sm">
      <h3 className="text-cyan-300 mb-4">System Status</h3>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {systems.map((system, idx) => (
          <div key={idx} className="bg-slate-800/50 border border-green-500/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <system.icon className="w-4 h-4 text-green-400" />
              <span className="text-xs text-cyan-100">{system.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 uppercase">{system.status}</span>
              </div>
              <span className="text-xs text-cyan-300/60 font-mono">{system.latency}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/50 border border-cyan-500/20 rounded p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-cyan-300/60">System Uptime</span>
          <span className="text-cyan-100 font-mono">{formatUptime(uptime)}</span>
        </div>
      </div>
    </div>
  );
}

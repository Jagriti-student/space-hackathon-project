import { Satellite, Fuel, Navigation } from 'lucide-react';

interface SatelliteData {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fuel: number;
  status: 'normal' | 'low-fuel' | 'danger';
}

interface TelemetryPanelProps {
  satellites: SatelliteData[];
}

export function TelemetryPanel({ satellites }: TelemetryPanelProps) {
  return (
    <div className="h-full overflow-y-auto space-y-3 pr-2 custom-scrollbar">
      {satellites.map(sat => {
        let statusColor, bgColor, borderColor;
        if (sat.status === 'danger') {
          statusColor = 'text-red-400';
          bgColor = 'bg-red-950/30';
          borderColor = 'border-red-500/50';
        } else if (sat.status === 'low-fuel') {
          statusColor = 'text-orange-400';
          bgColor = 'bg-orange-950/30';
          borderColor = 'border-orange-500/50';
        } else {
          statusColor = 'text-green-400';
          bgColor = 'bg-green-950/30';
          borderColor = 'border-green-500/50';
        }

        return (
          <div
            key={sat.id}
            className={`${bgColor} ${borderColor} border rounded-lg p-4 backdrop-blur-sm transition-all hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Satellite className={`w-5 h-5 ${statusColor}`} />
                <span className="text-cyan-100 font-mono">{sat.id}</span>
              </div>
              <div className={`px-2 py-1 rounded ${bgColor} ${statusColor} text-xs uppercase`}>
                {sat.status.replace('-', ' ')}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-300/70">Position:</span>
                <span className="text-cyan-100 font-mono ml-auto">
                  X: {sat.x.toFixed(1)} Y: {sat.y.toFixed(1)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-blue-400" />
                <span className="text-cyan-300/70">Velocity:</span>
                <span className="text-cyan-100 font-mono ml-auto">
                  VX: {sat.vx.toFixed(2)} VY: {sat.vy.toFixed(2)}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Fuel className="w-4 h-4 text-amber-400" />
                  <span className="text-cyan-300/70">Fuel:</span>
                  <span className="text-cyan-100 font-mono ml-auto">{sat.fuel}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      sat.fuel > 50 ? 'bg-green-500' : sat.fuel > 20 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${sat.fuel}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

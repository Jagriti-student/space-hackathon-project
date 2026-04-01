import { Clock, Flame, Timer } from 'lucide-react';

interface Maneuver {
  satelliteId: string;
  burnStart: string;
  burnEnd: string;
  cooldownEnd: string;
  type: 'avoidance' | 'correction' | 'scheduled';
}

interface ManeuverTimelineProps {
  maneuvers: Maneuver[];
}

export function ManeuverTimeline({ maneuvers }: ManeuverTimelineProps) {
  return (
    <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-sm">
      <h3 className="text-cyan-300 mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Maneuver Timeline
      </h3>

      <div className="space-y-3">
        {maneuvers.map((maneuver, idx) => {
          let typeColor;
          if (maneuver.type === 'avoidance') {
            typeColor = 'bg-red-500';
          } else if (maneuver.type === 'correction') {
            typeColor = 'bg-orange-500';
          } else {
            typeColor = 'bg-cyan-500';
          }

          return (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-cyan-100 font-mono">{maneuver.satelliteId}</span>
                <span className={`px-2 py-1 rounded text-xs text-white uppercase ${typeColor}`}>
                  {maneuver.type}
                </span>
              </div>

              <div className="relative h-8 bg-slate-800 rounded overflow-hidden">
                <div className="absolute inset-0 flex">
                  <div
                    className={`${typeColor} h-full flex items-center justify-center`}
                    style={{ width: '40%' }}
                  >
                    <Flame className="w-4 h-4 text-white" />
                  </div>
                  <div
                    className="bg-blue-500/50 h-full flex items-center justify-center"
                    style={{ width: '60%' }}
                  >
                    <Timer className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-xs text-cyan-300/70 font-mono">
                <span>Burn: {maneuver.burnStart}</span>
                <span>End: {maneuver.burnEnd}</span>
                <span>Cool: {maneuver.cooldownEnd}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

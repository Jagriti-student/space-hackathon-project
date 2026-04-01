import { AlertTriangle } from 'lucide-react';

interface Collision {
  sat1: string;
  sat2: string;
  risk: 'LOW' | 'HIGH' | 'CRITICAL';
}

interface CollisionAlertProps {
  collisions: Collision[];
}

export function CollisionAlert({ collisions }: CollisionAlertProps) {
  if (collisions.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-red-950/50 via-red-900/50 to-red-950/50 border-2 border-red-500/70 rounded-lg p-4 backdrop-blur-sm shadow-xl shadow-red-500/20 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <AlertTriangle className="w-6 h-6 text-red-400" />
        <h3 className="text-red-400 uppercase tracking-wider">⚠️ Collision Risk Detected</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {collisions.map((collision, idx) => {
          let riskColor;
          if (collision.risk === 'CRITICAL') {
            riskColor = 'text-red-400 bg-red-950/50 border-red-500';
          } else if (collision.risk === 'HIGH') {
            riskColor = 'text-orange-400 bg-orange-950/50 border-orange-500';
          } else {
            riskColor = 'text-yellow-400 bg-yellow-950/50 border-yellow-500';
          }

          return (
            <div
              key={idx}
              className={`${riskColor} border rounded p-3 backdrop-blur-sm`}
            >
              <div className="text-xs opacity-70 mb-1">PAIR</div>
              <div className="font-mono">
                {collision.sat1} ↔ {collision.sat2}
              </div>
              <div className="mt-2 text-xs uppercase opacity-90">
                Risk: {collision.risk}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

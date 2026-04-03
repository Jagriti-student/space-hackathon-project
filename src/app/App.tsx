import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SatelliteVisualization } from './components/SatelliteVisualization';
import { TelemetryPanel } from './components/TelemetryPanel';
import { CollisionAlert } from './components/CollisionAlert';
import { ControlPanel } from './components/ControlPanel';
import { ManeuverTimeline } from './components/ManeuverTimeline';
import { FuelPerformancePanel } from './components/FuelPerformancePanel';
import { StatsOverview } from './components/StatsOverview';
import { SystemStatus } from './components/SystemStatus';
import { Legend } from './components/Legend';

interface Satellite {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fuel: number;
  status: 'normal' | 'low-fuel' | 'danger';
}

interface Collision {
  sat1: string;
  sat2: string;
  risk: 'LOW' | 'HIGH' | 'CRITICAL';
}

interface Maneuver {
  satelliteId: string;
  burnStart: string;
  burnEnd: string;
  cooldownEnd: string;
  type: 'avoidance' | 'correction' | 'scheduled';
}

// Generate 55 satellites with realistic orbital parameters
const generateSatellites = (): Satellite[] => {
  const satellites: Satellite[] = [];

  for (let i = 1; i <= 55; i++) {
    const id = `SAT-${String(i).padStart(3, '0')}`;
    const x = Math.random() * 1000;
    const y = Math.random() * 1000;
    const vx = (Math.random() - 0.5) * 4;
    const vy = (Math.random() - 0.5) * 4;
    const fuel = Math.floor(Math.random() * 100);

    let status: 'normal' | 'low-fuel' | 'danger' = 'normal';
    if (fuel < 20) status = 'low-fuel';
    if (i % 8 === 0 || i % 11 === 0) status = 'danger'; // Designate some as collision risk

    satellites.push({ id, x, y, vx, vy, fuel, status });
  }

  return satellites;
};

export default function App() {
  const [satellites, setSatellites] = useState<Satellite[]>(generateSatellites());

  const [collisions, setCollisions] = useState<Collision[]>([
    { sat1: 'SAT-008', sat2: 'SAT-016', risk: 'CRITICAL' },
    { sat1: 'SAT-011', sat2: 'SAT-022', risk: 'CRITICAL' },
    { sat1: 'SAT-024', sat2: 'SAT-033', risk: 'HIGH' },
    { sat1: 'SAT-044', sat2: 'SAT-055', risk: 'HIGH' },
    { sat1: 'SAT-001', sat2: 'SAT-005', risk: 'LOW' },
    { sat1: 'SAT-013', sat2: 'SAT-027', risk: 'LOW' },
  ]);

  const [maneuvers, setManeuvers] = useState<Maneuver[]>([
    {
      satelliteId: 'SAT-008',
      burnStart: '14:32:15',
      burnEnd: '14:33:45',
      cooldownEnd: '14:38:00',
      type: 'avoidance',
    },
    {
      satelliteId: 'SAT-016',
      burnStart: '14:35:00',
      burnEnd: '14:36:20',
      cooldownEnd: '14:40:30',
      type: 'avoidance',
    },
    {
      satelliteId: 'SAT-011',
      burnStart: '14:42:00',
      burnEnd: '14:43:15',
      cooldownEnd: '14:47:30',
      type: 'avoidance',
    },
    {
      satelliteId: 'SAT-022',
      burnStart: '14:45:00',
      burnEnd: '14:46:10',
      cooldownEnd: '14:50:00',
      type: 'avoidance',
    },
    {
      satelliteId: 'SAT-003',
      burnStart: '15:00:00',
      burnEnd: '15:01:30',
      cooldownEnd: '15:05:00',
      type: 'correction',
    },
    {
      satelliteId: 'SAT-024',
      burnStart: '15:15:00',
      burnEnd: '15:16:45',
      cooldownEnd: '15:21:00',
      type: 'correction',
    },
    {
      satelliteId: 'SAT-033',
      burnStart: '15:18:00',
      burnEnd: '15:19:20',
      cooldownEnd: '15:23:30',
      type: 'scheduled',
    },
    {
      satelliteId: 'SAT-044',
      burnStart: '15:30:00',
      burnEnd: '15:31:15',
      cooldownEnd: '15:35:00',
      type: 'scheduled',
    },
  ]);

  const collisionPairs: Array<[string, string]> = collisions.map(c => [c.sat1, c.sat2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSatellites(prev =>
        prev.map(sat => ({
          ...sat,
          x: (sat.x + sat.vx + 1000) % 1000,
          y: (sat.y + sat.vy + 1000) % 1000,
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleSendTelemetry = () => {
    console.log('Sending telemetry data...');
  };

  const handleSimulateStep = () => {
    setSatellites(prev =>
      prev.map(sat => ({
        ...sat,
        x: (sat.x + sat.vx * 10 + 1000) % 1000,
        y: (sat.y + sat.vy * 10 + 1000) % 1000,
      }))
    );
  };

  const handleScheduleManeuver = () => {
    const newManeuver: Maneuver = {
      satelliteId: 'SAT-005',
      burnStart: '15:30:00',
      burnEnd: '15:31:15',
      cooldownEnd: '15:35:00',
      type: 'scheduled',
    };
    setManeuvers(prev => [...prev, newManeuver]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white overflow-x-hidden">
      <Header />

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <StatsOverview satellites={satellites} collisionCount={collisions.length} />

        <CollisionAlert collisions={collisions} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
          <div className="xl:col-span-2 space-y-4 md:space-y-6">
            <div className="space-y-3">
              <div className="h-[400px] md:h-[600px]">
                <SatelliteVisualization satellites={satellites} collisionPairs={collisionPairs} />
              </div>
              <Legend />
            </div>

            <div className="relative z-50">
              <ControlPanel
                onSendTelemetry={handleSendTelemetry}
                onSimulateStep={handleSimulateStep}
                onScheduleManeuver={handleScheduleManeuver}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <ManeuverTimeline maneuvers={maneuvers} />
              <FuelPerformancePanel />
            </div>
          </div>

          <div className="xl:col-span-1 space-y-4 md:space-y-6">
            <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-sm h-[600px] flex flex-col">
              <h3 className="text-cyan-300 mb-4">Satellite Telemetry ({satellites.length} Active)</h3>
              <div className="flex-1 overflow-hidden">
                <TelemetryPanel satellites={satellites} />
              </div>
            </div>

            <SystemStatus />
          </div>
        </div>

        <footer className="text-center py-6 text-cyan-300/50 border-t border-cyan-500/20 mt-8">
          <div className="space-y-2">
            <p className="text-lg">Hackathon Project - Autonomous Satellite System</p>
            <p className="text-xs text-cyan-400/40">Mission Control Dashboard v2.0 | Powered by ACM Technology</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
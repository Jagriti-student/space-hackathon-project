import { Satellite, AlertTriangle, Fuel, Activity } from 'lucide-react';

interface Satellite {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fuel: number;
  status: 'normal' | 'low-fuel' | 'danger';
}

interface Props {
  satellites: Satellite[];
  collisionCount: number;
}

export function StatsOverview({ satellites, collisionCount }: Props) {
  const normalCount = satellites.filter(s => s.status === 'normal').length;
  const lowFuelCount = satellites.filter(s => s.status === 'low-fuel').length;
  const dangerCount = satellites.filter(s => s.status === 'danger').length;
  const avgFuel = (satellites.reduce((sum, s) => sum + s.fuel, 0) / satellites.length).toFixed(1);

  const stats = [
    {
      label: 'Total Satellites',
      value: satellites.length.toString(),
      icon: Satellite,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
    },
    {
      label: 'Active Collisions',
      value: collisionCount.toString(),
      icon: AlertTriangle,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
    },
    {
      label: 'Average Fuel',
      value: `${avgFuel}%`,
      icon: Fuel,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
    },
    {
      label: 'Operational',
      value: normalCount.toString(),
      icon: Activity,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`${stat.bg} border ${stat.border} rounded-lg p-4 backdrop-blur-sm hover:shadow-lg transition-all`}
        >
          <div className="flex items-center justify-between mb-3">
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
          </div>
          <div className="text-sm text-cyan-300/60">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

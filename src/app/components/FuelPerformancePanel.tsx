import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Fuel, ShieldCheck } from 'lucide-react';

const fuelData = [
  { time: '00:00', fuel: 95 },
  { time: '00:15', fuel: 92 },
  { time: '00:30', fuel: 88 },
  { time: '00:45', fuel: 85 },
  { time: '01:00', fuel: 80 },
  { time: '01:15', fuel: 76 },
];

const collisionData = [
  { period: 'T-6h', avoided: 2 },
  { period: 'T-5h', avoided: 1 },
  { period: 'T-4h', avoided: 3 },
  { period: 'T-3h', avoided: 1 },
  { period: 'T-2h', avoided: 2 },
  { period: 'T-1h', avoided: 0 },
];

export function FuelPerformancePanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-sm">
        <h3 className="text-cyan-300 mb-4 flex items-center gap-2">
          <Fuel className="w-5 h-5" />
          Average Fuel Usage
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={fuelData}>
            <defs>
              <linearGradient id="fuelGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.1)" />
            <XAxis dataKey="time" stroke="#06b6d4" fontSize={12} />
            <YAxis stroke="#06b6d4" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '8px',
                color: '#06b6d4'
              }}
            />
            <Area type="monotone" dataKey="fuel" stroke="#06b6d4" strokeWidth={2} fill="url(#fuelGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-sm">
        <h3 className="text-cyan-300 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          Collisions Avoided
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={collisionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.1)" />
            <XAxis dataKey="period" stroke="#06b6d4" fontSize={12} />
            <YAxis stroke="#06b6d4" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '8px',
                color: '#06b6d4'
              }}
            />
            <Bar dataKey="avoided" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

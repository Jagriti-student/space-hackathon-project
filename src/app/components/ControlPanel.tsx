import { Send, Play, Settings } from 'lucide-react';

interface ControlPanelProps {
  onSendTelemetry: () => void;
  onSimulateStep: () => void;
  onScheduleManeuver: () => void;
}

export function ControlPanel({ onSendTelemetry, onSimulateStep, onScheduleManeuver }: ControlPanelProps) {
  return (
    <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-sm">
      <h3 className="text-cyan-300 mb-4 flex items-center gap-2">
        <Settings className="w-5 h-5" />
        Control Panel
      </h3>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={onSendTelemetry}
          className="px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105"
        >
          <Send className="w-4 h-4" />
          Send Telemetry
        </button>

        <button
          onClick={onSimulateStep}
          className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
        >
          <Play className="w-4 h-4" />
          Simulate Step
        </button>

        <button
          onClick={onScheduleManeuver}
          className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
        >
          <Settings className="w-4 h-4" />
          Schedule Maneuver
        </button>
      </div>
    </div>
  );
}

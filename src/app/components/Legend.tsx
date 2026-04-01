export function Legend() {
  const items = [
    { color: 'bg-cyan-500', label: 'Normal Operation', border: 'border-cyan-500' },
    { color: 'bg-orange-500', label: 'Low Fuel (<20%)', border: 'border-orange-500' },
    { color: 'bg-red-500', label: 'Collision Risk', border: 'border-red-500' },
  ];

  return (
    <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-3 backdrop-blur-sm">
      <h4 className="text-xs text-cyan-300/60 mb-2">LEGEND</h4>
      <div className="flex flex-wrap gap-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${item.color} border ${item.border}`}></div>
            <span className="text-xs text-cyan-100">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

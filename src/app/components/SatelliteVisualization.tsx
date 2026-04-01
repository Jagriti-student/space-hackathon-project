import { useEffect, useRef } from 'react';

interface Satellite {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fuel: number;
  status: 'normal' | 'low-fuel' | 'danger';
}

interface SatelliteVisualizationProps {
  satellites: Satellite[];
  collisionPairs: Array<[string, string]>;
}

export function SatelliteVisualization({ satellites, collisionPairs }: SatelliteVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    // Draw space background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    // Draw stars
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 2;
      ctx.globalAlpha = Math.random() * 0.8 + 0.2;
      ctx.fillRect(x, y, size, size);
    }
    ctx.globalAlpha = 1;

    // Draw grid
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
    ctx.lineWidth = 1;
    const gridSize = 50;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw collision lines
    ctx.lineWidth = 2;
    collisionPairs.forEach(([sat1Id, sat2Id]) => {
      const sat1 = satellites.find(s => s.id === sat1Id);
      const sat2 = satellites.find(s => s.id === sat2Id);
      if (sat1 && sat2) {
        const x1 = (sat1.x / 1000) * width;
        const y1 = (sat1.y / 1000) * height;
        const x2 = (sat2.x / 1000) * width;
        const y2 = (sat2.y / 1000) * height;

        ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });

    // Draw satellites
    satellites.forEach(sat => {
      const x = (sat.x / 1000) * width;
      const y = (sat.y / 1000) * height;

      let color;
      if (sat.status === 'danger') {
        color = '#ef4444';
      } else if (sat.status === 'low-fuel') {
        color = '#f59e0b';
      } else {
        color = '#06b6d4';
      }

      // Draw glow (smaller for 50+ satellites)
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 12);
      gradient.addColorStop(0, color + 'aa');
      gradient.addColorStop(1, color + '00');
      ctx.fillStyle = gradient;
      ctx.fillRect(x - 12, y - 12, 24, 24);

      // Draw satellite (smaller nodes for better visibility with 50+ satellites)
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw satellite ID only for danger satellites and every 5th satellite to avoid clutter
      if (sat.status === 'danger' || parseInt(sat.id.split('-')[1]) % 5 === 0) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '9px monospace';
        ctx.fillText(sat.id, x + 10, y - 10);
      }

      // Draw velocity vector
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + sat.vx * 2, y + sat.vy * 2);
      ctx.stroke();
    });
  }, [satellites, collisionPairs]);

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden border border-cyan-500/30 shadow-xl shadow-cyan-500/20">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

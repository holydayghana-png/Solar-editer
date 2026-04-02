import { useEffect, useRef, useState } from 'react';
import { CelestialBody } from '../types';

interface SolarSystemCanvasProps {
  bodies: CelestialBody[];
}

export default function SolarSystemCanvas({ bodies }: SolarSystemCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Handle resizing
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    let animationFrameId: number;
    let localAngles = bodies.map(b => b.angle);

    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Draw background (stars)
      ctx.fillStyle = '#05050a';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      
      // Draw stars (static for now, could be pre-rendered)
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 200; i++) {
        const x = (Math.sin(i * 123.45) * 0.5 + 0.5) * dimensions.width;
        const y = (Math.cos(i * 678.90) * 0.5 + 0.5) * dimensions.height;
        const size = (Math.sin(i * 99.9) * 0.5 + 0.5) * 1.5;
        ctx.globalAlpha = 0.3 + Math.sin(Date.now() * 0.001 + i) * 0.2;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      // Draw orbits and bodies
      bodies.forEach((body, index) => {
        const x = centerX + Math.cos(localAngles[index]) * body.distance;
        const y = centerY + Math.sin(localAngles[index]) * body.distance;

        // Draw orbit
        if (body.distance > 0) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.lineWidth = 1;
          ctx.arc(centerX, centerY, body.distance, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw body glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, body.size * 2);
        gradient.addColorStop(0, body.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, body.size * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Draw body
        ctx.fillStyle = body.color;
        ctx.beginPath();
        ctx.arc(x, y, body.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw rings if any
        if (body.rings && body.ringColor) {
          ctx.beginPath();
          ctx.strokeStyle = body.ringColor;
          ctx.lineWidth = body.size * 0.4;
          ctx.ellipse(x, y, body.size * 2.2, body.size * 0.8, Math.PI / 6, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(body.name, x, y + body.size + 15);

        // Update angle
        localAngles[index] += body.orbitSpeed;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions, bodies]);

  return (
    <div ref={containerRef} className="w-full h-full bg-black relative overflow-hidden rounded-xl border border-white/10 shadow-2xl">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-4 left-4 pointer-events-none">
        <div className="text-xs font-mono text-white/40 uppercase tracking-widest">System Status</div>
        <div className="text-sm font-medium text-white/80">4K High-Fidelity Simulation</div>
      </div>
    </div>
  );
}

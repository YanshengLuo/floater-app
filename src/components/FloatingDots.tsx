import React, { useRef, useEffect, useState } from 'react';

interface FloatingDotsProps {
  width: number;
  height: number;
  numDiscs?: number;
  numTargets?: number;
  speed?: number;
  onComplete: () => void;
}

type Phase = 'encode' | 'track' | 'select' | 'feedback';

interface Disc {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isTarget: boolean;
}

const FloatingDots: React.FC<FloatingDotsProps> = ({
  width,
  height,
  numDiscs = 8,
  numTargets = 2,
  speed = 2,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>('encode');
  const [discs, setDiscs] = useState<Disc[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  // Initialize discs once
  useEffect(() => {
    const newDiscs: Disc[] = [];
    for (let i = 0; i < numDiscs; i++) {
      const angle = Math.random() * 2 * Math.PI;
      newDiscs.push({
        id: i,
        x: Math.random() * (width - 20) + 10,
        y: Math.random() * (height - 20) + 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        isTarget: false,
      });
    }
    // Randomly assign targets
    newDiscs.sort(() => 0.5 - Math.random());
    newDiscs.forEach((d, idx) => (d.isTarget = idx < numTargets));
    setDiscs(newDiscs);
  }, [width, height, numDiscs, numTargets, speed]);

  // Phase transitions
  useEffect(() => {
    if (phase === 'encode') {
      const timer = setTimeout(() => setPhase('track'), 2000);
      return () => clearTimeout(timer);
    }
    if (phase === 'track') {
      const start = performance.now();
      let animationId: number;
      const ctx = canvasRef.current!.getContext('2d')!;

      const animate = (t: number) => {
        const elapsed = t - start;
        setDiscs(prev =>
          prev.map(d => {
            let { x, y, vx, vy } = d;
            x += vx;
            y += vy;
            if (x < 10 || x > width - 10) vx = -vx;
            if (y < 10 || y > height - 10) vy = -vy;
            return { ...d, x, y, vx, vy };
          })
        );
        ctx.clearRect(0, 0, width, height);
        discs.forEach(d => {
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.arc(d.x, d.y, 10, 0, 2 * Math.PI);
          ctx.fill();
        });
        if (elapsed < 8000) {
          animationId = requestAnimationFrame(animate);
        } else {
          setPhase('select');
        }
      };
      animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    }
    if (phase === 'feedback') {
      const timer = setTimeout(() => onComplete(), 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, discs]);

  // Draw for encode, select, feedback
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    if (phase === 'encode') {
      discs.forEach(d => {
        ctx.fillStyle = d.isTarget ? 'green' : 'white';
        ctx.beginPath();
        ctx.arc(d.x, d.y, 10, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
    if (phase === 'select') {
      discs.forEach(d => {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(d.x, d.y, 10, 0, 2 * Math.PI);
        ctx.fill();
        if (selected.has(d.id)) {
          ctx.strokeStyle = 'blue';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      });
    }
    if (phase === 'feedback') {
      discs.forEach(d => {
        if (d.isTarget && selected.has(d.id)) ctx.fillStyle = 'green';
        else if (d.isTarget && !selected.has(d.id)) ctx.fillStyle = 'red';
        else ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(d.x, d.y, 10, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  }, [phase, discs, selected]);

  // Handle clicks during selection
  const handleClick = (e: React.MouseEvent) => {
    if (phase !== 'select') return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    discs.forEach(d => {
      const dx = d.x - x;
      const dy = d.y - y;
      if (Math.hypot(dx, dy) < 10) {
        setSelected(prev => {
          const next = new Set(prev);
          if (next.has(d.id)) next.delete(d.id);
          else next.add(d.id);
          if (next.size === numTargets) setPhase('feedback');
          return next;
        });
      }
    });
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ background: '#202020', cursor: phase === 'select' ? 'pointer' : 'default' }}
      onClick={handleClick}
    />
  );
};

export default FloatingDots;

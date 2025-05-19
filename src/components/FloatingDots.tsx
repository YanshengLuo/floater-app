// src/components/FloatingDots.tsx
import React, { useRef, useEffect, useState } from 'react';

const COLORS = ['green','blue','yellow','red','purple','orange','grey'] as const;
export type Color = typeof COLORS[number];

interface Dot {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: Color;
}

type Phase = 'float' | 'prompt' | 'feedback';

const FloatingDots: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dots, setDots] = useState<Dot[]>([]);
  const [phase, setPhase] = useState<Phase>('float');
  const [targetColor, setTargetColor] = useState<Color>('green');
  const [timer, setTimer] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  // Initialize full screen and dots
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const count = 20;
    const speed = 2;
    // create dots
    const newDots: Dot[] = Array.from({ length: count }, (_, i) => {
      const angle = Math.random() * 2 * Math.PI;
      return {
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    });
    setDots(newDots);
    setTargetColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
    setPhase('float');
    setTimer(0);
    const tick = setInterval(() => setTimer(t => t + 1), 1000);
    const promptTimeout = setTimeout(() => setPhase('prompt'), 8000);
    return () => { clearInterval(tick); clearTimeout(promptTimeout); };
  }, [streak]);

  // Animation loop
  useEffect(() => {
    if (phase !== 'float') return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animationId: number;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const animate = () => {
      ctx.clearRect(0,0,width,height);
      setDots(prev => prev.map(d => {
        let { x,y,vx,vy,color,id } = d;
        x += vx; y += vy;
        if(x<0||x>width){ vx = -vx; x = Math.max(0, Math.min(x,width)); }
        if(y<0||y>height){ vy = -vy; y = Math.max(0, Math.min(y,height)); }
        ctx.fillStyle = color;
        ctx.beginPath(); ctx.arc(x,y,12,0,2*Math.PI); ctx.fill();
        return { id,x,y,vx,vy,color };
      }));
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [phase]);

  // Prompt overlay drawing
  useEffect(() => {
    if (phase !== 'prompt') return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = 'rgba(128,128,128,0.6)';
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    setMessage(`Click the ${targetColor} dot`);
  }, [phase, targetColor]);

  // Handle clicks
  const handleClick = (e: React.MouseEvent) => {
    if (phase !== 'prompt') return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const clicked = dots.find(d => Math.hypot(d.x-clickX,d.y-clickY)<12);
    if (!clicked) return;
    if (clicked.color === targetColor) {
      setMessage('Correct!');
      setStreak(s => s+1);
    } else {
      setMessage('Wrong! Play again');
      setStreak(0);
    }
    setPhase('feedback');
  };

  // Feedback timeout -> next round or stay
  useEffect(() => {
    if (phase !== 'feedback') return;
    const fbTimer = setTimeout(() => setPhase('float'), 2000);
    return () => clearTimeout(fbTimer);
  }, [phase]);

  return (
    <div onClick={handleClick} style={{position:'relative'}}>
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} style={{ display:'block', background:'#fff' }}/>
      <div style={{position:'fixed',top:10,left:10,fontSize:'1.2rem'}}>{`Time: ${timer}s  Streak: ${streak}`}</div>
      {message && phase==='prompt' && (
        <div style={{position:'fixed',top:'50%',width:'100%',textAlign:'center',fontSize:'1.5rem',color:'#000'}}>{message}</div>
      )}
      {message && phase==='feedback' && (
        <div style={{position:'fixed',top:'50%',width:'100%',textAlign:'center',fontSize:'1.5rem',color:'#000'}}>{message}</div>
      )}
    </div>
  );
};

export default FloatingDots;
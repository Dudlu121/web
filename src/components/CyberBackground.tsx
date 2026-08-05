import { useEffect, useRef } from 'react';

export function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const mouse = { x: width / 2, y: height / 2, radius: 250, active: false };

    const particleCount = Math.min(Math.floor((width * height) / 8000), 150);
    interface Particle {
      x: number; y: number;
      baseX: number; baseY: number;
      size: number; density: number;
      color: string; vx: number; vy: number;
    }
    const particles: Particle[] = [];
    const colors = ['#ffffff', '#a1a1aa', '#3f3f46', '#00f5d4'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        density: (Math.random() * 30) + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5
      });
    }

    const render = () => {
      ctx.fillStyle = 'rgba(3, 3, 3, 0.2)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            p.x -= (dx / distance) * force * p.density * 0.8;
            p.y -= (dy / distance) * force * p.density * 0.8;
          }
        }

        p.x += (p.baseX - p.x) * 0.005;
        p.y += (p.baseY - p.y) * 0.005;
        p.baseX += p.vx * 0.5;
        p.baseY += p.vy * 0.5;
        if (p.baseX < 0 || p.baseX > width) p.vx *= -1;
        if (p.baseY < 0 || p.baseY > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255,255,255,${(1 - dist / 150) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = width; canvas.height = height;
    };
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; };
    const handleMouseLeave = () => { mouse.active = false; };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Aurora glow layer underneath */}
      <div style={{
        position: 'absolute', width: '70vw', height: '70vw', borderRadius: '50%',
        background: 'radial-gradient(circle, #00f5d4 0%, #0070f3 60%, transparent 80%)',
        filter: 'blur(120px)', opacity: 0.10, top: '-20vw', left: '-15vw',
        animation: 'aurora1 18s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: '60vw', height: '60vw', borderRadius: '50%',
        background: 'radial-gradient(circle, #ff2a6d 0%, #7928ca 60%, transparent 80%)',
        filter: 'blur(140px)', opacity: 0.07, bottom: '-10vw', right: '-10vw',
        animation: 'aurora2 22s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: '50vw', height: '50vw', borderRadius: '50%',
        background: 'radial-gradient(circle, #0070f3 0%, transparent 70%)',
        filter: 'blur(130px)', opacity: 0.08, bottom: '10%', left: '-5vw',
        animation: 'aurora4 26s ease-in-out infinite',
      }} />

      {/* Particle canvas on top */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.55, mixBlendMode: 'screen' }}
      />
      <div className="noise-overlay" />
    </div>
  );
}

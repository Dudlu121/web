import { useEffect, useRef } from 'react';

export function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Hexadecimal string generator setup for packet parsing look
    const hexChars = '0123456789ABCDEF'.split('');
    const fontSize = 14; 
    const columns = Math.ceil(width / fontSize);
    const rainDrops: number[] = [];
    const packetSpeeds: number[] = [];

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = Math.random() * -100; // Start offscreen randomly
      packetSpeeds[x] = (Math.random() * 0.4) + 0.1; // Extremely slow creeping speed
    }

    const mouse = { x: -1000, y: -1000 };

    const draw = () => {
      // Very slight opacity gives the "trailing fade" effect to old characters
      ctx.fillStyle = 'rgba(5, 5, 5, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        // Generate random Hex Byte
        const byte = hexChars[Math.floor(Math.random() * hexChars.length)] + 
                     hexChars[Math.floor(Math.random() * hexChars.length)];
        
        const xPos = i * fontSize;
        const yPos = rainDrops[i] * fontSize;

        // Interaction Logic: Decryption radius around the mouse
        const dx = mouse.x - xPos;
        const dy = mouse.y - yPos;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let isHighlight = false;
        
        // Random "Corrupted / Malicious Packets" that pop out periodically
        if (Math.random() > 0.995) {
          isHighlight = true;
          ctx.fillStyle = 'rgba(0, 240, 255, 0.8)'; // Cyan trace
          ctx.shadowBlur = 5;
          ctx.shadowColor = '#00F0FF';
        } else if (dist < 120) {
          // The "Decryption Lens" effect when hovering over data
          ctx.fillStyle = `rgba(223, 255, 0, ${1 - dist / 120})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#DFFF00';
        } else {
          // Standard dark ambient background stream
          ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
          ctx.shadowBlur = 0;
        }

        ctx.fillText(byte, xPos, yPos);

        // Reset the drop if it falls off the screen (with randomness to space them out)
        if (yPos > height && Math.random() > 0.98) {
          rainDrops[i] = 0;
          packetSpeeds[i] = (Math.random() * 0.4) + 0.1; 
        }

        // Advance downward slowly
        rainDrops[i] += packetSpeeds[i];
      }

      ctx.shadowBlur = 0; // Reset
      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-70"
    />
  );
}

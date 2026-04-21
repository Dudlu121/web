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
    const EASTER_EGGS = ["ROOT", "HACK", "SUDO", "AYUSH", "ZERO", "NMAP", "PWND", "THM"];
    const fontSize = 14; 
    const columns = Math.ceil(width / fontSize);
    
    interface Drop {
      y: number;
      speed: number;
      isEasterEgg: boolean;
      eggText: string;
      eggColor: string;
    }
    
    const drops: Drop[] = [];

    const getEggColor = () => {
      const colors = ['#00F0FF', '#DFFF00', '#FF3366', '#00FF66'];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    for (let x = 0; x < columns; x++) {
      drops[x] = {
        y: Math.random() * -100, // Start offscreen randomly
        speed: (Math.random() * 0.4) + 0.1, // Extremely slow creeping speed
        isEasterEgg: Math.random() > 0.98,
        eggText: EASTER_EGGS[Math.floor(Math.random() * EASTER_EGGS.length)],
        eggColor: getEggColor()
      };
    }

    const mouse = { x: -1000, y: -1000 };

    const draw = () => {
      // Very slight opacity gives the "trailing fade" effect to old characters
      ctx.fillStyle = 'rgba(5, 5, 5, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        
        let textToDraw = "";
        
        if (drop.isEasterEgg) {
           textToDraw = drop.eggText;
        } else {
           // Generate random Hex Byte
           textToDraw = hexChars[Math.floor(Math.random() * hexChars.length)] + 
                        hexChars[Math.floor(Math.random() * hexChars.length)];
        }
        
        const xPos = i * fontSize;
        const yPos = drop.y * fontSize;

        // Interaction Logic: Decryption radius around the mouse
        const dx = mouse.x - xPos;
        const dy = mouse.y - yPos;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (drop.isEasterEgg) {
          ctx.fillStyle = `rgba(${parseInt(drop.eggColor.slice(1,3), 16)}, ${parseInt(drop.eggColor.slice(3,5), 16)}, ${parseInt(drop.eggColor.slice(5,7), 16)}, 0.9)`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = drop.eggColor;
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

        ctx.fillText(textToDraw, xPos, yPos);

        // Reset the drop if it falls off the screen (with randomness to space them out)
        if (yPos > height && Math.random() > 0.98) {
          drop.y = 0;
          drop.speed = (Math.random() * 0.4) + 0.1; 
          drop.isEasterEgg = Math.random() > 0.985;
          if (drop.isEasterEgg) {
             drop.eggText = EASTER_EGGS[Math.floor(Math.random() * EASTER_EGGS.length)];
             drop.eggColor = getEggColor();
          }
        }

        // Advance downward slowly
        drop.y += drop.speed;
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

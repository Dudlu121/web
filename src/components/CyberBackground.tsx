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
    const EASTER_EGGS = [
      "ROOT", "HACK", "SUDO", "AYUSH", "ZERO", "NMAP", "PWND", "THM", 
      "SHELL", "CYBER", "PENTEST", "MALWARE", "WORM", "TROJAN", "CRYPTO",
      "HASH", "SALTS", "TOKEN", "BRUTE", "EXPLOIT", "STUXNET", "PHISH",
      "DOX", "SQLI", "XSS", "CSRF", "LOG4J", "HEURISTIC", "MITM", "DDoS",
      "REDACTED", "GHOST", "PROXY", "BYPASS", "DEBUG", "KERNEL", "BINARY",
      "NEURAL", "TRANSFORMER", "OPTIMIZER", "GRADIENT", "TENSOR", "GEMINI", 
      "LLAMA", "PYTORCH", "KERAS", "AUTOENCODER", "GAN", "MLOps",
      "me@ayushmohapatra.com"
    ];
    const fontSize = 14; 
    const columns = Math.ceil(width / fontSize);
    
    interface Drop {
      y: number;
      speed: number;
      isEasterEgg: boolean;
      eggText: string;
      eggColor: string;
      isHighlighted: boolean;
      highlightTimer: number;
      isSpecial: boolean;
    }
    
    const drops: Drop[] = [];

    const getEggColor = () => {
      const colors = ['#00F0FF', '#DFFF00', '#FF3366', '#00FF66', '#A020F0'];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    for (let x = 0; x < columns; x++) {
      const isEgg = Math.random() > 0.95;
      const eggText = isEgg ? EASTER_EGGS[Math.floor(Math.random() * EASTER_EGGS.length)] : "";
      drops[x] = {
        y: Math.random() * -100, // Start offscreen randomly
        speed: (Math.random() * 0.4) + 0.1, // Extremely slow creeping speed
        isEasterEgg: isEgg,
        eggText: eggText,
        eggColor: getEggColor(),
        isHighlighted: false,
        highlightTimer: 0,
        isSpecial: eggText === "me@ayushmohapatra.com"
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
        
        if (drop.isHighlighted) {
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 20;
          ctx.shadowColor = '#FFFFFF';
          drop.highlightTimer--;
          if (drop.highlightTimer <= 0) drop.isHighlighted = false;
        } else if (drop.isSpecial) {
          // Special rainbow shift for the email
          const hue = (Date.now() / 10) % 360;
          ctx.fillStyle = `hsla(${hue}, 100%, 70%, 1)`;
          ctx.shadowBlur = 15;
          ctx.shadowColor = `hsla(${hue}, 100%, 50%, 0.5)`;
        } else if (drop.isEasterEgg) {
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
        if (yPos > height && Math.random() > 0.97) { // Increased reset frequency (from 0.98)
          drop.y = 0;
          drop.speed = (Math.random() * 0.4) + 0.1; 
          drop.isEasterEgg = Math.random() > 0.96; // Increased probability (from 0.985)
          drop.isHighlighted = false;
          if (drop.isEasterEgg) {
             drop.eggText = EASTER_EGGS[Math.floor(Math.random() * EASTER_EGGS.length)];
             drop.eggColor = getEggColor();
             drop.isSpecial = drop.eggText === "me@ayushmohapatra.com";
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

    const handleMouseClick = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      
      // Disrupt data near click
      drops.forEach((drop, i) => {
        const xPos = i * fontSize;
        const yPos = drop.y * fontSize;
        const dx = clickX - xPos;
        const dy = clickY - yPos;
        if (Math.sqrt(dx*dx + dy*dy) < 150) {
          drop.isHighlighted = true;
          drop.highlightTimer = 30; // 30 frames of flash
          drop.speed += 0.5; // Temporarily speed up
        }
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-70"
    />
  );
}

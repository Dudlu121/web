import { useRef } from "react";

export const use3DTilt = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    const glare = ref.current.querySelector('.glare-effect') as HTMLElement;
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 245, 212, 0.2), transparent 40%)`;
      glare.style.opacity = '1';
    }
  };
  
  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    const glare = ref.current.querySelector('.glare-effect') as HTMLElement;
    if (glare) glare.style.opacity = '0';
  };
  
  return { ref, handleMouseMove, handleMouseLeave };
};

import { useEffect } from 'react';

export function useAnimatedFavicon(videoUrl: string) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.style.display = 'none';
    
    document.body.appendChild(video);
    
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    let animationFrameId: number;

    const drawFrame = () => {
      if (!ctx || video.paused || video.ended) return;
      
      ctx.clearRect(0, 0, 32, 32);
      ctx.save();
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(video, 0, 0, 32, 32);
      ctx.restore();
      
      link.href = canvas.toDataURL('image/png');
      
      animationFrameId = requestAnimationFrame(drawFrame);
    };

    video.addEventListener('play', () => {
      video.playbackRate = 2.0; // Speed up the animation
      animationFrameId = requestAnimationFrame(drawFrame);
    });

    video.play().catch(e => console.error("Favicon video autoplay failed:", e));

    return () => {
      video.pause();
      cancelAnimationFrame(animationFrameId);
      if (document.body.contains(video)) {
        document.body.removeChild(video);
      }
    };
  }, [videoUrl]);
}

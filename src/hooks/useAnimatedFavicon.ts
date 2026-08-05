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
    let lastDrawTime = 0;
    const fps = 10; // 10 FPS is highly optimized for favicons
    const fpsInterval = 1000 / fps;

    const drawFrame = (time: number) => {
      // If the tab is hidden/inactive, pause processing completely to save resources
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(drawFrame);
        return;
      }

      if (!ctx || video.paused || video.ended) {
        animationFrameId = requestAnimationFrame(drawFrame);
        return;
      }
      
      const elapsed = time - lastDrawTime;
      if (elapsed > fpsInterval) {
        lastDrawTime = time - (elapsed % fpsInterval);
        
        ctx.clearRect(0, 0, 32, 32);
        ctx.save();
        ctx.beginPath();
        ctx.arc(16, 16, 16, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(video, 0, 0, 32, 32);
        ctx.restore();
        
        // At 10 FPS on 32x32, toDataURL is instant (<0.05ms) and avoids task queue latency of toBlob
        link.href = canvas.toDataURL('image/png');
      }
      
      animationFrameId = requestAnimationFrame(drawFrame);
    };

    const startPlayback = () => {
      video.playbackRate = 1.5; // Optimized playback speed
      video.play().catch(e => console.log("Favicon video play deferred:", e));
    };

    video.addEventListener('canplay', startPlayback);
    
    // Autoplay policy bypass
    const handleInteraction = () => {
      startPlayback();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    animationFrameId = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener('canplay', startPlayback);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      video.pause();
      if (document.body.contains(video)) {
        document.body.removeChild(video);
      }
    };
  }, [videoUrl]);
}

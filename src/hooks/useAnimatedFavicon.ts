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
    const fps = 12; // 12 FPS is perfect for favicons
    const fpsInterval = 1000 / fps;
    let activeObjectURL: string | null = null;

    const drawFrame = (time: number) => {
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
        
        // Use asynchronous toBlob to prevent blocking the main thread
        canvas.toBlob((blob) => {
          if (!blob) return;
          const newUrl = URL.createObjectURL(blob);
          link.href = newUrl;
          
          // Free memory of the previous frame URL
          if (activeObjectURL) {
            URL.revokeObjectURL(activeObjectURL);
          }
          activeObjectURL = newUrl;
        }, 'image/png');
      }
      
      animationFrameId = requestAnimationFrame(drawFrame);
    };

    const startPlayback = () => {
      video.playbackRate = 1.5; // Slightly reduced playback speed to ease decoding load
      video.play().catch(e => console.log("Favicon video play deferred:", e));
    };

    video.addEventListener('canplay', startPlayback);
    
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
      if (activeObjectURL) {
        URL.revokeObjectURL(activeObjectURL);
      }
      if (document.body.contains(video)) {
        document.body.removeChild(video);
      }
    };
  }, [videoUrl]);
}

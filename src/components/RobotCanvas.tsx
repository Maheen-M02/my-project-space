import { useRef, useImperativeHandle, forwardRef, useEffect, useState } from 'react';

export interface RobotCanvasHandle {
  seekTo: (progress: number) => void;
}

interface RobotCanvasProps {
  onReady?: () => void;
}

const RobotCanvas = forwardRef<RobotCanvasHandle, RobotCanvasProps>(({ onReady }, ref) => {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const pendingRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      setReady(true);
      onReady?.();
      if (pendingRef.current !== null) {
        video.currentTime = pendingRef.current * video.duration;
        pendingRef.current = null;
      }
    };

    video.addEventListener('loadedmetadata', onLoaded);
    if (video.readyState >= 1) onLoaded();

    return () => video.removeEventListener('loadedmetadata', onLoaded);
  }, [onReady]);

  useImperativeHandle(ref, () => ({
    seekTo(progress: number) {
      const video = videoRef.current;
      if (!video) return;

      if (!ready || video.readyState < 1) {
        pendingRef.current = progress;
        return;
      }

      const target = progress * video.duration;
      if (Math.abs(video.currentTime - target) > 0.01) {
        video.currentTime = target;
      }
    },
  }), [ready]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      preload="auto"
      muted
      playsInline
      crossOrigin="anonymous"
    >
      <source src="/robot.webm" type="video/webm" />
      <source src="/robot.mp4" type="video/mp4" />
    </video>
  );
});

RobotCanvas.displayName = 'RobotCanvas';
export default RobotCanvas;

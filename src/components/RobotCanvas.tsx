import { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';

export interface RobotCanvasHandle {
  seekTo: (progress: number) => void;
}

interface RobotCanvasProps {
  onReady?: () => void;
}

const RobotCanvas = forwardRef<RobotCanvasHandle, RobotCanvasProps>(({ onReady }, ref) => {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const readyRef    = useRef(false);
  const rafRef      = useRef<number>(0);
  const seekingRef  = useRef(false);
  const nextTimeRef = useRef<number | null>(null); // pending seek target

  // Continuous paint loop — draws whatever frame the video is on right now
  const startPaintLoop = () => {
    const loop = () => {
      const canvas = canvasRef.current;
      const video  = videoRef.current;
      if (canvas && video && video.readyState >= 2) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const cw = canvas.width;
          const ch = canvas.height;
          const vw = video.videoWidth  || 1920;
          const vh = video.videoHeight || 1080;
          const scale = Math.max(cw / vw, ch / vh);
          const dw = vw * scale;
          const dh = vh * scale;
          ctx.drawImage(video, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  };

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Video setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      readyRef.current = true;
      video.currentTime = 0;
      startPaintLoop();
      onReady?.();
    };

    // When a seek finishes, immediately kick off the next pending seek
    const onSeeked = () => {
      seekingRef.current = false;
      if (nextTimeRef.current !== null) {
        const t = nextTimeRef.current;
        nextTimeRef.current = null;
        seekingRef.current = true;
        video.currentTime = t;
      }
    };

    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('seeked', onSeeked);
    if (video.readyState >= 1) onMeta();

    return () => {
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('seeked', onSeeked);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onReady]);

  useImperativeHandle(ref, () => ({
    seekTo(progress: number) {
      const video = videoRef.current;
      if (!video || !readyRef.current) return;

      const target = Math.max(0, Math.min(progress, 1)) * video.duration;

      if (seekingRef.current) {
        // Already seeking — queue this as the next target (drop intermediate ones)
        nextTimeRef.current = target;
      } else {
        seekingRef.current = true;
        video.currentTime = target;
      }
    },
  }));

  return (
    <>
      <video
        ref={videoRef}
        preload="auto"
        muted
        playsInline
        style={{ display: 'none' }}
      >
        <source src="/robot.webm" type="video/webm" />
        <source src="/robot.mp4"  type="video/mp4"  />
      </video>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />
    </>
  );
});

RobotCanvas.displayName = 'RobotCanvas';
export default RobotCanvas;

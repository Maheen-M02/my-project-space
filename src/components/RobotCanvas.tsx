import { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';

export interface RobotCanvasHandle {
  seekTo: (progress: number) => void;
}

interface RobotCanvasProps {
  onReady?: () => void;
}

const RobotCanvas = forwardRef<RobotCanvasHandle, RobotCanvasProps>(({ onReady }, ref) => {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const rafRef     = useRef<number>(0);
  const readyRef   = useRef(false);
  const progressRef = useRef(0);

  // Draw current video frame onto canvas
  const paint = () => {
    const canvas = canvasRef.current;
    const video  = videoRef.current;
    if (!canvas || !video || video.readyState < 2) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const vw = video.videoWidth  || 1920;
    const vh = video.videoHeight || 1080;

    // cover fit
    const scale = Math.max(cw / vw, ch / vh);
    const dw = vw * scale;
    const dh = vh * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(video, dx, dy, dw, dh);
  };

  // Resize canvas to fill screen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      paint();
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Set up video — hidden, just used as a decode source
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      readyRef.current = true;
      onReady?.();
      // Seek to frame 0 and paint immediately
      video.currentTime = 0;
    };

    // After each seek completes, paint the frame
    const onSeeked = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(paint);
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
      if (!video || !readyRef.current || video.readyState < 1) return;

      progressRef.current = progress;
      const target = progress * video.duration;

      // Only seek if delta is meaningful (avoids redundant decodes)
      if (Math.abs(video.currentTime - target) > 0.001) {
        video.currentTime = target;
        // paint() fires via the 'seeked' event
      }
    },
  }));

  return (
    <>
      {/* Hidden video — decode source only */}
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

      {/* Canvas — what the user actually sees */}
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

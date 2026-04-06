import { useRef, useImperativeHandle, forwardRef } from 'react';

export interface RobotCanvasHandle {
  seekTo: (progress: number) => void;
}

const RobotCanvas = forwardRef<RobotCanvasHandle>((_, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useImperativeHandle(ref, () => ({
    seekTo(progress: number) {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      video.currentTime = progress * video.duration;
    },
  }));

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      preload="auto"
      muted
      playsInline
      // no autoPlay — we control time manually via seekTo
    >
      <source src="/robot.webm" type="video/webm" />
      <source src="/robot.mp4" type="video/mp4" />
    </video>
  );
});

RobotCanvas.displayName = 'RobotCanvas';
export default RobotCanvas;

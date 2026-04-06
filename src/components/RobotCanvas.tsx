import { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';

export interface RobotCanvasHandle {
  drawFrame: (index: number) => void;
}

interface RobotCanvasProps {
  images: HTMLImageElement[];
}

const RobotCanvas = forwardRef<RobotCanvasHandle, RobotCanvasProps>(({ images }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  useImperativeHandle(ref, () => ({
    drawFrame(index: number) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const img = images[index];
      if (!img || !img.complete || !img.naturalWidth) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth  * scale;
      const dh = img.naturalHeight * scale;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    },
  }));

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
});

RobotCanvas.displayName = 'RobotCanvas';
export default RobotCanvas;

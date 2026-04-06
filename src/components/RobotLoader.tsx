import { useEffect, useState } from 'react';

const TOTAL_FRAMES = 192;

interface RobotLoaderProps {
  onComplete: (images: HTMLImageElement[]) => void;
}

const RobotLoader = ({ onComplete }: RobotLoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i).padStart(4, '0')}.png`;
      img.onload = img.onerror = () => {
        loaded++;
        setProgress(loaded);
        if (loaded === TOTAL_FRAMES) onComplete(images);
      };
      images.push(img);
    }
  }, [onComplete]);

  const pct = Math.round((progress / TOTAL_FRAMES) * 100);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020408]">
      <div className="absolute w-72 h-72 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-6 w-72">
        <p className="font-mono text-xs tracking-[0.3em] text-purple-400 uppercase">
          Initializing
        </p>
        <div className="w-full h-px bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, hsl(270 100% 65%), hsl(180 100% 50%))',
              boxShadow: '0 0 12px hsl(270 100% 65% / 0.8)',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
        <p className="font-mono text-3xl text-white tracking-widest">
          {pct}<span className="text-purple-400 text-xl">%</span>
        </p>
      </div>
    </div>
  );
};

export { TOTAL_FRAMES };
export default RobotLoader;

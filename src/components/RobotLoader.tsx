import { useEffect, useRef, useState } from 'react';

interface RobotLoaderProps {
  onComplete: (images: HTMLImageElement[]) => void;
}

const TOTAL_FRAMES = 192;

const RobotLoader = ({ onComplete }: RobotLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i).padStart(4, '0');
      img.src = `/frames/frame_${num}.png`;
      img.onload = img.onerror = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setLoaded(true);
          onComplete(images);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, [onComplete]);

  if (loaded) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020408]">
      {/* Glow orb */}
      <div className="absolute w-64 h-64 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 w-72">
        <p className="font-mono text-xs tracking-[0.3em] text-purple-400 uppercase">
          Initializing Robot
        </p>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, hsl(270 100% 65%), hsl(180 100% 50%))',
              boxShadow: '0 0 12px hsl(270 100% 65% / 0.8)',
            }}
          />
        </div>

        <p className="font-mono text-2xl text-white tracking-widest">
          {progress}<span className="text-purple-400">%</span>
        </p>

        <p className="font-mono text-[0.6rem] tracking-[0.2em] text-white/30 uppercase">
          Loading frames {progress * TOTAL_FRAMES / 100 | 0} / {TOTAL_FRAMES}
        </p>
      </div>
    </div>
  );
};

export { TOTAL_FRAMES };
export default RobotLoader;

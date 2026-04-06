import { useEffect, useRef, useState, useCallback } from 'react';
import RobotCanvas, { RobotCanvasHandle } from './RobotCanvas';

interface ScrollControllerProps {
  onAnimationComplete: (complete: boolean) => void;
}

// Computed lazily so window.innerHeight is always correct
const getScrollDistances = () => {
  const vh = window.innerHeight;
  return {
    frameScroll: vh * 4,   // scroll distance to play full video
    heroScroll:  vh * 1.5, // extra scroll for hero text reveal
  };
};

const ScrollController = ({ onAnimationComplete }: ScrollControllerProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<RobotCanvasHandle>(null);
  const rafRef      = useRef<number>(0);
  const distRef     = useRef({ frameScroll: 0, heroScroll: 0, total: 0 });

  const [showHint,      setShowHint]      = useState(true);
  const [blackOpacity,  setBlackOpacity]  = useState(0);
  const [textProgress,  setTextProgress]  = useState(0);
  const [canvasVisible, setCanvasVisible] = useState(true);
  const [videoReady,    setVideoReady]    = useState(false);

  // Compute distances once on mount
  useEffect(() => {
    const { frameScroll, heroScroll } = getScrollDistances();
    distRef.current = { frameScroll, heroScroll, total: frameScroll + heroScroll };
  }, []);

  const handleScroll = useCallback(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const { frameScroll, heroScroll, total } = distRef.current;
    if (!total) return;

    const containerTop = sentinel.getBoundingClientRect().top + window.scrollY;
    const scrolled     = Math.max(0, window.scrollY - containerTop);

    if (window.scrollY > 10) setShowHint(false);

    // ── Phase 1: seek video ───────────────────────────────────────────
    const frameProgress = Math.min(scrolled / frameScroll, 1);
    canvasRef.current?.seekTo(frameProgress);

    // ── Phase 2: black + hero text ────────────────────────────────────
    if (scrolled > frameScroll) {
      const hp = Math.min((scrolled - frameScroll) / heroScroll, 1);
      setBlackOpacity(Math.min(hp / 0.3, 1));
      setTextProgress(hp > 0.3 ? Math.min((hp - 0.3) / 0.7, 1) : 0);
    } else {
      setBlackOpacity(0);
      setTextProgress(0);
    }

    // ── Unmount overlay once past entire zone ─────────────────────────
    const pastZone = scrolled > total + window.innerHeight * 0.5;
    setCanvasVisible(!pastZone);
    onAnimationComplete(pastZone);
  }, [onAnimationComplete]);

  useEffect(() => {
    const onScroll = () => {
      // Call directly — no rAF batching, we want every scroll event to seek immediately
      handleScroll();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  const itemStyle = (start: number, end: number): React.CSSProperties => {
    const t = Math.max(0, Math.min((textProgress - start) / (end - start), 1));
    return { opacity: t, transform: `translateY(${(1 - t) * 24}px)` };
  };

  const { frameScroll, heroScroll } = distRef.current.total
    ? distRef.current
    : getScrollDistances();
  const totalScroll = frameScroll + heroScroll;

  return (
    <>
      {canvasVisible && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black">
            <RobotCanvas
              ref={canvasRef}
              onReady={() => setVideoReady(true)}
            />
            {/* vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.65) 100%)' }}
            />
          </div>

          {/* Video loading indicator */}
          {!videoReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black pointer-events-none">
              <div className="w-48 h-px bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full animate-pulse"
                  style={{ background: 'linear-gradient(90deg, hsl(270 100% 65%), hsl(180 100% 50%))', width: '60%' }}
                />
              </div>
              <p className="font-mono text-[0.6rem] tracking-[0.3em] text-white/30 uppercase mt-4">
                Loading
              </p>
            </div>
          )}

          {/* Black fade overlay */}
          <div
            className="absolute inset-0 bg-black pointer-events-none"
            style={{ opacity: blackOpacity }}
          />

          {/* Hero text */}
          {blackOpacity > 0.05 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none">
              <div style={itemStyle(0, 0.25)}>
                <p className="font-mono text-xs tracking-[0.35em] text-purple-400 uppercase mb-4 text-center">
                  Hello, I'm
                </p>
              </div>

              <div style={itemStyle(0.15, 0.45)}>
                <h1
                  className="font-mono font-black text-center leading-none mb-6"
                  style={{
                    fontSize: 'clamp(3rem, 9vw, 7rem)',
                    background: 'linear-gradient(135deg, hsl(270 100% 80%), hsl(320 100% 65%), hsl(180 100% 60%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 40px hsl(270 100% 65% / 0.6))',
                  }}
                >
                  Maheen
                </h1>
              </div>

              <div style={itemStyle(0.35, 0.65)}>
                <p
                  className="font-mono text-center text-white/70 tracking-wide max-w-xl mb-8"
                  style={{ fontSize: 'clamp(0.9rem, 2.2vw, 1.2rem)' }}
                >
                  Building intelligent systems &amp; immersive experiences
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-10" style={itemStyle(0.5, 0.75)}>
                {['AI Developer', 'Full-Stack Engineer', 'CS Student'].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.7rem] tracking-widest uppercase px-4 py-2 border border-purple-500/40 text-purple-300/80"
                    style={{ background: 'hsl(270 100% 65% / 0.08)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col items-center gap-2" style={itemStyle(0.7, 1)}>
                <p className="font-mono text-[0.6rem] tracking-[0.3em] text-white/30 uppercase">
                  Scroll to explore
                </p>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/40 animate-bounce">
                  <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          )}

          {/* Scroll hint */}
          {showHint && videoReady && blackOpacity === 0 && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
              <p className="font-mono text-[0.65rem] tracking-[0.3em] text-white/50 uppercase">
                Scroll to activate
              </p>
              <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-bounce" />
            </div>
          )}
        </div>
      )}

      {/* Scroll spacer */}
      <div ref={sentinelRef} style={{ height: `calc(100vh + ${totalScroll}px)` }} />
    </>
  );
};

export default ScrollController;

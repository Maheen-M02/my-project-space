import { useEffect, useRef, useState, useCallback } from 'react';
import { TOTAL_FRAMES } from './RobotLoader';
import RobotCanvas from './RobotCanvas';

interface ScrollControllerProps {
  images: HTMLImageElement[];
  onAnimationComplete: (complete: boolean) => void;
}

const FRAME_SCROLL   = typeof window !== 'undefined' ? window.innerHeight * 4 : 4000; // scroll to play all frames
const HERO_SCROLL    = typeof window !== 'undefined' ? window.innerHeight * 1.5 : 1500; // extra scroll for hero reveal
const TOTAL_SCROLL   = FRAME_SCROLL + HERO_SCROLL;

const ScrollController = ({ images, onAnimationComplete }: ScrollControllerProps) => {
  const sentinelRef        = useRef<HTMLDivElement>(null);
  const [frameIndex, setFrameIndex]       = useState(0);
  const [showHint, setShowHint]           = useState(true);
  // 0 = frames playing, 1 = black screen + hero fully visible
  const [heroPhase, setHeroPhase]         = useState(0);
  // 0→1 opacity of the black overlay
  const [blackOpacity, setBlackOpacity]   = useState(0);
  // staggered text reveals (0→1)
  const [textProgress, setTextProgress]   = useState(0);
  const [canvasVisible, setCanvasVisible] = useState(true);

  const rafRef          = useRef<number>(0);
  const targetFrameRef  = useRef(0);
  const currentFrameRef = useRef(0);

  const animateFrame = useCallback(() => {
    const diff = targetFrameRef.current - currentFrameRef.current;
    if (Math.abs(diff) > 0.5) {
      currentFrameRef.current += diff * 0.15;
      const idx = Math.round(currentFrameRef.current);
      setFrameIndex(Math.max(0, Math.min(idx, TOTAL_FRAMES - 1)));
      rafRef.current = requestAnimationFrame(animateFrame);
    } else {
      currentFrameRef.current = targetFrameRef.current;
      setFrameIndex(Math.max(0, Math.min(Math.round(currentFrameRef.current), TOTAL_FRAMES - 1)));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sentinel = sentinelRef.current;
      if (!sentinel) return;

      const containerTop = sentinel.getBoundingClientRect().top + window.scrollY;
      const scrolled     = window.scrollY - containerTop;

      if (window.scrollY > 10) setShowHint(false);

      // ── Phase 1: frame animation ──────────────────────────────────────
      const frameProgress = Math.max(0, Math.min(scrolled / FRAME_SCROLL, 1));
      targetFrameRef.current = frameProgress * (TOTAL_FRAMES - 1);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animateFrame);

      // ── Phase 2: hero reveal ──────────────────────────────────────────
      if (scrolled > FRAME_SCROLL) {
        const heroProgress = Math.min((scrolled - FRAME_SCROLL) / HERO_SCROLL, 1);

        // Black overlay fades in over first 30% of hero scroll
        setBlackOpacity(Math.min(heroProgress / 0.3, 1));

        // Text starts appearing after black is fully in (30%+)
        const tp = heroProgress > 0.3 ? Math.min((heroProgress - 0.3) / 0.7, 1) : 0;
        setTextProgress(tp);

        setHeroPhase(heroProgress >= 1 ? 1 : 0);
      } else {
        setBlackOpacity(0);
        setTextProgress(0);
        setHeroPhase(0);
      }

      // ── Unmount fixed overlay once past entire zone ───────────────────
      const pastZone = scrolled > TOTAL_SCROLL + window.innerHeight * 0.5;
      setCanvasVisible(!pastZone);
      onAnimationComplete(pastZone);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animateFrame, onAnimationComplete]);

  // Staggered text item helper — each item has an entry delay (0–1 within textProgress)
  const itemStyle = (start: number, end: number) => {
    const t = Math.max(0, Math.min((textProgress - start) / (end - start), 1));
    return {
      opacity: t,
      transform: `translateY(${(1 - t) * 24}px)`,
      transition: 'none', // driven by scroll, not CSS transition
    };
  };

  return (
    <>
      {canvasVisible && (
        <div className="fixed inset-0 z-40">
          {/* ── Robot canvas (always underneath) ── */}
          <div className="absolute inset-0 bg-black">
            <RobotCanvas frameIndex={frameIndex} images={images} />
            {/* vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.65) 100%)' }}
            />
            {/* purple glow mid-animation */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 60%, hsl(270 100% 65% / 0.1) 0%, transparent 70%)',
                opacity: frameIndex > TOTAL_FRAMES * 0.3 ? 1 : 0,
                transition: 'opacity 1s',
              }}
            />
          </div>

          {/* ── Black overlay (fades in after last frame) ── */}
          <div
            className="absolute inset-0 bg-black pointer-events-none"
            style={{ opacity: blackOpacity }}
          />

          {/* ── Hero text (scroll-driven stagger) ── */}
          {blackOpacity > 0.05 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none">

              {/* greeting */}
              <div style={itemStyle(0, 0.25)}>
                <p className="font-mono text-xs tracking-[0.35em] text-purple-400 uppercase mb-4 text-center">
                  Hello, I'm
                </p>
              </div>

              {/* name */}
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

              {/* subtitle */}
              <div style={itemStyle(0.35, 0.65)}>
                <p
                  className="font-mono text-center text-white/70 tracking-wide max-w-xl mb-8"
                  style={{ fontSize: 'clamp(0.9rem, 2.2vw, 1.2rem)' }}
                >
                  Building intelligent systems &amp; immersive experiences
                </p>
              </div>

              {/* role tags */}
              <div
                className="flex flex-wrap justify-center gap-3 mb-10"
                style={itemStyle(0.5, 0.75)}
              >
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

              {/* scroll cue */}
              <div
                className="flex flex-col items-center gap-2"
                style={itemStyle(0.7, 1)}
              >
                <p className="font-mono text-[0.6rem] tracking-[0.3em] text-white/30 uppercase">
                  Scroll to explore
                </p>
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  className="text-white/40 animate-bounce"
                >
                  <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          )}

          {/* ── Scroll hint (phase 1 only) ── */}
          {showHint && blackOpacity === 0 && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
              <p className="font-mono text-[0.65rem] tracking-[0.3em] text-white/50 uppercase">
                Scroll to activate
              </p>
              <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-bounce" />
            </div>
          )}

          {/* frame counter */}
          <div className="absolute top-4 right-4 font-mono text-[0.6rem] text-white/20 pointer-events-none">
            {String(frameIndex + 1).padStart(4, '0')} / {TOTAL_FRAMES}
          </div>
        </div>
      )}

      {/* Scroll spacer */}
      <div
        ref={sentinelRef}
        style={{ height: `calc(100vh + ${TOTAL_SCROLL}px)` }}
      />
    </>
  );
};

export default ScrollController;

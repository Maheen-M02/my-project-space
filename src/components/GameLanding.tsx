import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Typewriter hook ─────────────────────────────────────────── */
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

/* ─── Canvas Starfield ─────────────────────────────────────────── */
function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.3,
      speed: Math.random() * 0.4 + 0.08,
      alpha: Math.random(),
      twinkle: Math.random() * 0.02 + 0.005,
      dir: Math.random() > 0.5 ? 1 : -1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.alpha += s.twinkle * s.dir;
        if (s.alpha >= 1 || s.alpha <= 0) s.dir *= -1;
        s.y += s.speed;
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        const color = Math.random() > 0.85
          ? `rgba(180,120,255,${s.alpha})`
          : Math.random() > 0.7
          ? `rgba(0,255,255,${s.alpha})`
          : `rgba(255,255,255,${s.alpha})`;
        ctx.fillStyle = color;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}

/* ─── CSS 3-D spinning cube ────────────────────────────────────── */
function SpinningCube() {
  return (
    <div className="cube-scene" aria-hidden="true">
      <div className="cube">
        <div className="cube-face cube-front">
          <span className="cube-icon">⬡</span>
        </div>
        <div className="cube-face cube-back">
          <span className="cube-icon">✦</span>
        </div>
        <div className="cube-face cube-left">
          <span className="cube-icon">◈</span>
        </div>
        <div className="cube-face cube-right">
          <span className="cube-icon">⬟</span>
        </div>
        <div className="cube-face cube-top">
          <span className="cube-icon">◉</span>
        </div>
        <div className="cube-face cube-bottom">
          <span className="cube-icon">⊕</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Floating stat cards ──────────────────────────────────────── */
const STATS = [
  { icon: '⚡', label: 'Projects', value: '4' },
  { icon: '🎓', label: 'CS Year', value: '3rd' },
  { icon: '🤖', label: 'AI + Cloud', value: '88%' },
  { icon: '🌐', label: 'Stack Depth', value: '7+' },
];

/* ─── Pixel button ─────────────────────────────────────────────── */
function PixelButton({ onClick }: { onClick: () => void }) {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(true);
    setTimeout(onClick, 320);
  };

  return (
    <button
      id="enter-portfolio-btn"
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={handlePress}
      className={`pixel-btn ${pressed ? 'pixel-btn--pressed' : ''}`}
      aria-label="Enter Portfolio"
    >
      <span className="pixel-btn__blink">▶</span>
      <span className="pixel-btn__text">ENTER PORTFOLIO</span>
    </button>
  );
}

/* ─── Main component ───────────────────────────────────────────── */
const ROLES = ['AI Developer', 'Systems Builder', 'CS Student', 'Cloud Architect'];

export default function GameLanding() {
  const navigate = useNavigate();
  const role = useTypewriter(ROLES);
  const [flash, setFlash] = useState(false);
  const [xp, setXp] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Fake XP counter */
  useEffect(() => {
    const interval = setInterval(() => {
      setXp((v) => (v < 9999 ? v + Math.floor(Math.random() * 7) + 1 : 9999));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = useCallback(() => {
    setFlash(true);
    setTimeout(() => navigate('/portfolio'), 700);
  }, [navigate]);

  /* Mouse parallax on floating elements */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      el.style.setProperty('--px', `${dx}`);
      el.style.setProperty('--py', `${dy}`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      id="game-landing"
      className="game-landing"
      style={{ '--px': '0', '--py': '0' } as React.CSSProperties}
    >
      {/* Flash overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            key="flash"
            className="game-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
        )}
      </AnimatePresence>

      {/* Stars */}
      <Starfield />

      {/* Pixel grid */}
      <div className="pixel-grid" aria-hidden="true" />

      {/* Scanlines */}
      <div className="scanlines" aria-hidden="true" />

      {/* CRT vignette */}
      <div className="crt-vignette" aria-hidden="true" />

      {/* ── HUD TOP-LEFT ── */}
      <div className="hud hud--tl">
        <span className="hud__badge blink-text">[ SYSTEM ONLINE ]</span>
        <span className="hud__sub">maheen.meshram.dev</span>
      </div>

      {/* ── HUD TOP-RIGHT ── */}
      <div className="hud hud--tr">
        <div className="hud__xp">
          <span className="hud__xp-label">XP</span>
          <span className="hud__xp-val">{String(xp).padStart(4, '0')}</span>
        </div>
        <div className="hud__level">LVL 03 — CS STUDENT</div>
      </div>

      {/* ── LEFT MARQUEE ── */}
      <div className="tech-marquee" aria-hidden="true">
        <div className="tech-marquee__inner">
          {['React', 'Next.js', 'Node.js', 'Python', 'AWS', 'PostgreSQL', 'Gemini AI', 'TypeScript',
            'NLP', 'Computer Vision', 'REST APIs', 'System Design', 'Supabase', 'LangChain',
            'React', 'Next.js', 'Node.js', 'Python', 'AWS', 'PostgreSQL', 'Gemini AI', 'TypeScript'].map((t, i) => (
            <span key={i} className="tech-marquee__item">{t}</span>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="game-landing__main">
        {/* Corner brackets */}
        <div className="corner corner--tl" aria-hidden="true" />
        <div className="corner corner--tr" aria-hidden="true" />
        <div className="corner corner--bl" aria-hidden="true" />
        <div className="corner corner--br" aria-hidden="true" />

        {/* 3-D cube left */}
        <div
          className="cube-wrapper"
          style={{
            transform: `translate(calc(var(--px) * -18px), calc(var(--py) * -14px))`,
          }}
        >
          <SpinningCube />
        </div>

        {/* Hero text */}
        <div className="hero-text">
          <motion.p
            className="hero-text__pre font-mono"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-primary">{'>'}</span> initializing player one…
          </motion.p>

          <motion.h1
            className="hero-text__name glitch"
            data-text="MAHEEN MESHRAM"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: 'backOut' }}
          >
            MAHEEN MESHRAM
          </motion.h1>

          <motion.div
            className="hero-text__role"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <span className="text-primary">// </span>
            <span className="role-text">{role}</span>
            <span className="blink-text">_</span>
          </motion.div>

          {/* Stat cards */}
          <motion.div
            className="stats-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, staggerChildren: 0.1 }}
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="stat-card"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
              >
                <span className="stat-card__icon">{s.icon}</span>
                <span className="stat-card__value">{s.value}</span>
                <span className="stat-card__label">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* THE BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="btn-wrapper"
          >
            <PixelButton onClick={handleEnter} />
            <p className="btn-hint blink-text">[ PRESS START ]</p>
          </motion.div>
        </div>

        {/* Floating orbs (parallax) */}
        <div
          className="orb orb--purple"
          style={{ transform: `translate(calc(var(--px) * 30px), calc(var(--py) * 24px))` }}
        />
        <div
          className="orb orb--cyan"
          style={{ transform: `translate(calc(var(--px) * -24px), calc(var(--py) * 18px))` }}
        />
        <div
          className="orb orb--pink"
          style={{ transform: `translate(calc(var(--px) * 20px), calc(var(--py) * -16px))` }}
        />
      </main>

      {/* ── BOTTOM BAR ── */}
      <div className="hud hud--bot">
        <span className="font-mono text-xs text-primary/60">© 2025 MAHEEN MESHRAM</span>
        <span className="font-mono text-xs text-muted-foreground">BUILD v1.0.0-alpha</span>
        <span className="font-mono text-xs text-accent/60">AI • CLOUD • SYSTEMS</span>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorBlob = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main blob */}
      <motion.div
        className="pointer-events-none fixed z-50 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.5,
        }}
        transition={{ duration: 0.2 }}
      >
        <div 
          className="h-8 w-8 rounded-full animate-morph"
          style={{
            background: 'radial-gradient(circle, hsl(270 100% 65% / 0.8) 0%, hsl(180 100% 50% / 0.4) 50%, transparent 70%)',
            filter: 'blur(2px)',
          }}
        />
      </motion.div>
      
      {/* Glow trail */}
      <motion.div
        className="pointer-events-none fixed z-40"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div 
          className="h-40 w-40 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(270 100% 65% / 0.15) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      </motion.div>
    </>
  );
};

export default CursorBlob;

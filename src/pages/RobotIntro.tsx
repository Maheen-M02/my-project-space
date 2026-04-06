import { useState, useRef, useCallback } from 'react';
import RobotLoader from '@/components/RobotLoader';
import ScrollController from '@/components/ScrollController';
import Navbar3D from '@/components/Navbar3D';
import About3D from '@/components/About3D';
import Projects3D from '@/components/Projects3D';
import Contact3D from '@/components/Contact3D';
import Footer3D from '@/components/Footer3D';
import CursorBlob from '@/components/CursorBlob';

const RobotIntro = () => {
  const [ready, setReady] = useState(false);
  const [animComplete, setAnimComplete] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const handleLoadComplete = useCallback((images: HTMLImageElement[]) => {
    imagesRef.current = images;
    setReady(true);
  }, []);

  const handleAnimationComplete = useCallback((complete: boolean) => {
    setAnimComplete(complete);
  }, []);

  return (
    <div className="bg-[#020408] text-foreground">
      <div className="noise" />
      <CursorBlob />

      {/* Preloader */}
      {!ready && <RobotLoader onComplete={handleLoadComplete} />}

      {/* Robot scroll animation */}
      {ready && (
        <ScrollController
          images={imagesRef.current}
          onAnimationComplete={handleAnimationComplete}
        />
      )}

      {/* Portfolio content — always rendered, fades in after animation */}
      <div
        className="transition-opacity duration-1000"
        style={{ opacity: animComplete ? 1 : 0 }}
      >
        <Navbar3D />
        <main>
          <About3D />
          <Projects3D />
          <Contact3D />
        </main>
        <Footer3D />
      </div>
    </div>
  );
};

export default RobotIntro;

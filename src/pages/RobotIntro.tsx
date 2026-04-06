import { useState, useCallback } from 'react';
import ScrollController from '@/components/ScrollController';
import Navbar3D from '@/components/Navbar3D';
import About3D from '@/components/About3D';
import Projects3D from '@/components/Projects3D';
import Contact3D from '@/components/Contact3D';
import Footer3D from '@/components/Footer3D';
import CursorBlob from '@/components/CursorBlob';

const RobotIntro = () => {
  const [animComplete, setAnimComplete] = useState(false);

  const handleAnimationComplete = useCallback((complete: boolean) => {
    setAnimComplete(complete);
  }, []);

  return (
    <div className="bg-[#020408] text-foreground">
      <div className="noise" />
      <CursorBlob />

      <ScrollController onAnimationComplete={handleAnimationComplete} />

      {/* Portfolio — fades in after animation zone */}
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

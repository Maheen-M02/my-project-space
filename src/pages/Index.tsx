import Navbar3D from "@/components/Navbar3D";
import Hero3D from "@/components/Hero3D";
import About3D from "@/components/About3D";
import Projects3D from "@/components/Projects3D";
import Contact3D from "@/components/Contact3D";
import Footer3D from "@/components/Footer3D";
import CursorBlob from "@/components/CursorBlob";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Noise texture overlay */}
      <div className="noise" />
      
      {/* Custom cursor */}
      <CursorBlob />
      
      <Navbar3D />
      <main>
        <Hero3D />
        <About3D />
        <Projects3D />
        <Contact3D />
      </main>
      <Footer3D />
    </div>
  );
};

export default Index;

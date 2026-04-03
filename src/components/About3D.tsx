import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'React / Next.js', level: 90, color: 'from-neon-purple to-neon-pink' },
  { name: 'Node.js / Backend Systems', level: 85, color: 'from-neon-cyan to-neon-blue' },
  { name: 'AI Integration (NLP/CV)', level: 88, color: 'from-neon-pink to-neon-purple' },
  { name: 'AWS / Cloud Deployment', level: 80, color: 'from-neon-blue to-neon-cyan' },
  { name: 'Database Design (PostgreSQL)', level: 80, color: 'from-neon-purple to-neon-cyan' },
  { name: 'System Design & Architecture', level: 82, color: 'from-neon-cyan to-neon-pink' },
  { name: 'UI/UX Thinking', level: 70, color: 'from-neon-pink to-neon-blue' },
];

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Node.js / Express', 
  'Supabase', 'PostgreSQL', 'AWS (EC2, S3, Lambda)',
  'Gemini AI', 'Computer Vision', 'REST APIs', 'System Design'
];

const About3D = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!orbitRef.current) return;

    const items = orbitRef.current.querySelectorAll('.orbit-item');
    
    items.forEach((item, index) => {
      const angle = (index / items.length) * Math.PI * 2;
      const radius = 160;
      
      gsap.to(item, {
        duration: 20,
        repeat: -1,
        ease: 'none',
        motionPath: {
          path: [
            { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius * 0.4 },
            { x: Math.cos(angle + Math.PI / 2) * radius, y: Math.sin(angle + Math.PI / 2) * radius * 0.4 },
            { x: Math.cos(angle + Math.PI) * radius, y: Math.sin(angle + Math.PI) * radius * 0.4 },
            { x: Math.cos(angle + Math.PI * 1.5) * radius, y: Math.sin(angle + Math.PI * 1.5) * radius * 0.4 },
            { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius * 0.4 },
          ],
          curviness: 2,
        },
      });
    });
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-4">
            {'<About />'}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Who I <span className="text-neon">Am</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden group">
              {/* Gradient border on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 gradient-border" />
              
              <h3 className="text-2xl font-bold mb-6">
                AI Developer & Systems Builder
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I'm Maheen Meshram, a third-year Computer Science student focused on building 
                intelligent, real-world systems that solve meaningful problems. I specialize 
                in combining AI, full-stack development, and scalable cloud architecture to 
                create products that are not just functional—but impactful.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                From developing AI-powered platforms like NagarVani to building logistics 
                and material management systems, I enjoy turning complex ideas into scalable, 
                production-ready solutions. When I'm not coding, I'm exploring applied AI, 
                experimenting with automation, or building systems aligned with smart cities 
                and real-world efficiency.
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="px-4 py-2 text-sm font-mono bg-secondary/50 rounded-full border border-border hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills with animated bars */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <h3 className="text-xl font-bold mb-8 font-mono">
              <span className="text-primary">const</span> skills = [
            </h3>
            
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group"
              >
                <div className="flex justify-between mb-3">
                  <span className="font-medium group-hover:text-primary transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-muted-foreground font-mono text-sm">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.6 + index * 0.1, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative`}
                  >
                    <div className="absolute inset-0 animate-pulse-glow opacity-50" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
            
            <p className="text-muted-foreground font-mono text-sm">];</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About3D;

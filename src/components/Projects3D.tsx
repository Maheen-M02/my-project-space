import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useTiltEffect } from '@/hooks/useAnimations';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    tags: string[];
    image: string;
    github: string;
    demo: string;
    gradient: string;
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const tiltRef = useTiltEffect(10);

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
    >
      <div
        ref={tiltRef}
        className="relative glass rounded-2xl overflow-hidden cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Image container */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-60 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-40`}
          />

          {/* Hover overlay with links */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full glass border border-primary/30 hover:border-primary hover:glow-neon transition-all"
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full bg-primary text-primary-foreground hover:glow-neon transition-all"
            >
              <ExternalLink size={24} />
            </motion.a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-xl font-bold mb-3 group-hover:text-neon transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono bg-secondary/80 rounded-full border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(270 100% 65% / 0.3), transparent)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite',
            }}
          />
        </div>
      </div>
    </motion.article>
  );
};

const projects = [
  {
    title: 'NagarVani – AI Civic Grievance Platform',
    description: 'Multi-channel civic grievance system (Web + Voice via Vapi + WhatsApp) with AI-based complaint classification using NLP & CLIP. Smart triaging, duplicate detection, and priority assignment — reducing manual work by ~80%.',
    tags: ['React', 'Python', 'NLP', 'CLIP', 'Vapi', 'WhatsApp API'],
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=500&fit=crop',
    github: 'https://github.com/Maheen-M02/NAGARVANI-THE_CIVIC_SYSTEM.git',
    demo: 'https://nagarvani-the-civic-system.vercel.app/',
    gradient: 'from-emerald-900 to-teal-900',
  },
  {
    title: 'Factory Raw Material Management',
    description: 'Full-stack system tracking raw materials, cost, usage, stock, and production capacity with automatic profit/loss calculation. Multi-material product support and a built-in AI voice assistant.',
    tags: ['Next.js', 'PostgreSQL', 'AI Assistant', 'Voice UI'],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=500&fit=crop',
    github: 'https://github.com/Maheen-M02/NexStock_Next-Gen-Inventory-Intelligence_System.git',
    demo: '#',
    gradient: 'from-orange-900 to-amber-900',
  },
  {
    title: 'Agent Hub – Multi-Agent AI Platform',
    description: 'Orchestration platform coordinating multiple AI agents (planner, executor, analyzer) that autonomously break down tasks, assign subtasks, and execute them using integrated APIs, tools, and memory.',
    tags: ['Python', 'LangChain', 'FastAPI', 'React', 'Redis'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop',
    github: 'https://github.com/Maheen-M02/Agent_Hub.git',
    demo: '#',
    gradient: 'from-purple-900 to-violet-900',
  },
  {
    title: 'Logistics Management System',
    description: 'End-to-end logistics platform tracking shipment flow, inventory movement, and delivery status with AI-optimized routing and dispatching. Includes a real-time analytics dashboard for supply chain efficiency.',
    tags: ['React', 'Node.js', 'MongoDB', 'Maps API', 'AI Routing'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop',
    github: 'https://github.com/Maheen-M02/Logistics_Intelligence_System.git',
    demo: '#',
    gradient: 'from-cyan-900 to-blue-900',
  },
];

const Projects3D = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30">
        <div className="absolute inset-0 rounded-full border border-primary/10 animate-rotate-slow" />
        <div className="absolute inset-8 rounded-full border border-accent/10 animate-rotate-slow" style={{ animationDirection: 'reverse' }} />
        <div className="absolute inset-16 rounded-full border border-primary/5" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-4">
            {'<Projects />'}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Featured <span className="text-neon">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my passion for creating
            immersive, interactive digital experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
};

export default Projects3D;

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "NagarVani – AI Civic Grievance Platform",
    description: "Multi-channel civic grievance system (Web + Voice via Vapi + WhatsApp) with AI-based complaint classification using NLP & CLIP image analysis. Features smart triaging, duplicate detection, and priority assignment — reducing manual work by ~80%.",
    tags: ["React", "Python", "NLP", "CLIP", "Vapi", "WhatsApp API"],
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop",
    github: "https://github.com/Maheen-M02/NAGARVANI-THE_CIVIC_SYSTEM.git",
    demo: "https://nagarvani-the-civic-system.vercel.app/",
  },
  {
    title: "Factory Raw Material Management",
    description: "Full-stack system tracking raw materials, cost, usage, stock, and production capacity with automatic profit/loss calculation. Supports multiple materials per product and includes a built-in AI assistant with voice interaction.",
    tags: ["Next.js", "PostgreSQL", "AI Assistant", "Voice UI"],
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop",
    github: "https://github.com/Maheen-M02/NexStock_Next-Gen-Inventory-Intelligence_System.git",
    demo: "#",
  },
  {
    title: "Agent Hub – Multi-Agent AI Platform",
    description: "Orchestration platform that coordinates multiple AI agents (planner, executor, analyzer) to autonomously break down tasks, assign subtasks, and execute them. Integrates APIs, external tools, and persistent memory.",
    tags: ["Python", "LangChain", "FastAPI", "React", "Redis"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop",
    github: "https://github.com/Maheen-M02/Agent_Hub.git",
    demo: "#",
  },
  {
    title: "Logistics Management System",
    description: "End-to-end logistics platform tracking shipment flow, inventory movement, and delivery status with AI-optimized routing and dispatching. Includes a real-time analytics dashboard for supply chain efficiency.",
    tags: ["React", "Node.js", "MongoDB", "Maps API", "AI Routing"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
    github: "https://github.com/Maheen-M02/Logistics_Intelligence_System.git",
    demo: "#",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">
            Featured Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Projects I've Built
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group bg-card rounded-2xl overflow-hidden card-hover"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 bg-secondary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github size={16} />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink size={16} />
                    Demo
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

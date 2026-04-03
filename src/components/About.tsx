import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "React / Next.js", level: 90 },
  { name: "Node.js / Backend Systems", level: 85 },
  { name: "AI Integration (NLP/CV)", level: 88 },
  { name: "AWS / Cloud Deployment", level: 80 },
  { name: "Database Design (PostgreSQL)", level: 80 },
  { name: "System Design & Architecture", level: 82 },
  { name: "UI/UX Thinking", level: 70 },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-secondary/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">
              About Me
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              AI Developer & Systems Builder
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              I'm Maheen Meshram, a third-year Computer Science student focused on building 
              intelligent, real-world systems that solve meaningful problems. I specialize 
              in combining AI, full-stack development, and scalable cloud architecture to 
              create products that are not just functional—but impactful.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              From developing AI-powered platforms like NagarVani to building logistics 
              and material management systems, I enjoy turning complex ideas into scalable, 
              production-ready solutions. When I'm not coding, I'm exploring applied AI, 
              experimenting with automation, or building systems aligned with smart cities 
              and real-world efficiency.
            </p>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-8">Skills & Technologies</h3>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                    className="h-full bg-accent rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

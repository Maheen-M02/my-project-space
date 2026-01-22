import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const socials = [
  { name: "Email", icon: Mail, href: "mailto:alex@example.com", label: "alex@example.com" },
  { name: "GitHub", icon: Github, href: "https://github.com", label: "@alexchen" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", label: "Alex Chen" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com", label: "@alexchen_dev" },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding bg-primary text-primary-foreground" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">
            Get in Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Let's Work Together
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            I'm currently looking for internship opportunities and freelance projects. 
            Whether you have a question or just want to say hi, I'll do my best to get back to you!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target={social.name !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="group flex flex-col items-center gap-3 p-6 bg-primary-foreground/5 rounded-2xl hover:bg-primary-foreground/10 transition-colors"
            >
              <social.icon size={24} className="text-accent" />
              <span className="font-medium">{social.name}</span>
              <span className="text-sm text-primary-foreground/60">{social.label}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

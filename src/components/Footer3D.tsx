import { motion } from 'framer-motion';

const Footer3D = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 border-t border-border overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/10 blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold">
              MM<span className="text-neon">.</span>
            </span>
            <span className="text-muted-foreground text-sm">
              © {currentYear} All rights reserved
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            {['About', 'Projects', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ y: -2 }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* Status */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for work
          </div>
        </div>

        {/* Decorative code */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8 text-muted-foreground/50 font-mono text-xs"
        >
          {'</'} Built with passion, React & Three.js {' />'}
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer3D;

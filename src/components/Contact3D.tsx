import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle } from 'lucide-react';

const socials = [
  { name: 'Email', icon: Mail, href: 'mailto:maheenmeshram.2115@gmail.com', color: 'hover:text-neon-purple' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/Maheen-M02', color: 'hover:text-neon-cyan' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/maheen-meshram-965066284/', color: 'hover:text-neon-blue' },
  { name: 'X', icon: Twitter, href: 'https://x.com/maheenmeshram02', color: 'hover:text-neon-pink' },
];

const Contact3D = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-4">
            {'<Contact />'}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Let's <span className="text-neon">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you.
            Let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name field */}
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-6 py-4 bg-secondary/50 rounded-xl border border-border focus:border-primary/50 outline-none transition-all duration-300 peer placeholder-transparent"
                  placeholder="Your Name"
                />
                <label
                  htmlFor="name"
                  className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                    formState.name || focusedField === 'name'
                      ? '-top-3 text-xs text-primary bg-background px-2'
                      : 'top-4 text-muted-foreground'
                  }`}
                >
                  Your Name
                </label>
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-500 ${focusedField === 'name' ? 'w-full' : 'w-0'}`} />
              </div>

              {/* Email field */}
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-6 py-4 bg-secondary/50 rounded-xl border border-border focus:border-primary/50 outline-none transition-all duration-300 placeholder-transparent"
                  placeholder="your@email.com"
                />
                <label
                  htmlFor="email"
                  className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                    formState.email || focusedField === 'email'
                      ? '-top-3 text-xs text-primary bg-background px-2'
                      : 'top-4 text-muted-foreground'
                  }`}
                >
                  Email Address
                </label>
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-500 ${focusedField === 'email' ? 'w-full' : 'w-0'}`} />
              </div>

              {/* Message field */}
              <div className="relative group">
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  className="w-full px-6 py-4 bg-secondary/50 rounded-xl border border-border focus:border-primary/50 outline-none transition-all duration-300 resize-none placeholder-transparent"
                  placeholder="Your message..."
                />
                <label
                  htmlFor="message"
                  className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                    formState.message || focusedField === 'message'
                      ? '-top-3 text-xs text-primary bg-background px-2'
                      : 'top-4 text-muted-foreground'
                  }`}
                >
                  Your Message
                </label>
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-500 ${focusedField === 'message' ? 'w-full' : 'w-0'}`} />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-liquid group relative overflow-hidden"
                disabled={isSubmitted}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-primary-foreground">
                  {isSubmitted ? (
                    <>
                      <CheckCircle size={20} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links & Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

              <h3 className="text-2xl font-bold mb-6 relative">
                Or find me on
              </h3>
              
              <div className="grid grid-cols-2 gap-4 relative">
                {socials.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target={social.name !== 'Email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`flex items-center gap-3 p-4 bg-secondary/50 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 ${social.color}`}
                  >
                    <social.icon size={24} />
                    <span className="font-medium">{social.name}</span>
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-border relative">
                <p className="text-muted-foreground">
                  <span className="text-primary font-mono">{'>'}</span> Based in Pune, India
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="text-primary font-mono">{'>'}</span> Available for freelance & internships
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact3D;

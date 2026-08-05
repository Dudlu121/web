import { BookOpen, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { use3DTilt } from "../../hooks/use3DTilt";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function PublicationsSection() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const { ref: ref1, handleMouseMove: move1, handleMouseLeave: leave1 } = use3DTilt();
  const { ref: ref2, handleMouseMove: move2, handleMouseLeave: leave2 } = use3DTilt();

  return (
    <section ref={ref} className="mb-48 relative z-10">
      <div className="font-mono text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase mb-16 flex items-center gap-4">
        <div className="w-24 h-[1px] bg-white/20" />
        Publications & Reviews
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <motion.button
          ref={ref1 as any}
          onClick={() => navigate('/writeups')}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
          onMouseMove={move1 as any}
          onMouseLeave={leave1}
          style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s' }}
          className="glass-panel p-8 rounded-[2rem] group relative overflow-hidden border border-white/5 hover:border-cyber-blue/50 text-left w-full cursor-pointer h-full"
        >
          <div className="absolute inset-0 bg-cyber-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="glare-effect absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-300 mix-blend-screen" />
          
          <div className="relative z-10 flex flex-col h-full" style={{ transform: 'translateZ(30px)' }}>
            <div className="w-12 h-12 rounded-full bg-cyber-blue/10 flex items-center justify-center border border-cyber-blue/30 text-cyber-blue shadow-[0_0_20px_rgba(0,245,212,0.2)] mb-6">
              <BookOpen size={24} />
            </div>
            
            <h3 className="font-sans text-2xl font-black text-white tracking-tight group-hover:text-cyber-blue transition-colors duration-500 mb-3">
              Writeups
            </h3>
            
            <p className="font-sans text-white/60 text-sm leading-relaxed flex-1">
              CTF walkthroughs, room guides, and deep dives.
            </p>
          </div>
        </motion.button>

        <motion.button
          ref={ref2 as any}
          onClick={() => navigate('/reviews')}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          onMouseMove={move2 as any}
          onMouseLeave={leave2}
          style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s' }}
          className="glass-panel p-8 rounded-[2rem] group relative overflow-hidden border border-white/5 hover:border-cyber-blue/50 text-left w-full cursor-pointer h-full"
        >
          <div className="absolute inset-0 bg-cyber-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="glare-effect absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-300 mix-blend-screen" />
          
          <div className="relative z-10 flex flex-col h-full" style={{ transform: 'translateZ(30px)' }}>
            <div className="w-12 h-12 rounded-full bg-cyber-blue/10 flex items-center justify-center border border-cyber-blue/30 text-cyber-blue shadow-[0_0_20px_rgba(0,245,212,0.2)] mb-6">
              <Award size={24} />
            </div>
            
            <h3 className="font-sans text-2xl font-black text-white tracking-tight group-hover:text-cyber-blue transition-colors duration-500 mb-3">
              Reviews
            </h3>
            
            <p className="font-sans text-white/60 text-sm leading-relaxed flex-1">
              Honest thoughts and guides for security certs.
            </p>
          </div>
        </motion.button>

        <motion.button
          onClick={() => navigate('/certifications')}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
          className="glass-panel p-8 rounded-[2rem] group relative overflow-hidden border border-white/5 hover:border-cyber-blue/50 text-left w-full cursor-pointer h-full"
        >
          <div className="absolute inset-0 bg-cyber-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-12 h-12 rounded-full bg-cyber-blue/10 flex items-center justify-center border border-cyber-blue/30 text-cyber-blue shadow-[0_0_20px_rgba(0,245,212,0.2)] mb-6">
              <Award size={24} />
            </div>
            
            <h3 className="font-sans text-2xl font-black text-white tracking-tight group-hover:text-cyber-blue transition-colors duration-500 mb-3">
              Certifications
            </h3>
            
            <p className="font-sans text-white/60 text-sm leading-relaxed flex-1">
              A complete list of my completions and badges.
            </p>
          </div>
        </motion.button>

      </div>
    </section>
  );
}

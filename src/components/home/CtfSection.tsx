import { motion, useInView } from "motion/react";
import { Flag } from "lucide-react";
import { CTFS } from "../../data/portfolio";
import { use3DTilt } from "../../hooks/use3DTilt";

export function CtfSection() {
  return (
    <section id="ctfs" className="mb-48 relative z-10">
      <div className="font-mono text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase mb-16 flex items-center gap-4">
        <div className="w-24 h-[1px] bg-white/20" />
        Competitive Cybersecurity
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CTFS.map((ctf, i) => {
          const { ref, handleMouseMove, handleMouseLeave } = use3DTilt();
          const isInView = useInView(ref, { once: true, margin: "-100px" });

          return (
            <motion.div
              ref={ref}
              key={i}
              initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' }}
              className="glass-panel p-10 rounded-[2rem] relative group cursor-crosshair border border-white/10 hover:border-cyber-blue/40"
            >
              <div className="glare-effect absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-300 mix-blend-screen rounded-[2rem]" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyber-blue/5 blur-[60px] rounded-full group-hover:bg-cyber-blue/20 transition-all duration-700 pointer-events-none" />
              
              <div className="relative z-10" style={{ transform: 'translateZ(40px)' }}>
                <div className="flex justify-between items-start mb-12">
                  <div className="font-mono text-xs uppercase tracking-widest text-cyber-blue bg-cyber-blue/10 px-4 py-2 rounded-full border border-cyber-blue/20">
                    {ctf.org} • {ctf.date}
                  </div>
                  <Flag className="text-white/20 group-hover:text-cyber-blue transition-colors" size={32} />
                </div>
                
                <h3 className="font-sans text-4xl md:text-5xl font-black text-white mb-6 group-hover:text-gradient-alt transition-colors">
                  {ctf.title}
                </h3>
                
                <div className="flex flex-col gap-4">
                  <div className="font-mono text-2xl md:text-3xl font-bold text-cyber-blue drop-shadow-[0_0_10px_rgba(0,245,212,0.4)]">
                    {ctf.rank}
                  </div>
                  <p className="font-sans text-lg text-white/60 font-light leading-relaxed">
                    {ctf.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

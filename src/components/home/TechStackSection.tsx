import { motion, useInView } from "motion/react";
import { TECH_STACK } from "../../data/portfolio";
import { use3DTilt } from "../../hooks/use3DTilt";

export function TechStackSection() {
  return (
    <section className="mb-48 relative z-10">
      <div className="font-mono text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase mb-16 flex items-center gap-4">
        <div className="w-24 h-[1px] bg-white/20" />
        Tech Stack & Arsenal
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TECH_STACK.map((stack, i) => {
          const { ref, handleMouseMove, handleMouseLeave } = use3DTilt();
          const isStackInView = useInView(ref, { once: true, margin: "-50px" });

          return (
            <motion.div
              ref={ref}
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isStackInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s' }}
              className="glass-panel p-8 rounded-[2rem] group relative border border-white/5 hover:border-cyber-blue/30"
            >
              <div className="glare-effect absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-300 mix-blend-screen" />
              
              <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-cyber-blue">
                    <stack.icon size={20} />
                  </div>
                  <h4 className="font-sans text-xl font-bold text-white tracking-tight">{stack.category}</h4>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {stack.skills.map((skill, j) => (
                    <div key={j} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg font-mono text-xs text-white/70 hover:text-white hover:border-cyber-blue/50 hover:bg-cyber-blue/10 transition-all cursor-default">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

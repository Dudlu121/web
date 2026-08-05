import { motion, useInView } from "motion/react";
import { FileText, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WRITEUPS_DATA } from "../../data/writeups";
import { use3DTilt } from "../../hooks/use3DTilt";

export function WriteupsSection() {
  const navigate = useNavigate();

  return (
    <section className="mb-48 relative z-10">
      <div className="font-mono text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase mb-16 flex items-center gap-4">
        <div className="w-24 h-[1px] bg-white/20" />
        Writeups & Publications
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.values(WRITEUPS_DATA).map((writeup, i) => {
          const { ref, handleMouseMove, handleMouseLeave } = use3DTilt();
          const isWriteupInView = useInView(ref, { once: true, margin: "-50px" });

          return (
            <motion.button
              ref={ref as any}
              key={writeup.id}
              onClick={() => navigate(`/writeups/${writeup.id}`)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isWriteupInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              onMouseMove={handleMouseMove as any}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s' }}
              className="glass-panel p-10 rounded-[2rem] group relative overflow-hidden border border-white/5 hover:border-cyber-blue/20 block text-left w-full cursor-pointer"
            >
              <div className="glare-effect absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-300 mix-blend-screen" />
              
              <div className="relative z-10 flex flex-col h-full" style={{ transform: 'translateZ(20px)' }}>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white/50 group-hover:text-cyber-blue group-hover:scale-110 transition-all duration-500">
                    <FileText size={24} />
                  </div>
                  <ArrowUpRight size={24} className="text-white/20 group-hover:text-cyber-blue transition-colors" />
                </div>
                
                <h4 className="font-sans text-xl font-bold text-white tracking-tight mb-4 group-hover:text-white transition-colors">{writeup.title}</h4>
                <p className="font-sans text-white/50 text-sm leading-relaxed font-light mb-6 flex-1">{writeup.desc}</p>
                
                <div className="font-mono text-[10px] text-cyber-blue uppercase tracking-widest mt-auto">
                  Read Document | {writeup.platform}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

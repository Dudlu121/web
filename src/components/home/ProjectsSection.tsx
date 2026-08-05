import { motion, useInView } from "motion/react";
import { ArrowUpRight, Terminal as TerminalIcon } from "lucide-react";
import { PROJECTS } from "../../data/portfolio";
import { use3DTilt } from "../../hooks/use3DTilt";

export function ProjectsSection() {
  return (
    <section id="projects" className="mb-48 relative z-10">
      <div className="font-mono text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase mb-16 flex items-center gap-4">
        <div className="w-24 h-[1px] bg-white/20" />
        Selected Systems & Repositories
      </div>

      <div className="flex flex-col gap-12">
        {PROJECTS.map((proj, i) => {
          const { ref, handleMouseMove, handleMouseLeave } = use3DTilt();
          const isInView = useInView(ref, { once: true, margin: "-100px" });

          return (
            <motion.a
              key={proj.id}
              ref={ref as any}
              href={proj.comingSoon ? undefined : proj.link}
              target={proj.comingSoon ? undefined : "_blank"}
              rel="noreferrer"
              onClick={(e) => { if (proj.comingSoon) e.preventDefault(); }}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
              onMouseMove={handleMouseMove as any}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' }}
              className={`group relative block w-full p-8 md:p-12 glass-panel rounded-[2rem] border border-white/5 ${
                proj.comingSoon ? 'cursor-default opacity-70' : 'hover:border-cyber-blue/30 cursor-pointer'
              }`}
            >
              <div className="glare-effect absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-300 mix-blend-screen rounded-[2rem]" />
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8" style={{ transform: 'translateZ(30px)' }}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="inline-flex items-center gap-2 font-mono text-[10px] text-cyber-blue tracking-widest uppercase bg-cyber-blue/5 px-3 py-1 rounded-full border border-cyber-blue/20">
                      <TerminalIcon size={12} /> {proj.stack}
                    </div>
                    {proj.comingSoon && (
                      <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-accent tracking-widest uppercase bg-accent/5 px-3 py-1 rounded-full border border-accent/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        Coming Soon
                      </div>
                    )}
                  </div>
                  <h3 className="font-sans text-3xl md:text-5xl font-black text-white tracking-tight mb-4 group-hover:text-gradient-alt transition-colors">
                    {proj.title}
                  </h3>
                  <p className="font-sans text-base md:text-xl text-white/70 leading-relaxed max-w-3xl font-light">
                    {proj.desc}
                  </p>
                </div>
                <div className={`w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 transition-all duration-500 shrink-0 ${
                  proj.comingSoon ? '' : 'group-hover:bg-cyber-blue group-hover:text-black group-hover:scale-110'
                }`}>
                  <ArrowUpRight size={32} />
                </div>
              </div>
            </motion.a>
          )
        })}
      </div>
    </section>
  );
}

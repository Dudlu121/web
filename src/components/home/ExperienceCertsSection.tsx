import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Award, Briefcase, ChevronRight } from "lucide-react";
import { EXPERIENCE, CTFS, HIGHLIGHT_CERTS } from "../../data/portfolio";
import { use3DTilt } from "../../hooks/use3DTilt";
import { TelemetrySection } from "./TelemetrySection";

export function ExperienceCertsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="mb-48 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24">
      {/* Experience & CTFs */}
      <div>
        <div className="font-mono text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase mb-16 flex items-center gap-4">
          <div className="w-24 h-[1px] bg-white/20" />
          Experience & Achievements
        </div>

        <div className="space-y-12">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative pl-8 border-l border-white/10 group"
            >
              <div className="absolute left-0 top-0 w-[1px] h-0 bg-cyber-blue group-hover:h-full transition-all duration-500" />
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-cyber-blue shadow-[0_0_10px_rgba(0,245,212,0.5)]" />
              
              <div className="flex items-center gap-3 mb-2 text-cyber-blue font-mono text-xs uppercase tracking-widest">
                <Briefcase size={14} />
                {exp.date}
              </div>
              <h4 className="font-sans text-xl font-bold text-white tracking-tight mb-1">{exp.title}</h4>
              <p className="font-mono text-sm text-white/50">{exp.org}</p>
            </motion.div>
          ))}

          {CTFS.map((ctf, i) => (
            <motion.div
              key={ctf.title}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
              className="relative pl-8 border-l border-white/10 group mt-12"
            >
              <div className="absolute left-0 top-0 w-[1px] h-0 bg-accent group-hover:h-full transition-all duration-500" />
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,42,109,0.5)]" />
              
              <div className="flex items-center gap-3 mb-2 text-accent font-mono text-xs uppercase tracking-widest">
                <Award size={14} />
                {ctf.date} | {ctf.rank}
              </div>
              <h4 className="font-sans text-xl font-bold text-white tracking-tight mb-1">{ctf.title}</h4>
              <p className="font-mono text-sm text-white/50">{ctf.org}</p>
              <p className="font-sans text-sm text-white/40 mt-3 leading-relaxed">{ctf.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certifications Highlights */}
      <div>
        <TelemetrySection />

        <div className="font-mono text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase mb-16 mt-16 flex items-center gap-4">
          <div className="w-24 h-[1px] bg-white/20" />
          Top Certifications
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HIGHLIGHT_CERTS.map((cert, i) => {
            const { ref, handleMouseMove, handleMouseLeave } = use3DTilt();
            const isCertInView = useInView(ref, { once: true, margin: "-50px" });

            return (
              <motion.div
                ref={ref}
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isCertInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transformStyle: 'preserve-3d', transition: 'transform 0.3s' }}
                className="group p-6 glass-panel rounded-2xl cursor-crosshair overflow-hidden relative border border-white/5 hover:border-cyber-blue/40"
              >
                <div className="glare-effect absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-300 mix-blend-screen" />
                
                <div className="relative z-10 flex flex-col gap-3" style={{ transform: 'translateZ(10px)' }}>
                  <div className="flex items-center gap-3">
                    <Award size={18} className="text-cyber-blue/50 group-hover:text-cyber-blue transition-colors shrink-0" />
                    <span className="font-sans text-sm md:text-base font-bold text-white/90 group-hover:text-white transition-colors leading-tight">
                      {cert.name}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1 pl-7">
                    <div className="font-mono text-[10px] uppercase text-white/40 flex justify-between tracking-widest">
                      <span className="text-cyber-blue/70">{cert.org}</span>
                      {cert.date && <span>{cert.date}</span>}
                    </div>
                    {cert.id && cert.id !== "Certificate" && (
                      <div className="font-mono text-[9px] text-white/30 uppercase tracking-widest mt-1 group-hover:text-white/60 transition-colors break-all">
                        ID: {cert.id}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
}

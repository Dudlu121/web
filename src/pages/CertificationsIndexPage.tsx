import { motion } from "motion/react";
import { Award } from "lucide-react";
import { PRO_CERTS, HIGH_VALUE_CERTS, COMPLETION_CERTS, CTFS } from "../data/portfolio";
import { use3DTilt } from "../hooks/use3DTilt";

const renderCertGrid = (certs: any[]) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
      {certs.map((cert, i) => {
        const { ref, handleMouseMove, handleMouseLeave } = use3DTilt();

        return (
          <motion.div
            ref={ref as any}
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (i % 10) * 0.05 }}
            onMouseMove={handleMouseMove as any}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s' }}
            className="glass-panel p-6 rounded-2xl group relative overflow-hidden border border-white/5 hover:border-cyber-blue/30 cursor-default"
          >
            <div className="absolute inset-0 bg-cyber-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="glare-effect absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-300 mix-blend-screen" />
            
            <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/50 group-hover:text-cyber-blue group-hover:scale-110 transition-all duration-500">
                  <Award size={20} />
                </div>
              </div>
              
              <h4 className="font-sans text-lg font-bold text-white tracking-tight mb-2 group-hover:text-white transition-colors">
                {cert.title || cert.name}
              </h4>
              
              {cert.desc && (
                <p className="font-sans text-white/50 text-xs mt-2 mb-4 leading-relaxed line-clamp-3">
                  {cert.desc}
                </p>
              )}
              
              <div className="flex items-center gap-2 font-mono text-[10px] text-white/40 uppercase tracking-widest mt-4">
                <span className="text-cyber-blue bg-cyber-blue/10 px-2 py-1 rounded-md border border-cyber-blue/20">{cert.org}</span>
                {(cert.date || cert.rank) && (
                  <span>• {cert.date || cert.rank}</span>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export function CertificationsIndexPage() {
  return (
    <div className="w-full flex justify-center pb-48">
      <div className="w-full max-w-7xl px-6 md:px-12 flex flex-col pt-[25vh]">
        
        <div className="font-mono text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase mb-16 flex items-center gap-4">
          <div className="w-24 h-[1px] bg-white/20" />
          CTF Achievements
        </div>
        {renderCertGrid(CTFS)}

        <div className="font-mono text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase mb-16 flex items-center gap-4">
          <div className="w-24 h-[1px] bg-white/20" />
          Professional Certifications
        </div>
        {renderCertGrid(PRO_CERTS)}

        <div className="font-mono text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase mb-16 flex items-center gap-4">
          <div className="w-24 h-[1px] bg-white/20" />
          High-Value Certifications
        </div>
        {renderCertGrid(HIGH_VALUE_CERTS)}

        <div className="font-mono text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase mb-16 flex items-center gap-4">
          <div className="w-24 h-[1px] bg-white/20" />
          Completion Certifications & Badges
        </div>
        {renderCertGrid(COMPLETION_CERTS)}

        <div className="mt-24 text-center font-mono text-sm text-white/20 italic tracking-widest">
          // got all these might as well drop here
        </div>
      </div>
    </div>
  );
}

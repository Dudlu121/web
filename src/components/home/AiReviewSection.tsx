import { Award, ArrowUpRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AiReviewSection() {
  const navigate = useNavigate();

  return (
    <section className="mb-48 relative z-10 flex flex-col gap-8">
      <button 
        onClick={() => navigate('/reviews/thm-ai-cert')}
        className="w-full group glass-panel p-8 md:p-16 rounded-[2rem] border border-cyber-blue/20 relative overflow-hidden text-left cursor-pointer transition-all duration-500 hover:border-cyber-blue/50"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 bg-cyber-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
          <div className="w-16 h-16 rounded-full bg-cyber-blue/10 flex items-center justify-center border border-cyber-blue/30 text-cyber-blue shadow-[0_0_20px_rgba(0,245,212,0.2)] group-hover:scale-110 transition-transform duration-500">
            <Award size={32} />
          </div>
          
          <h3 className="font-sans text-3xl md:text-5xl font-black text-white tracking-tight group-hover:text-cyber-blue transition-colors duration-500">
            TryHackMe AI Security Review
          </h3>
          
          <div className="font-mono text-xs uppercase tracking-widest text-cyber-blue/70">
            Consolidated insights from Community Ambassador
          </div>

          <div className="flex items-center gap-2 mt-4 text-cyber-blue font-mono text-sm uppercase tracking-widest border border-cyber-blue/30 px-6 py-3 rounded-full group-hover:bg-cyber-blue/10 transition-colors">
            Read Full Review <ArrowUpRight size={16} />
          </div>
        </div>
      </button>

      {/* WEB1 Coming Soon */}
      <div className="w-full glass-panel p-8 md:p-16 rounded-[2rem] border border-white/5 relative overflow-hidden opacity-50 cursor-default">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center border border-accent/30 text-accent shadow-[0_0_20px_rgba(255,42,109,0.1)]">
            <Clock size={32} />
          </div>
          
          <div>
            <h3 className="font-sans text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              TryHackMe Web Fundamentals Review
            </h3>
            <div className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">
              WEB1 Certification
            </div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-widest border border-accent/30 px-6 py-3 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Coming Soon
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

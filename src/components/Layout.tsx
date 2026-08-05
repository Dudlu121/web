import { Outlet } from "react-router-dom";
import { CustomCursor } from "./CustomCursor";
import { CyberBackground } from "./CyberBackground";

export function Layout() {
  return (
    <div className="min-h-screen relative bg-[#030303] text-[#f8f9fa] antialiased overflow-x-hidden selection:bg-[#00f5d4]/40 selection:text-white">
      {/* Dynamic Fluid WebGL-like Canvas */}
      <CyberBackground />
      <CustomCursor />

      {/* High-End Glassmorphism Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center pointer-events-none transition-all duration-500">
        <div className="flex flex-col gap-1 pointer-events-auto">
          <a href="/" className="font-mono text-xs md:text-sm tracking-tighter font-bold text-white hover:text-cyber-blue transition-colors duration-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-blue shadow-[0_0_10px_#00f5d4] animate-pulse" />
            AYUSH MOHAPATRA
          </a>
        </div>
        
        <nav className="hidden md:flex gap-10 font-mono text-xs uppercase tracking-widest pointer-events-auto items-center">
          <a href="/" className="text-white hover:text-cyber-blue hover:-translate-y-0.5 transition-all duration-300">Index</a>
          <a href="/#projects" className="text-white/60 hover:text-cyber-blue hover:-translate-y-0.5 transition-all duration-300">Projects</a>
          <a href="/resume" className="text-white/60 hover:text-cyber-blue hover:-translate-y-0.5 transition-all duration-300">Resume</a>
        </nav>
      </header>

      <main className="relative z-10 w-full min-h-screen flex flex-col">
        <Outlet />
      </main>
      
      {/* Glassmorphism Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-end pointer-events-none">
        <div className="flex flex-col gap-1.5 font-mono text-[10px] md:text-xs text-white/50 uppercase tracking-widest">
          <span className="text-white/80 font-bold">AI & Cybersecurity Specialist</span>
          <span>Chennai, India [13.0827° N, 80.2707° E]</span>
        </div>
        
        <div className="flex items-center gap-6 pointer-events-auto">
          <div className="text-right font-mono flex flex-col items-end gap-1.5">
            <a href="mailto:me@ayushmohapatra.com" className="text-xs text-white hover:text-cyber-blue transition-colors relative group">
              me@ayushmohapatra.com
              <span className="absolute -bottom-1 right-0 w-0 h-[1px] bg-cyber-blue transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="https://github.com/AyushMohaptra" target="_blank" rel="noreferrer" className="text-[10px] text-white/50 hover:text-cyber-blue transition-colors uppercase tracking-widest">
              GitHub Connect
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

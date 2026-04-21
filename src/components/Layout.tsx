import { Outlet } from "react-router-dom";
import { CustomCursor } from "./CustomCursor";
import { CyberBackground } from "./CyberBackground";

export function Layout() {
  return (
    <div className="min-h-screen relative bg-transparent text-white antialiased overflow-x-hidden selection:bg-accent/20 selection:text-accent">
      {/* High-Performance Canvas Interactive Cyber Network */}
      <CyberBackground />

      <div className="scanline z-0" />
      <CustomCursor />
      
      {/* Structural Borders with Ambient Shifting */}
      <div className="fixed top-0 right-0 w-1/3 h-full border-l ambient-border pointer-events-none hidden lg:block z-0" />
      <div className="fixed bottom-1/4 left-0 w-full border-b ambient-border pointer-events-none z-0" />

      {/* Top Navigation Frame */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-8 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-1 pointer-events-auto">
          <a href="/" className="font-display text-2xl font-black letter-spacing-tighter text-white hover:text-accent transition-colors duration-300">AYUSH MOHAPATRA</a>
        </div>
        <nav className="hidden md:flex gap-8 font-mono text-[10px] uppercase tracking-widest pointer-events-auto mt-1">
          <a href="/" className="text-white hover:text-accent transition-colors duration-300">[ 01 ] INDEX</a>
          <a href="/#projects" className="text-white/40 hover:text-accent transition-colors duration-300">[ 02 ] REPOS</a>
          <a href="/resume" className="text-accent hover:text-accent/80 transition-colors duration-300">[ 04 ] SECURE_PORTFOLIO</a>
        </nav>
      </header>

      <main className="relative z-10 w-full min-h-screen flex flex-col">
        <Outlet />
      </main>
      
      {/* Footer Frame */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-end pointer-events-none">
        <div className="flex gap-12 font-mono text-[10px] uppercase">
          <div className="flex flex-col">
            <span className="opacity-40 text-[9px]">Network Status</span>
            <span className="text-accent">Secure Connection Established</span>
          </div>
          <div className="flex flex-col hidden sm:flex">
            <span className="opacity-40 text-[9px]">Location</span>
            <span>Chennai, TN</span>
          </div>
        </div>
        <div className="flex items-center gap-6 pointer-events-auto">
          <span className="font-mono text-[10px] opacity-40 uppercase tracking-widest hidden md:inline">Scroll for more_</span>
          <div className="hidden md:block w-12 h-[1px] bg-white/20"></div>
          <div className="text-right font-mono flex flex-col items-end pt-1">
            <a href="mailto:me@ayushmohapatra.com" className="text-xs hover:text-accent transition-colors block">ME@AYUSHMOHAPATRA.COM</a>
            <div className="flex gap-4 mt-1">
              <a href="https://github.com/AyushMohaptra" target="_blank" rel="noreferrer" className="text-[10px] opacity-40 hover:text-accent hover:opacity-100 transition-all">GITHUB</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

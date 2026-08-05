import { HeroSection } from "../components/home/HeroSection";
import { CtfSection } from "../components/home/CtfSection";
import { ProjectsSection } from "../components/home/ProjectsSection";
import { PublicationsSection } from "../components/home/PublicationsSection";
import { TechStackSection } from "../components/home/TechStackSection";
import { ExperienceCertsSection } from "../components/home/ExperienceCertsSection";

export function Home() {
  return (
    <div className="w-full flex justify-center pb-48">
      <div className="w-full max-w-7xl px-6 md:px-12 flex flex-col pt-[25vh]">
        
        <HeroSection />
        <CtfSection />
        <ProjectsSection />
        <PublicationsSection />
        <TechStackSection />
        <ExperienceCertsSection />

      </div>
      
      <div className="fixed bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent opacity-20 pointer-events-none" />
    </div>
  );
}

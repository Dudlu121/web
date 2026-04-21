import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

function DecryptText({ text, speed = 40, delay = 0, className }: { text: string; speed?: number; delay?: number; className?: string }) {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    let iteration = 0;
    let interval: NodeJS.Timeout | null = null;
    let startTimeout: NodeJS.Timeout | null = null;

    const startAnimation = () => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              // Skip spaces from randomizing
              if (text[index] === " ") return " ";
              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval!);
        }

        iteration += 1 / 3;
      }, speed);
    };

    startTimeout = setTimeout(startAnimation, delay);

    return () => {
      if (interval) clearInterval(interval);
      if (startTimeout) clearTimeout(startTimeout);
    };
  }, [text, speed, delay]);

  return <span className={className}>{displayText || "\u00A0"}</span>;
}

const PROJECTS = [
  {
    id: 1,
    title: "AI Video Detector",
    stack: "Python // OpenCV // MediaPipe",
    desc: "Heuristic pipeline to detect AI-generated videos using facial dynamics and dense optical flow without pre-trained weights.",
    link: "https://github.com/AyushMohaptra/ai_video_detector",
  },
  {
    id: 2,
    title: "Smart PII Scrubber",
    stack: "Python // spaCy // SQLite // Microsoft Presidio",
    desc: "Modular four-stage pipeline for compliance-grade redaction of 14 PII entity classes across multiple file formats.",
    link: "#",
  },
  {
    id: 3,
    title: "Virtual Health Assistant",
    stack: "scikit-learn // Tkinter // SQLite",
    desc: "Decision Tree classifier diagnosing 17 medical conditions from 50 symptoms delivered via a native Python GUI.",
    link: "https://github.com/AyushMohaptra/VirtualHealthAssistant",
  }
];

const EXPERIENCE = [
  {
    id: 1,
    title: "Reddit Ambassador",
    org: "TryHackMe",
    date: "2026 - Present",
  },
  {
    id: 2,
    title: "Student Coordinator and LEAD",
    org: "IET [REDACTED]",
    date: "2025 - Present",
  }
];

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const STAGGER_ITEM = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] } }
};

const CERTS = [
  { text: "TryHackMe — SOC Level 1 Certificate", link: "#thm-soc1" },
  { text: "TryHackMe — Jr Penetration Tester Certificate", link: "#thm-jrpen" },
  { text: "TryHackMe — Web Fundamentals Certificate", link: "#thm-web" },
  { text: "TryHackMe — loveatfirstbreach CTF", link: "#thm-ctf" },
  { text: "Google — Develop GenAI Apps with Gemini", link: "#google-genai" },
  { text: "Google — Prompt Design in Vertex AI", link: "#vertex-ai" },
  { text: "HackerRank — SQL (Advanced) & Python", link: "#hackerrank" },
  { text: "Kaggle — Pandas Data Analysis", link: "#kaggle" }
];

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
};

const THM_TITLES: Record<number, string> = {
  1: "Neophyte",
  2: "Apprentice",
  3: "Pathfinder",
  4: "Seeker",
  5: "Visionary",
  6: "Voyager",
  7: "Adept",
  8: "Hacker",
  9: "Mage",
  10: "Wizard",
  11: "Master",
  12: "Guru",
  13: "Legend",
  14: "Guardian",
  15: "TITAN",
  16: "SAGE",
  17: "VANGUARD",
  18: "SHOGUN",
  19: "ASCENDED",
  20: "MYTHIC",
  21: "GRANDMASTER",
};

function ThmTelemetry() {
  const [thmRank, setThmRank] = useState<string | null>(null);
  const [thmPoints, setThmPoints] = useState<number | null>(null);
  const [thmTier, setThmTier] = useState<string | null>(null);
  const [thmLevel, setThmLevel] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

      try {
        const res = await fetch("/api/thm-stats", { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (res.ok) {
          const data = await res.json();
          if (data && (data.status === "success" || data.totalPoints) && data.data) {
            const d = data.data;
            if (typeof d.rank === 'string') {
              setThmRank(d.rank);
            } else if (typeof d.rank === 'number') {
              setThmRank(`TOP ${d.topPercentage || 1}% (${d.rank})`);
            }
            setThmPoints(d.totalPoints);
            setThmTier(d.leagueTier || 'Hacker');
            setThmLevel(d.level || 0);
            setIsConnected(true);
            return;
          }
        }
        throw new Error("API Unreachable");
      } catch (e) {
        clearTimeout(timeoutId);
        console.error("Telemetry Link Failed (Static Hosting Detected). Activating Offline Mode.", e);
        // Fallback data for static deployments (Cloudflare Pages)
        setThmRank("TOP 1% (44,204)");
        setThmPoints(8440);
        setThmTier("Gold");
        setThmLevel(11);
        setIsOffline(true);
      }
    };
    fetchStats();
  }, []);

  const currentTitle = thmLevel && THM_TITLES[thmLevel] ? THM_TITLES[thmLevel] : "HACKER";

  return (
    <div className="mb-2 p-5 border border-accent/40 bg-accent/5 relative overflow-hidden group flex flex-col gap-4">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
      
      {/* Telemetry Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10 w-full">
        <div className="flex items-center gap-3">
           <div className={`w-2 h-2 ${isConnected ? 'bg-accent animate-pulse' : isOffline ? 'bg-orange-500' : 'bg-white/20'} rounded-sm`} />
           <span className="font-mono text-[10px] text-accent uppercase tracking-widest font-semibold">
             {isConnected ? 'THM_TELEMETRY_LINK_ACTIVE' : isOffline ? 'THM_DATA_CACHED_OFFLINE' : 'ESTABLISHING LINK...'}
           </span>
        </div>
        
        {/* Dynamic Text Rank Output (Fetched via pure text) */}
        {(thmRank || isOffline) && (
          <div className="font-display text-xl md:text-2xl font-bold text-gray-200 letter-spacing-tighter tracking-tight tracking-[-0.04em]">
            GLOBAL RANK // <span className="text-accent">{thmRank?.toUpperCase() || "RANK_PENDING"}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative z-10 w-full">
        <div className="w-full max-w-lg">
          {/* Pure Visualizer replacing buggy S3 image */}
          <div className="relative w-full h-[50px] overflow-hidden rounded-sm border-l-2 border-accent/40 bg-black/50 group-hover:border-accent/80 transition-colors flex items-center px-4">
             {(isConnected || isOffline) ? (
                <div className="flex w-full justify-between items-center z-10 text-gray-200 font-mono uppercase tracking-widest text-xs md:text-sm">
                  <span className="opacity-90 font-bold">LVL {thmLevel} [{currentTitle}]</span>
                  <span className="text-accent font-bold">{thmTier} LEAGUE</span>
                </div>
             ) : (
                <span className="text-white/50 font-mono text-xs sm:text-sm z-10">ACQUIRING SIGNAL...</span>
             )}
             
             {/* Decorative Background for visualizing */}
             {(isConnected || isOffline) && (
               <>
                 <div className="absolute top-0 left-0 h-full w-[30%] bg-gradient-to-r from-accent/20 to-transparent" />
                 <div className="absolute bottom-0 right-0 h-[2px] w-full bg-gradient-to-r from-transparent to-accent/40" />
                 <div className="absolute top-0 right-4 h-full w-[1px] bg-accent/20 transition-colors" />
                 <div className="absolute top-0 right-8 h-full w-[1px] bg-accent/10 transition-colors" />
               </>
             )}
          </div>
        </div>
        
        <div className="font-mono text-[10px] text-accent text-left md:text-right w-full md:w-auto tracking-widest flex flex-col gap-1 items-start md:items-end uppercase mt-2 md:mt-0">
          {(thmPoints !== null || isOffline) && <span className="font-bold">{thmPoints} EXP POINTS</span>}
        </div>
      </div>
    </div>
  );
}

export function Home() {
  return (
    <div className="w-full flex justify-center pb-48">
      <div className="w-full max-w-7xl px-6 md:px-12 flex flex-col pt-[20vh]">
        
        {/* HERO SECTION */}
        <motion.section 
          initial="hidden" 
          animate="visible" 
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mb-48"
        >
          <div className="flex items-baseline lg:gap-8 mb-12">
            <span className="hidden lg:block vertical-text text-[10px] font-mono tracking-widest text-accent h-40 py-4 border-l border-accent/30 opacity-70">
              EST. 2024 / CSE STUDENT
            </span>
            <div className="flex flex-col font-display font-semibold text-[clamp(4rem,14vw,12rem)] leading-[0.9] tracking-tight uppercase overflow-hidden py-4 text-gray-100">
              <motion.div variants={FADE_UP} className="outline-text">
                <DecryptText text="AYUSH" delay={200} />
              </motion.div>
              <motion.div variants={FADE_UP} className="text-accent drop-shadow-md">
                <DecryptText text="MOHAPATRA" delay={800} />
              </motion.div>
            </div>
          </div>

          <motion.div variants={FADE_UP} className="mt-8 flex flex-col md:flex-row gap-12 lg:ml-16 font-mono text-xs md:text-sm tracking-wide opacity-60">
            <div className="max-w-sm leading-relaxed">
              Specializing in Artificial Intelligence and Cybersecurity. Architecting secure digital experiences through the lens of a Computer Science Engineer.
            </div>
            <div className="max-w-sm leading-relaxed">
              Focusing on heuristic threat detection, compliance grade redaction, and applied machine learning models.
            </div>
          </motion.div>
        </motion.section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="mb-48">
          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="font-mono text-[10px] tracking-widest text-accent mb-12 uppercase flex gap-4 items-center"
          >
            <div className="w-12 h-[1px] bg-accent/30" />
            [ 02 ] REPOS
          </motion.div>

          <motion.div 
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col border-t ambient-border relative"
          >
            {PROJECTS.map((proj, i) => (
              <motion.a
                key={proj.id}
                href={proj.link}
                target="_blank"
                rel="noreferrer"
                variants={STAGGER_ITEM}
                className="group relative flex flex-col md:flex-row justify-between items-start md:items-center p-6 md:py-12 border-b ambient-border hover:bg-white/5 transition-colors duration-500 ambient-bg-slow"
              >
                <div className="flex-1 mb-4 md:mb-0">
                  <h3 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight transition-all duration-300">
                    {proj.title}
                  </h3>
                  <p className="mt-4 font-sans text-sm text-white/50 max-w-xl leading-relaxed font-medium">
                    {proj.desc}
                  </p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-4 text-left md:text-right">
                  <span className="font-mono text-[10px] text-accent tracking-widest uppercase">
                    {proj.stack}
                  </span>
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all duration-300">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </section>

        {/* EXPERIENCE & CERTS GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 relative">
          
          <div>
            <motion.div 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="font-mono text-[10px] tracking-widest text-accent mb-12 uppercase flex gap-4 items-center"
            >
              <div className="w-12 h-[1px] bg-accent/30" />
              [ 03A ] LABS // EXP
            </motion.div>
            <motion.div 
              variants={STAGGER_CONTAINER}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-10"
            >
              {EXPERIENCE.map((exp, i) => (
                <motion.div 
                  key={exp.id}
                  variants={STAGGER_ITEM}
                  className="flex flex-col gap-2 relative pl-6 border-l border-white/10"
                >
                  <div className="absolute left-[-4px] top-2 w-2 h-2 bg-white/20" />
                  <h4 className="font-sans text-xl font-bold text-white tracking-tight">{exp.title}</h4>
                  <div className="font-mono text-[10px] uppercase text-white/50 flex justify-between w-full max-w-sm tracking-widest mt-1">
                    <span className="text-accent">{exp.org}</span>
                    <span>{exp.date}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <motion.div 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="font-mono text-[10px] tracking-widest text-accent mb-12 uppercase flex gap-4 items-center"
            >
              <div className="w-12 h-[1px] bg-accent/30" />
              [ 03B ] CLEARANCE // CERTS
            </motion.div>
            <motion.div 
              variants={STAGGER_CONTAINER}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              {/* TryHackMe Live Telemetry Block */}
              <motion.div variants={STAGGER_ITEM}>
                <ThmTelemetry />
              </motion.div>

              {CERTS.map((cert, i) => (
                <motion.a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  key={i}
                  variants={STAGGER_ITEM}
                  className="font-mono text-[10px] sm:text-xs uppercase tracking-wider leading-relaxed text-white/60 p-4 sm:p-5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent hover:text-white transition-all duration-300 flex justify-between items-center group block"
                >
                  <span className="max-w-[85%]">{cert.text}</span>
                  <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-accent transition-colors shrink-0" />
                </motion.a>
              ))}
            </motion.div>
          </div>

        </section>

      </div>
    </div>
  );
}

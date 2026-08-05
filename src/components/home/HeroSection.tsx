import { motion, useScroll, useTransform, useSpring } from "motion/react";

const SplitText = ({ text, delayOffset = 0 }: { text: string; delayOffset?: number }) => {
  return (
    <span className="inline-block overflow-hidden">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: "100%", opacity: 0, rotateZ: 10 }}
          animate={{ y: 0, opacity: 1, rotateZ: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.215, 0.61, 0.355, 1],
            delay: delayOffset + index * 0.03,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

export function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const physicsY1 = useSpring(y1, { stiffness: 100, damping: 30 });

  return (
    <motion.section 
      style={{ y: physicsY1, opacity }}
      className="mb-[25vh] relative z-10"
    >
      <div className="flex flex-col gap-6">
        <div className="font-mono text-xs md:text-sm text-cyber-blue tracking-[0.2em] uppercase font-bold flex items-center gap-3">
          <span className="w-8 h-[1px] bg-cyber-blue shadow-[0_0_8px_#00f5d4]" />
          AI & Cybersecurity Specialist
        </div>
        
        <h1 className="font-sans font-black text-[clamp(4rem,9vw,9rem)] tracking-tighter text-white leading-[0.9] uppercase relative">
          <div className="text-outline absolute -top-2 -left-2 opacity-30 blur-[2px]">AYUSH</div>
          <div className="relative z-10 text-gradient"><SplitText text="AYUSH" delayOffset={0} /></div>
          <div className="relative z-10"><SplitText text="MOHAPATRA" delayOffset={0.2} /></div>
        </h1>
        
      </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="mt-12 font-sans text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-4xl"
        >
          Computer Science student deep into AI and cybersecurity. I build tools, do CTFs, and write about what I break. Mostly curious about where the two fields overlap — and what happens when you poke at the edges. Sometimes that curiosity turns into a project. Sometimes it turns into a writeup. Sometimes both.
        </motion.div>
    </motion.section>
  );
}

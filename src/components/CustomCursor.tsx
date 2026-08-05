import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[100]">
      {/* Outer Glow / Spotlight */}
      <motion.div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          width: isHovering ? 80 : 40,
          height: isHovering ? 80 : 40,
          opacity: isClicking ? 0.8 : 0.4,
          backgroundColor: isHovering ? "rgba(0, 245, 212, 0.4)" : "rgba(255, 255, 255, 0.1)",
          boxShadow: isHovering ? "0 0 40px rgba(0, 245, 212, 0.6)" : "0 0 20px rgba(255, 255, 255, 0.2)",
        }}
        transition={{ type: "spring", stiffness: 120, damping: 25, mass: 0.8 }}
      />
      
      {/* Inner Precision Dot */}
      <motion.div
        className="absolute w-2 h-2 bg-[#00f5d4] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#00f5d4]"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isClicking ? 0.5 : (isHovering ? 1.5 : 1),
        }}
        transition={{ type: "tween", ease: "circOut", duration: 0.05 }}
      />
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import { Mouse } from "lucide-react";
import heroImage from "@/assets/hero-portrait.jpg";
import heroFarLeft from "@/assets/hero-portrait-far-left.jpg";
import heroLeft from "@/assets/hero-portrait-left.jpg";
import heroRight from "@/assets/hero-portrait-right.jpg";
import heroFarRight from "@/assets/hero-portrait-far-right.jpg";
import heroFg from "@/assets/hero-portrait-fg.png";

const HeroSection = () => {
  const [parallaxY, setParallaxY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [entered, setEntered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const frames = useMemo(
    () => [heroFarLeft, heroLeft, heroImage, heroRight, heroFarRight],
    [],
  );

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setParallaxY(y * 0.3);
      const progress = Math.min(1, Math.max(0, y / window.innerHeight));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollProgress * 1.5);
  const heroScale = 1.1 + scrollProgress * 0.15;
  const textOpacity = Math.max(0, 1 - scrollProgress * 2.5);
  const textTranslateY = scrollProgress * -60 - mouse.y * 8;
  const textTranslateX = -mouse.x * 6;
  const blur = scrollProgress * 8;

  // Continuous tent-function weights so adjacent frames blend smoothly
  // Frame anchors at x = [-1, -0.5, 0, 0.5, 1]; step = 0.5
  const framePositions = [-1, -0.5, 0, 0.5, 1];
  const frameWeights = framePositions.map((pos) =>
    Math.max(0, 1 - Math.abs(mouse.x - pos) / 0.5),
  );

  // Foreground (face) follows cursor; background drifts opposite for parallax depth
  const fgX = mouse.x * 14;
  const fgY = mouse.y * 10;
  const fgRotY = mouse.x * 4;
  const fgRotX = -mouse.y * 3;
  const bgX = mouse.x * -6;
  const bgY = mouse.y * -4;

  return (
    <div ref={sectionRef} className="relative h-screen w-full overflow-hidden" style={{ perspective: "1200px" }}>
      <div className="absolute -left-1/4 top-1/4 w-[600px] h-[600px] glow-spot-blue rounded-full animate-float opacity-60 pointer-events-none animate-light-drift" />
      <div
        className="absolute -right-1/4 top-1/3 w-[500px] h-[500px] glow-spot-orange rounded-full animate-float opacity-50 pointer-events-none animate-light-drift"
        style={{ animationDelay: "3s" }}
      />

      {/* Background frame stack — cross-fade between angle frames + slight reverse parallax */}
      <div
        className={`absolute inset-0 ${!entered ? "animate-hero-zoom" : ""}`}
        style={{
          transform: entered
            ? `scale(${heroScale}) translate(${bgX}px, ${parallaxY + bgY}px)`
            : undefined,
          opacity: entered ? heroOpacity : undefined,
          filter: entered ? `blur(${blur}px)` : undefined,
          transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform, opacity, filter",
        }}
      >
        {frames.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === 2 ? "Abhay Chaudhary — Software Developer" : ""}
            aria-hidden={i !== 2}
            className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
            style={{
              opacity: frameWeights[i],
              transition: "opacity 220ms ease-out",
              willChange: "opacity",
            }}
            draggable={false}
          />
        ))}
        <div className="grain" />
      </div>

      {/* Foreground cutout — moves with cursor for depth-parallax pop-out */}
      {entered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `scale(${heroScale * 1.04}) translate3d(${fgX}px, ${parallaxY + fgY}px, 80px) rotateX(${fgRotX}deg) rotateY(${fgRotY}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1)",
            opacity: heroOpacity,
            filter: `blur(${blur * 0.6}px) drop-shadow(0 30px 40px color-mix(in oklab, black 60%, transparent))`,
            willChange: "transform, opacity",
          }}
        >
          <img
            src={heroFg}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
            draggable={false}
          />
        </div>
      )}

      <div className="absolute inset-0 cinematic-gradient pointer-events-none" />
      <div className="absolute inset-0 hero-overlay pointer-events-none" />
      <div className="vignette" />

      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4"
        style={
          entered
            ? {
                opacity: textOpacity,
                transform: `translate3d(${textTranslateX}px, ${textTranslateY}px, 60px)`,
                transformStyle: "preserve-3d",
              }
            : undefined
        }
      >
        <h1
          className={`text-5xl sm:text-7xl md:text-9xl font-black tracking-tight text-foreground text-glow text-center ${
            !entered ? "opacity-0 animate-fade-up" : ""
          }`}
          style={
            !entered
              ? { animationDelay: "0.5s" }
              : {
                  textShadow:
                    "0 1px 0 color-mix(in oklab, white 12%, transparent), 0 2px 0 color-mix(in oklab, black 50%, transparent), 0 8px 24px color-mix(in oklab, var(--hero-blue) 50%, transparent), 0 0 80px color-mix(in oklab, var(--hero-blue) 25%, transparent)",
                }
          }
        >
          Abhay Chaudhary
        </h1>
        <p
          className={`mt-4 text-sm sm:text-base md:text-lg tracking-[0.4em] uppercase text-muted-foreground font-medium text-center ${
            !entered ? "opacity-0 animate-fade-up" : ""
          }`}
          style={!entered ? { animationDelay: "0.9s" } : undefined}
        >
          Software Developer
        </p>
      </div>

      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-opacity duration-300 ${
          !entered ? "opacity-0 animate-fade-in" : ""
        }`}
        style={{
          ...(!entered ? { animationDelay: "1.6s" } : {}),
          opacity: entered ? (scrollProgress > 0.05 ? 0 : 1) : undefined,
        }}
      >
        <Mouse size={20} className="text-muted-foreground animate-scroll-bounce" />
        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Scroll</span>
      </div>
    </div>
  );
};

export default HeroSection;

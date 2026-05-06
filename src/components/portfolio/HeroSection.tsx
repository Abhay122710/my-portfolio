import { useEffect, useRef, useState } from "react";
import { Mouse } from "lucide-react";
import heroImage from "@/assets/hero-portrait.jpg";

const HeroSection = () => {
  const [parallaxY, setParallaxY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [entered, setEntered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const heroOpacity = Math.max(0, 1 - scrollProgress * 1.5);
  const heroScale = 1.1 + scrollProgress * 0.15;
  const textOpacity = Math.max(0, 1 - scrollProgress * 2.5);
  const textTranslateY = scrollProgress * -60;
  const blur = scrollProgress * 8;

  return (
    <div ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      <div className="absolute -left-1/4 top-1/4 w-[600px] h-[600px] glow-spot-blue rounded-full animate-float opacity-60 pointer-events-none" />
      <div
        className="absolute -right-1/4 top-1/3 w-[500px] h-[500px] glow-spot-orange rounded-full animate-float opacity-50 pointer-events-none"
        style={{ animationDelay: "3s" }}
      />

      <div
        className={`absolute inset-0 ${!entered ? "animate-hero-zoom" : ""}`}
        style={{
          transform: entered ? `scale(${heroScale}) translateY(${parallaxY}px)` : undefined,
          opacity: entered ? heroOpacity : undefined,
          filter: entered ? `blur(${blur}px)` : undefined,
          willChange: "transform, opacity, filter",
        }}
      >
        <img
          src={heroImage}
          alt="Abhay Chaudhary — UI/UX Developer"
          className="w-full h-full object-cover object-[center_20%]"
        />
      </div>

      <div className="absolute inset-0 cinematic-gradient pointer-events-none" />
      <div className="absolute inset-0 hero-overlay pointer-events-none" />

      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4"
        style={
          entered
            ? { opacity: textOpacity, transform: `translateY(${textTranslateY}px)` }
            : undefined
        }
      >
        <h1
          className={`text-5xl sm:text-7xl md:text-9xl font-black tracking-tight text-foreground text-glow text-center ${
            !entered ? "opacity-0 animate-fade-up" : ""
          }`}
          style={!entered ? { animationDelay: "0.5s" } : undefined}
        >
          Abhay Chaudhary
        </h1>
        <p
          className={`mt-4 text-sm sm:text-base md:text-lg tracking-[0.4em] uppercase text-muted-foreground font-medium text-center ${
            !entered ? "opacity-0 animate-fade-up" : ""
          }`}
          style={!entered ? { animationDelay: "0.9s" } : undefined}
        >
          UI/UX Developer
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

import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Mouse } from "lucide-react";

const Hero3DModel = lazy(() => import("./Hero3DModel"));

const HeroSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [entered, setEntered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
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
  const textOpacity = Math.max(0, 1 - scrollProgress * 2.5);
  const textTranslateY = scrollProgress * -60 - mouse.y * 8;
  const textTranslateX = -mouse.x * 6;

  return (
    <div ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-background" style={{ perspective: "1200px" }}>
      <div className="absolute -left-1/4 top-1/4 w-[600px] h-[600px] glow-spot-blue rounded-full animate-float opacity-60 pointer-events-none animate-light-drift" />
      <div
        className="absolute -right-1/4 top-1/3 w-[500px] h-[500px] glow-spot-orange rounded-full animate-float opacity-50 pointer-events-none animate-light-drift"
        style={{ animationDelay: "3s" }}
      />

      {/* Pure 3D model — no photo */}
      <div
        className="absolute inset-0"
        style={{
          opacity: entered ? heroOpacity : 0,
          transition: "opacity 800ms ease-out",
        }}
      >
        <Suspense fallback={null}>
          <Hero3DModel mouseX={mouse.x} mouseY={mouse.y} typing={scrollProgress < 0.05} />
        </Suspense>
      </div>

      <div className="absolute inset-0 cinematic-gradient pointer-events-none" />
      <div className="vignette" />

      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 pointer-events-none"
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
              ? { animationDelay: "0.3s" }
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
          style={!entered ? { animationDelay: "0.6s" } : undefined}
        >
          Software Developer
        </p>
      </div>

      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-opacity duration-300 ${
          !entered ? "opacity-0 animate-fade-in" : ""
        }`}
        style={{
          ...(!entered ? { animationDelay: "1.2s" } : {}),
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

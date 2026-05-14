import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink, Palette, PenTool, ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTilt } from "@/hooks/use-tilt";

type Project = {
  title: string;
  date: string;
  tech: string[];
  description: string;
  link: string;
  youtubeId?: string;
};

const projects: Project[] = [
  {
    title: "Stop Motion Animation Project",
    date: "April 2025",
    tech: ["Stop Motion", "Video Editing", "Frame Animation", "Storyboarding", "Creative Direction", "Visual Storytelling"],
    description:
      "A creative stop-motion animation project focused on storytelling through frame-by-frame photography, scene composition, object movement, and visual timing techniques to create smooth cinematic motion effects.",
    link: "https://www.youtube.com/watch?v=V7-SEvJ7w3o",
    youtubeId: "V7-SEvJ7w3o",
  },
  {
    title: "Creative Design Showreel",
    date: "May 2026",
    tech: ["Figma", "Blender", "UI/UX", "Typography", "3D Design", "Motion Graphics", "Game Design"],
    description:
      "A curated showcase of creative projects featuring UI/UX design, 3D modeling, motion graphics, typography, game design concepts, and visual storytelling developed throughout my B.Tech journey in Gaming and Graphics.",
    link: "https://www.youtube.com/watch?v=fKHMHmBjvU4",
    youtubeId: "fKHMHmBjvU4",
  },
  {
    title: "Vendor+",
    date: "May 2026",
    tech: ["React", "TypeScript", "Vite", "Supabase", "Twilio", "Machine Learning", "REST API", "Tailwind CSS"],
    description:
      "AI-powered hyperlocal commerce platform helping local shops manage orders, analyze product demand, and connect with nearby customers using smart analytics, masked calling, and automated order confirmation systems.",
    link: "https://vendorplus.online/",
  },
  {
    title: "Lost & Found Management System",
    date: "May 2025",
    tech: ["Java", "Spring Boot", "HTML/CSS", "JavaScript", "SQL"],
    description:
      "Web-based application enabling students to report, search, and claim lost or found items with secure authentication, image uploads, and REST API integration.",
    link: "https://good-work-team.lovable.app",
  },
  {
    title: "Geometry Dash–Style 2D Game",
    date: "2025",
    tech: ["Unity 3D", "C#", "NavMesh", "Raycasting"],
    description:
      "2D rhythm-based platformer with multiple player modes (cube, ball, ship, wave, spider), physics-based movement, gravity switching, and collision detection.",
    link: "https://abhay122710.itch.io/geometry-dash-game",
  },
];

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const tilt = useTilt<HTMLButtonElement>({ max: 5, scale: 1.02 });
  return (
    <button
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      type="button"
      onClick={onClick}
      className="group relative w-full text-left rounded-xl border border-border glass tilt-card gradient-border p-8 hover:border-primary/40 block cursor-pointer h-full"
    >
      <div className="flex items-start justify-between mb-4 tilt-child">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-1">{project.title}</h3>
          <p className="text-xs text-muted-foreground tracking-wider uppercase">{project.date}</p>
        </div>
        <ExternalLink
          size={16}
          className="text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:rotate-12"
        />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
            style={{
              boxShadow:
                "inset 0 1px 0 0 color-mix(in oklab, white 8%, transparent), inset 0 -1px 2px 0 color-mix(in oklab, black 30%, transparent)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </button>
  );
};

const Carousel3D = ({
  projects,
  onProjectClick,
}: {
  projects: Project[];
  onProjectClick: (p: Project) => void;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", containScroll: false },
    [Autoplay({ delay: 4500, stopOnInteraction: true })],
  );
  const tweenNodes = useRef<HTMLElement[]>([]);
  const [selected, setSelected] = useState(0);

  const setTweenNodes = useCallback((api: NonNullable<typeof emblaApi>) => {
    tweenNodes.current = api.slideNodes().map(
      (slide) => slide.querySelector(".carousel3d-slide") as HTMLElement,
    );
  }, []);

  const tween = useCallback((api: NonNullable<typeof emblaApi>) => {
    const engine = api.internalEngine();
    const scrollProgress = api.scrollProgress();
    const slidesInView = api.slidesInView();
    const isScrollEvent = engine.scrollBody.direction() !== 0;

    api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diff = scrollSnap - scrollProgress;
      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (snapIndex === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diff = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diff = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      const node = tweenNodes.current[snapIndex];
      if (!node) return;
      if (!isScrollEvent && !slidesInView.includes(snapIndex)) return;
      const clamped = Math.max(-2, Math.min(2, diff));
      const abs = Math.abs(clamped);
      const rotateY = clamped * -55;
      const translateZ = -abs * 320;
      const translateX = clamped * -90;
      const scale = 1 - Math.min(abs * 0.22, 0.5);
      const opacity = 1 - Math.min(abs * 0.45, 0.75);
      const blur = Math.min(abs * 6, 10);
      node.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
      node.style.opacity = `${opacity}`;
      node.style.filter = `blur(${blur}px)`;
      node.style.zIndex = `${100 - Math.round(abs * 100)}`;
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setTweenNodes(emblaApi);
    tween(emblaApi);
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi
      .on("reInit", (api) => {
        setTweenNodes(api);
        tween(api);
      })
      .on("scroll", tween)
      .on("slideFocus", tween)
      .on("select", onSelect);
  }, [emblaApi, setTweenNodes, tween]);

  return (
    <div className="relative max-w-5xl mx-auto">
      <div
        className="overflow-hidden py-8"
        ref={emblaRef}
        style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
      >
        <div className="flex" style={{ transformStyle: "preserve-3d" }}>
          {projects.map((project) => (
            <div
              key={project.title}
              className="relative flex-[0_0_60%] sm:flex-[0_0_45%] md:flex-[0_0_36%] lg:flex-[0_0_32%] min-w-0 px-2"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="carousel3d-slide will-change-transform"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                  transition: "opacity 250ms ease-out, filter 250ms ease-out",
                }}
              >
                <ProjectCard project={project} onClick={() => onProjectClick(project)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => emblaApi?.scrollPrev()}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 h-10 w-10 rounded-full z-50"
        aria-label="Previous"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => emblaApi?.scrollNext()}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 h-10 w-10 rounded-full z-50"
        aria-label="Next"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>

      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              selected === i ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const WorkSection = () => {
  const [showMyWork, setShowMyWork] = useState(false);
  const [showFigma, setShowFigma] = useState(false);
  const [activeVideo, setActiveVideo] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    if (project.youtubeId) {
      setActiveVideo(project);
    } else if (typeof window !== "undefined") {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="work" className="py-24 md:py-32 relative scroll-mt-20">
      <div className="container-x">
        <div className="mb-16 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Work</h2>

          <button
            onClick={() => setShowMyWork(true)}
            className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold tracking-widest uppercase rounded-full border border-primary/50 text-primary transition-all duration-300 hover:border-primary hover:bg-primary/10"
          >
            <Palette size={14} />
            My Work
          </button>
        </div>

        <Carousel3D projects={projects} onProjectClick={handleProjectClick} />
      </div>

      <Dialog
        open={!!activeVideo}
        onOpenChange={(open) => {
          if (!open) setActiveVideo(null);
        }}
      >
        <DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-black border-border">
          <DialogHeader className="px-6 pt-5 pb-3">
            <DialogTitle className="text-foreground">{activeVideo?.title}</DialogTitle>
          </DialogHeader>
          {activeVideo?.youtubeId && (
            <div className="relative w-full aspect-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          )}
          <div className="px-6 py-3 text-center">
            <a
              href={activeVideo?.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-primary hover:underline"
            >
              Open on YouTube ↗
            </a>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showMyWork && !showFigma}
        onOpenChange={(open) => {
          if (!open) setShowMyWork(false);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Choose Platform</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={() => setShowFigma(true)}
              className="flex-1 flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card/50 transition-all duration-300 hover:border-primary/40 hover:bg-primary/10"
            >
              <PenTool size={28} className="text-primary" />
              <span className="text-sm font-semibold text-foreground">Figma</span>
            </button>
            <a
              href="https://drive.google.com/drive/folders/1wjThZAbv1e0aeQE3dZNVesDikYk9XRpx?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card/50 transition-all duration-300 hover:border-accent/40 hover:bg-accent/10"
            >
              <Palette size={28} className="text-accent" />
              <span className="text-sm font-semibold text-foreground">Canva</span>
            </a>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showFigma}
        onOpenChange={(open) => {
          if (!open) {
            setShowFigma(false);
            setShowMyWork(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Figma Projects</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <a
              href="https://www.figma.com/design/A7b8lyTIrUs9iatYkK5ni9/Untitled?m=auto&t=8Ge1Wxa9IJC5P2wt-1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card/50 transition-all duration-300 hover:border-primary/40 hover:bg-primary/10"
            >
              <PenTool size={18} className="text-primary flex-shrink-0" />
              <div>
                <span className="text-sm font-semibold text-foreground">Figma Project 1</span>
                <p className="text-xs text-muted-foreground mt-0.5">View design →</p>
              </div>
            </a>
            <a
              href="https://www.figma.com/design/A7b8lyTIrUs9iatYkK5ni9/Untitled?m=auto&t=t1xk69pThNdHjihw-1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card/50 transition-all duration-300 hover:border-primary/40 hover:bg-primary/10"
            >
              <PenTool size={18} className="text-primary flex-shrink-0" />
              <div>
                <span className="text-sm font-semibold text-foreground">Figma Project 2</span>
                <p className="text-xs text-muted-foreground mt-0.5">View design →</p>
              </div>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default WorkSection;

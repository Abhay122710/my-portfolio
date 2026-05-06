import { useState } from "react";
import { ExternalLink, Palette, PenTool } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const projects = [
  {
    title: "Vendor+",
    date: "May 2026",
    tech: ["React", "TypeScript", "Vite", "Supabase", "Twilio", "Machine Learning", "REST API", "Tailwind CSS"],
    description:
      "AI-powered hyperlocal commerce platform helping local shops manage orders, analyze product demand, and connect with nearby customers using smart analytics, masked calling, and automated order confirmation systems.",
    link: "https://vendorplus.online/",
    bg: "bg-emerald-500",
    text: "text-emerald-950",
  },
  {
    title: "Lost & Found Management System",
    date: "May 2025",
    tech: ["Java", "Spring Boot", "HTML/CSS", "JavaScript", "SQL"],
    description:
      "Web-based application enabling students to report, search, and claim lost or found items with secure authentication, image uploads, and REST API integration.",
    link: "https://good-work-team.lovable.app",
    bg: "bg-rose-500",
    text: "text-rose-950",
  },
  {
    title: "Geometry Dash–Style 2D Game",
    date: "2025",
    tech: ["Unity 3D", "C#", "NavMesh", "Raycasting"],
    description:
      "2D rhythm-based platformer with multiple player modes (cube, ball, ship, wave, spider), physics-based movement, gravity switching, and collision detection.",
    link: "https://abhay122710.itch.io/geometry-dash-game",
    bg: "bg-indigo-500",
    text: "text-indigo-50",
  },
];

const WorkSection = () => {
  const [showMyWork, setShowMyWork] = useState(false);
  const [showFigma, setShowFigma] = useState(false);

  return (
    <section id="work" className="py-24 md:py-32 relative scroll-mt-20 overflow-hidden">
      <div className="container-x">
        <div className="mb-10 flex flex-col gap-6">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground">
            Things I can help you with…
          </p>
          <p className="text-sm md:text-base font-semibold tracking-wider uppercase text-foreground">
            Web &amp; Mobile <span className="text-muted-foreground">/</span> Software{" "}
            <span className="text-muted-foreground">/</span> Game Dev{" "}
            <span className="text-muted-foreground">/</span> UI &amp; UX
          </p>
        </div>

        <div className="relative flex items-end justify-between mb-10 border-t border-border pt-10">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground">
              Feat Works <span className="text-foreground/60">(0{projects.length})</span>
            </p>
            <button
              onClick={() => setShowMyWork(true)}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2 text-[10px] font-semibold tracking-widest uppercase rounded-full border border-border text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
            >
              <Palette size={12} />
              My Work
            </button>
          </div>
          <h2 className="text-[18vw] md:text-[10vw] font-black tracking-tight leading-[0.85] text-foreground select-none">
            Work
          </h2>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 4500, stopOnInteraction: true })]}
        >
          <CarouselContent className="-ml-4">
            {projects.map((project) => (
              <CarouselItem key={project.title} className="pl-4 md:basis-1/2 lg:basis-1/2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative block rounded-3xl ${project.bg} ${project.text} p-7 md:p-9 h-[420px] overflow-hidden transition-transform duration-500 hover:-translate-y-1 shadow-xl`}
                >
                  <div className="flex items-start justify-between">
                    <p className="text-[10px] tracking-[0.3em] uppercase opacity-70">
                      {project.date}
                    </p>
                  </div>

                  <p className="mt-6 text-sm leading-relaxed opacity-90 line-clamp-5 max-w-md">
                    {project.description}
                  </p>

                  <div className="absolute left-7 right-7 bottom-7 flex items-end justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-black/15 backdrop-blur font-semibold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 pl-4 pr-1 py-1 rounded-full bg-white text-black text-xs font-semibold whitespace-nowrap">
                      {project.title}
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-black text-white">
                        <ExternalLink size={12} />
                      </span>
                    </span>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>
      </div>

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

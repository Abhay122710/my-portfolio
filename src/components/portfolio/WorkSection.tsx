import { useState } from "react";
import { ExternalLink, Palette, PenTool } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const projects = [
  {
    title: "Lost & Found Management System",
    date: "May 2025",
    tech: ["Java", "Spring Boot", "HTML/CSS", "JavaScript", "SQL"],
    description:
      "Web-based application enabling students to report, search, and claim lost or found items with secure authentication, image uploads, and REST API integration.",
    link: "https://github.com/Abhay122710/lost-found-UPES",
  },
  {
    title: "Geometry Dash–Style 2D Game",
    date: "2025",
    tech: ["Unity 3D", "C#", "NavMesh", "Raycasting"],
    description:
      "2D rhythm-based platformer with multiple player modes (cube, ball, ship, wave, spider), physics-based movement, gravity switching, and collision detection.",
    link: "https://github.com/Abhay122710/Geometry-Dash-Style-2D-Game",
  },
];

const WorkSection = () => {
  const [showMyWork, setShowMyWork] = useState(false);
  const [showFigma, setShowFigma] = useState(false);

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl border border-border bg-card/50 p-8 transition-all duration-500 hover:border-primary/40 hover:bg-card block cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{project.title}</h3>
                  <p className="text-xs text-muted-foreground tracking-wider uppercase">
                    {project.date}
                  </p>
                </div>
                <ExternalLink
                  size={16}
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
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

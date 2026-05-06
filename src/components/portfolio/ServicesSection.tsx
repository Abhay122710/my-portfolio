import { Gamepad2, Palette } from "lucide-react";

const services = [
  {
    icon: Gamepad2,
    title: "Game Development",
    description:
      "Interactive 2D/3D games built with Unity, C#, physics systems, and immersive gameplay mechanics.",
  },
  {
    icon: Palette,
    title: "Graphics & Visual Design",
    description:
      "Stunning visuals, 3D models, and graphic assets crafted in Blender, Figma, and modern design tools.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 relative scroll-mt-20">
      <div className="container-x">
        <div className="mb-16 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">What I Do</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Services</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative rounded-xl border border-border bg-card/50 p-8 transition-all duration-500 hover:border-primary/40 hover:bg-card"
            >
              <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                <service.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

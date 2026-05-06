const stats = [
  { label: "Languages", value: "Python · C++ · Java" },
  { label: "Databases", value: "SQL" },
  { label: "Tools", value: "Git · Figma · Blender" },
  { label: "CGPA", value: "7.56 / 10" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative scroll-mt-20 overflow-hidden">
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-4 flex flex-col gap-6">
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground">
              About / 02
            </p>
            <a
              href="/Abhay_Chaudhary_Resume.pdf"
              download
              className="inline-flex w-fit items-center gap-2 px-6 py-3 rounded-full border border-border bg-card/50 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              Download my CV
              <span className="inline-block w-2 h-2 rounded-full bg-primary" />
            </a>
          </div>

          <div className="md:col-span-8 space-y-6">
            <p className="text-2xl md:text-3xl leading-snug text-foreground font-medium">
              I'm <span className="font-bold">Abhay Chaudhary</span>, a Computer Science
              undergraduate at UPES specializing in Gaming, Graphics, and AI-based systems.
              Driven by a <span className="italic text-rose-400">minimalist aesthetic</span> and
              a passion for problem-solving, I believe in the power of code and design to
              elevate everyday interactions.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              I build end-to-end projects with{" "}
              <span className="text-emerald-400 italic">empathy</span>,{" "}
              <span className="text-amber-400 italic">meticulous attention to detail</span>,
              and a <span className="text-indigo-400 italic">commitment to continuous learning</span>.
            </p>

            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-border">
              {stats.map((item) => (
                <div key={item.label} className="pt-6">
                  <p className="text-sm font-semibold text-foreground">{item.value}</p>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-2">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

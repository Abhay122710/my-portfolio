import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center pt-24 pb-16">
      <div className="absolute -left-1/4 top-1/4 w-[600px] h-[600px] glow-spot-blue rounded-full animate-float opacity-40 pointer-events-none" />
      <div
        className="absolute -right-1/4 top-1/3 w-[500px] h-[500px] glow-spot-orange rounded-full animate-float opacity-30 pointer-events-none"
        style={{ animationDelay: "3s" }}
      />

      <div className="container-x relative z-10 w-full">
        <p className="text-center text-xs md:text-sm tracking-[0.25em] text-muted-foreground mb-8 md:mb-10">
          <span className="text-primary">✦</span> Namaste! I am{" "}
          <span className="text-foreground font-semibold">Abhay Chaudhary</span> aka{" "}
          <span className="text-foreground font-semibold">AC</span>
        </p>

        <div className="relative max-w-6xl mx-auto">
          <h1 className="text-[18vw] md:text-[12vw] lg:text-[11rem] font-black leading-[0.85] tracking-tight text-foreground text-center">
            Creative
          </h1>

          <span className="absolute right-[6%] top-[18%] hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500 text-emerald-950 text-[10px] md:text-xs font-semibold tracking-wider rotate-[-4deg] shadow-lg">
            Game Designer
          </span>

          <div className="relative mt-2 md:mt-4">
            <h1 className="text-[18vw] md:text-[12vw] lg:text-[11rem] font-black leading-[0.85] tracking-tight text-muted-foreground/60 text-center">
              <span className="italic font-light text-foreground/40 mr-3">Software</span>
              Developer
            </h1>

            <span className="absolute left-[4%] top-[10%] hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500 text-rose-950 text-[10px] md:text-xs font-semibold tracking-wider rotate-[-6deg] shadow-lg">
              Full-Stack
            </span>
            <span className="absolute right-[8%] bottom-[12%] hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500 text-indigo-50 text-[10px] md:text-xs font-semibold tracking-wider rotate-[5deg] shadow-lg">
              UI / UX
            </span>
          </div>
        </div>

        <div className="mt-12 md:mt-16 flex justify-center">
          <a
            href="#work"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            aria-label="Scroll to work"
          >
            <ArrowDown size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

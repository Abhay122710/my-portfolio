const stats = [
  { label: "Languages", value: "Python, C++, Java" },
  { label: "Databases", value: "SQL" },
  { label: "Tools", value: "Git, Figma, Blender" },
  { label: "CGPA", value: "7.56 / 10" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative scroll-mt-20">
      <div className="container-x">
        <div className="mb-16 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">Who I Am</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">About</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">
            I'm <span className="text-foreground font-semibold">Abhay Chaudhary</span>, a Computer
            Science & Engineering undergraduate at UPES, Dehradun, specializing in Gaming, Graphics,
            and AI-based systems.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I build end-to-end projects — from full-stack web applications to immersive Unity 3D
            games — using Java, C#, Python, SQL, and modern development tools. With strong
            foundations in Data Structures, Algorithms, and Object-Oriented Programming, I bring
            ideas to life through clean code and creative design.
          </p>
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-sm font-semibold text-foreground">{item.value}</p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

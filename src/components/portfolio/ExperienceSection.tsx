import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    type: "work" as const,
    title: "Intern — DBR Pvt. Ltd., Noida",
    period: "June 2025 – July 2025",
    points: [
      "Executed marketing initiatives including designing promotional pamphlets and outreach materials to enhance brand visibility.",
      "Conducted data analysis and structured data handling to support business decision-making.",
      "Contributed to marketing strategy by aligning data insights with promotional campaigns.",
    ],
  },
  {
    type: "work" as const,
    title: "Intern — Hamari Pahachan NGO",
    period: "June 2024 – July 2024",
    points: [
      "Assisted in website development and digital optimization initiatives.",
      "Created structured digital content and promotional campaigns.",
      "Supported data organization and reporting activities.",
    ],
  },
  {
    type: "education" as const,
    title: "B.Tech CSE — UPES, Dehradun",
    period: "Jul 2023 – Present",
    points: ["CGPA: 7.56 / 10", "Specialization in Gaming & Graphics"],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 md:py-32 relative scroll-mt-20">
      <div className="container-x">
        <div className="mb-16 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">My Journey</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Experience</h2>
        </div>
        <div className="max-w-2xl mx-auto relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-10">
            {experiences.map((exp) => (
              <div key={exp.title} className="relative pl-16">
                <div className="absolute left-0 top-1 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center">
                  {exp.type === "work" ? (
                    <Briefcase size={18} className="text-primary" />
                  ) : (
                    <GraduationCap size={18} className="text-accent" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                <p className="text-xs text-muted-foreground tracking-wider uppercase mt-1 mb-3">
                  {exp.period}
                </p>
                <ul className="space-y-2">
                  {exp.points.map((point, i) => (
                    <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import ServicesSection from "@/components/portfolio/ServicesSection";
import WorkSection from "@/components/portfolio/WorkSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ContactSection from "@/components/portfolio/ContactSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abhay Chaudhary — UI/UX Developer & Game Designer" },
      {
        name: "description",
        content:
          "Portfolio of Abhay Chaudhary — UI/UX developer, Unity game designer, and CSE undergrad at UPES Dehradun. Selected work, services, experience, and contact.",
      },
      { property: "og:title", content: "Abhay Chaudhary — UI/UX Developer & Game Designer" },
      {
        property: "og:description",
        content:
          "Selected work, services, and experience from Abhay Chaudhary — building games, graphics, and full-stack web apps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <WorkSection />
        <AboutSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </div>
  );
}

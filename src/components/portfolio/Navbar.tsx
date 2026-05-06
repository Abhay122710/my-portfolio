import { useEffect, useState } from "react";
import { Github, Linkedin } from "lucide-react";

const navItems = [
  { label: "Services", id: "services" },
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry most in view among intersecting ones
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        // Trigger when section crosses the middle band of viewport
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  const handleHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", " ");
    setActive("");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <a
          href="#"
          onClick={handleHome}
          className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center bg-primary/10 text-primary font-bold text-sm tracking-wide"
          aria-label="Home"
        >
          AC
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.label}
                href={`#${item.id}`}
                onClick={(e) => handleNav(e, item.id)}
                aria-current={isActive ? "true" : undefined}
                className={`nav-link ${isActive ? "nav-link-active" : ""}`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href="/Abhay_Chaudhary_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-semibold tracking-widest uppercase rounded-full border border-muted-foreground/30 text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
          >
            Resume
          </a>
          <a
            href="https://github.com/Abhay122710"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/abhay5100/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

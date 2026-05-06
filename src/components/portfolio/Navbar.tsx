import { useEffect, useState } from "react";
import { Github, Linkedin } from "lucide-react";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <a
          href="#"
          className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center bg-primary/10 text-primary font-bold text-sm tracking-wide"
          aria-label="Home"
        >
          AC
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href="/Abhay_Chaudhary_Resume.pdf"
            download="Abhay_Chaudhary_Resume.pdf"
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

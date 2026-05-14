import { Mail, Phone, Github, Linkedin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 relative scroll-mt-20">
      <div className="container-x">
        <div className="mb-16 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Contact</h2>
        </div>
        <div className="max-w-xl mx-auto text-center space-y-8">
          <p className="text-muted-foreground leading-relaxed">
            Have a project in mind or want to collaborate? Feel free to reach out — I'd love to hear
            from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="mailto:Abhay.122710@stu.upes.ac.in"
              className="btn-3d inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-card/50 text-foreground text-sm hover:border-primary hover:text-primary"
            >
              <Mail size={16} />
              Abhay.122710@stu.upes.ac.in
            </a>
            <a
              href="tel:+918476003000"
              className="btn-3d inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-card/50 text-foreground text-sm hover:border-primary hover:text-primary"
            >
              <Phone size={16} />
              +91 8476003000
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 pt-4">
            <a
              href="https://github.com/Abhay122710"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/abhay5100/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
          </div>
          <p className="text-xs text-muted-foreground pt-12">
            © {new Date().getFullYear()} Abhay Chaudhary. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

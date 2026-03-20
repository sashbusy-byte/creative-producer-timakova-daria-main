import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLang } from "@/lib/lang";

const navItemsRu = [
  { label: "Шоурил", href: "#showreel" },
  { label: "Кейс", href: "#analysis" },
  { label: "AI & Workflow", href: "#workflow" },
  { label: "Экспертиза", href: "#expertise" },
  { label: "Контакты", href: "#contacts" },
];

const navItemsEn = [
  { label: "Showreel", href: "#showreel" },
  { label: "Case Study", href: "#analysis" },
  { label: "AI & Workflow", href: "#workflow" },
  { label: "Expertise", href: "#expertise" },
  { label: "Contacts", href: "#contacts" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggle } = useLang();
  const navItems = lang === "ru" ? navItemsRu : navItemsEn;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container flex items-center justify-between h-14">
        <a href="#" className="font-black text-lg text-foreground">
          DT<span className="text-primary">.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {item.label}
            </a>
          ))}
          {/* Language toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 text-sm font-mono-data font-bold px-3 py-1 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
            aria-label="Switch language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === "ru" ? "EN" : "RU"}</span>
          </button>
        </div>

        {/* Mobile right side */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 text-xs font-mono-data font-bold px-2.5 py-1 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
            aria-label="Switch language"
          >
            <Globe className="w-3 h-3" />
            <span>{lang === "ru" ? "EN" : "RU"}</span>
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="h-11 w-11 inline-flex items-center justify-center text-foreground"
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="container flex flex-col gap-1 py-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="min-h-11 flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors font-medium py-2.5 px-3 rounded-lg hover:bg-muted/50"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

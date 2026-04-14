import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Compass, LogIn, LogOut, Menu, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { identity, login, clear, loginStatus } = useInternetIdentity();

  const isLoggedIn = !!identity && loginStatus === "success";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAuthAction = () => {
    setMobileOpen(false);
    if (isLoggedIn) clear();
    else login();
  };

  const shortPrincipal = identity
    ? `${identity.getPrincipal().toText().slice(0, 8)}…`
    : null;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-header border-b border-black/[0.06]"
          : "bg-white/60 backdrop-blur-md border-b border-black/[0.04]"
      }`}
      data-ocid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
            data-ocid="header.logo.link"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center shadow-sm">
              <Compass className="w-4 h-4 text-primary" />
            </div>
            <span className="font-display font-bold text-xl">
              <span className="text-gradient-amber">Yatra</span>
              <span className="text-foreground">Sync</span>
            </span>
          </motion.button>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-7"
            data-ocid="header.nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors duration-200 relative group"
                data-ocid={`header.nav.${link.label.toLowerCase()}.link`}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA + Auth + Mobile toggle */}
          <div className="flex items-center gap-2.5">
            {/* Explore Now — desktop only */}
            <motion.button
              type="button"
              onClick={() => handleNavClick("#features")}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/25 text-primary text-sm font-medium hover:bg-primary/18 transition-smooth shadow-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-ocid="header.cta.button"
            >
              Explore Now
            </motion.button>

            {/* Auth button — desktop */}
            <motion.button
              type="button"
              onClick={handleAuthAction}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-smooth border ${
                isLoggedIn
                  ? "bg-muted/60 border-border text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/40"
                  : "bg-primary text-primary-foreground border-primary/50 hover:bg-primary/90 shadow-glow-amber-sm"
              }`}
              data-ocid={
                isLoggedIn ? "header.logout.button" : "header.login.button"
              }
            >
              {isLoggedIn ? (
                <>
                  <User className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden lg:inline">{shortPrincipal}</span>
                  <LogOut className="w-3.5 h-3.5 shrink-0" />
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5 shrink-0" />
                  Login
                </>
              )}
            </motion.button>

            {/* Hamburger */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-black/[0.05] transition-smooth"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              data-ocid="header.mobile_menu.toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-black/[0.06] shadow-card-md"
            data-ocid="header.mobile_menu"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/8 transition-smooth"
                  data-ocid={`header.mobile_menu.${link.label.toLowerCase()}.link`}
                >
                  {link.label}
                </a>
              ))}

              {/* Auth button — mobile */}
              <button
                type="button"
                onClick={handleAuthAction}
                className={`mt-2 flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-smooth border ${
                  isLoggedIn
                    ? "bg-muted/60 border-border text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/40"
                    : "bg-primary text-primary-foreground border-primary/50 hover:bg-primary/90 shadow-glow-amber-sm"
                }`}
                data-ocid={
                  isLoggedIn
                    ? "header.mobile_menu.logout.button"
                    : "header.mobile_menu.login.button"
                }
              >
                {isLoggedIn ? (
                  <>
                    <LogOut className="w-4 h-4" />
                    Logout
                    {shortPrincipal && (
                      <span className="ml-1 text-xs opacity-60">
                        ({shortPrincipal})
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Login with Internet Identity
                  </>
                )}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

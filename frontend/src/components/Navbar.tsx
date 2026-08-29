"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(
    pathname === "/" ? "/" : "",
  );

  const { data: session, status } = useSession();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
  ];

  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const sections = ["how-it-works", "about", "features"];

      let currentSection = "/";

      for (const id of sections) {
        const section = document.getElementById(id);

        if (!section) continue;

        const rect = section.getBoundingClientRect();

        if (rect.top <= 180 && rect.bottom > 180) {
          currentSection = `#${id}`;
        }
      }

      if (window.scrollY < 100) {
        currentSection = "/";
      }

      setActiveSection(currentSection);
    };

    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash) {
        setActiveSection(hash);
      } else {
        setActiveSection("/");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);

    if (href === "/") {
      setActiveSection("/");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setActiveSection(href);

    const sectionId = href.replace("#", "");
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 px-4 py-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className=" border border-white/10 bg-white/4 px-4 py-3 backdrop-blur-xl sm:px-5">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => handleNavClick("/")}
              className="group flex items-center gap-2"
            >
              <span className="text-xl font-black tracking-[-0.06em] text-white sm:text-2xl">
                BG
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 transition-shadow duration-300 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.9)]" />

              <span className="text-xl font-black tracking-[-0.06em] text-white sm:text-2xl">
                REMOVER
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 p-1 md:flex">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-4 py-2 text-[13px] transition-all duration-300 ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/45 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.name}

                    {isActive && (
                      <motion.span
                        layoutId="navbar-active"
                        className="absolute inset-0 -z-10 border border-white/10"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
            {/* Desktop Auth */}
            <div className="hidden items-center gap-2 md:flex">
              {status === "loading" ? (
                <span className="px-4 py-2 text-[13px] text-white/40">
                  Loading...
                </span>
              ) : session ? (
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="border border-white/10 px-4 py-2.5 text-[13px] font-medium text-white/60 transition hover:border-cyan-400/30 hover:text-cyan-400"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-[13px] font-medium text-white/55 transition hover:text-white"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="group flex items-center gap-2 border border-cyan-400/30 bg-cyan-400 px-4 py-2.5 text-[13px] font-bold text-black transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-300"
                  >
                    Register
                    <ArrowUpRight
                      size={15}
                      strokeWidth={2.5}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </>
              )}
            </div>

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center border border-white/10 bg-black/60 text-white backdrop-blur-md transition hover:border-cyan-400/30 hover:text-cyan-400 md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden md:hidden"
              >
                <div className="mt-4 border-t border-white/10 pt-3">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.href;

                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.05,
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => handleNavClick(link.href)}
                          className={`flex items-center justify-between border-b border-white/6 px-4 py-4 text-sm transition-all ${
                            isActive
                              ? "text-cyan-400"
                              : "text-white/60 hover:text-cyan-400"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {isActive && (
                              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                            )}

                            {link.name}
                          </span>

                          <ArrowUpRight
                            size={15}
                            className={
                              isActive ? "text-cyan-400" : "text-white/20"
                            }
                          />
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Mobile Auth */}
                  <div className="p-2 pt-4">
                    {status === "loading" ? (
                      <div className="px-4 py-3 text-center text-sm text-white/40">
                        Loading...
                      </div>
                    ) : session ? (
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          signOut({ callbackUrl: "/" });
                        }}
                        className="w-full border border-white/10 px-4 py-3 text-center text-sm font-medium text-white/60 transition hover:border-cyan-400/30 hover:text-cyan-400"
                      >
                        Logout
                      </button>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/login"
                          onClick={() => setMenuOpen(false)}
                          className="border border-white/10 px-4 py-3 text-center text-sm font-medium text-white/60 transition hover:border-white/20 hover:text-white"
                        >
                          Login
                        </Link>

                        <Link
                          href="/register"
                          onClick={() => setMenuOpen(false)}
                          className="bg-cyan-400 px-4 py-3 text-center text-sm font-bold text-black transition hover:bg-cyan-300"
                        >
                          Register
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}

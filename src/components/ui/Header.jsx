import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { useLocation } from "react-router-dom";

export function Header({ className, children, ...props }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = React.useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Update header height on mount and when scrolled state changes
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [scrolled]);

  useEffect(() => {
    const handleOutsideClick = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };

    document.body.addEventListener("click", handleOutsideClick);
    window.addEventListener("scroll", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("scroll", handleOutsideClick);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isActive = (path) => {
    if (path === "/") {
      return currentPath === path;
    }
    return currentPath.includes(path);
  };

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // Only apply custom scrolling for hash links
    if (href.startsWith("#")) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Small delay to ensure menu is closed first
        setTimeout(() => {
          const offsetPosition = targetElement.offsetTop - headerHeight - 16; // Extra padding

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 10);
      }
    } else {
      // For non-hash links, navigate normally
      window.location.href = href;
    }
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-5xl mx-auto px-4 flex items-center justify-between">
        <a href="/" className="font-medium text-2xl text-darkgray">
          Krush<span className="text-orange">i</span>l
        </a>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm text-gray hover:text-orange transition-colors duration-200 flex items-center",
                (link.href.startsWith("#") && currentPath === "/"
                  ? isActive(link.href)
                  : isActive(link.href)) && "text-orange"
              )}
            >
              {link.label}
              {link.icon}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden text-darkgray focus:outline-none p-2 z-50 relative"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <i className={`bx ${isMenuOpen ? "bx-x" : "bx-menu"} text-2xl`}></i>
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 bg-white z-40 transition-all duration-300 md:hidden flex flex-col items-center justify-center",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        style={{ top: 0, height: "100vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="flex flex-col items-center space-y-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-xl font-medium text-gray hover:text-orange transition-colors duration-200 flex items-center",
                (link.href.startsWith("#") && currentPath === "/"
                  ? isActive(link.href)
                  : isActive(link.href)) && "text-orange"
              )}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

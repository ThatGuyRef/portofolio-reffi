import { useEffect, useState } from "react";

const navItems = [
  { label: "STATS", href: "#stats" },
  { label: "SKILLS", href: "#skills" },
  { label: "QUESTS", href: "#quests" },
  { label: "STAGES", href: "#stages" },
  { label: "DEV LOG", href: "#devlog" },
  { label: "CONTACT", href: "#contact" },
];

const HEADER_OFFSET = 74;

export default function Header() {
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      let current = "home";

      navItems.forEach((item) => {
        const section = document.querySelector(item.href);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        if (rect.top <= HEADER_OFFSET + 40 && rect.bottom >= HEADER_OFFSET + 40) {
          current = section.id;
        }
      });

      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTo = (event, href) => {
    event.preventDefault();

    const target = document.querySelector(href);
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop - HEADER_OFFSET,
      behavior: "smooth",
    });

    setActive(href.replace("#", ""));
    setIsOpen(false);
  };

  return (
    <header
      className="fixed left-0 top-0 z-[8000] w-full"
      style={{
        background: "var(--void)",
        borderBottom: "4px solid var(--magenta)",
      }}
    >
      <div
        className="mx-auto flex w-full items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6"
        style={{ maxWidth: 1100, height: 70 }}
      >
        <a
          href="#home"
          onClick={(event) => goTo(event, "#home")}
          className="pix nav-brand flex items-center gap-2"
          style={{ color: "var(--ink)", textDecoration: "none" }}
        >
          <span style={{ color: "var(--magenta)" }}>//</span>
          NAVARRO
          <span style={{ color: "var(--cyan)" }}>REFFI</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => goTo(event, item.href)}
                className="pix"
                style={{
                  fontSize: 10,
                  letterSpacing: 2,
                  padding: "9px 10px",
                  textDecoration: "none",
                  color: isActive ? "var(--void)" : "var(--ink-dim)",
                  background: isActive ? "var(--yellow)" : "transparent",
                  border: `2px solid ${isActive ? "var(--yellow)" : "transparent"}`,
                }}
                onMouseEnter={(event) => {
                  if (!isActive) event.currentTarget.style.color = "var(--cyan)";
                }}
                onMouseLeave={(event) => {
                  if (!isActive) event.currentTarget.style.color = "var(--ink-dim)";
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle menu"
          className="pix lg:hidden"
          style={{
            fontSize: 10,
            padding: "9px 12px",
            color: "var(--void)",
            background: "var(--yellow)",
            border: "3px solid var(--ink)",
            boxShadow: "4px 4px 0 var(--magenta)",
            cursor: "pointer",
          }}
        >
          {isOpen ? "X" : "MENU"}
        </button>
      </div>

      {isOpen && (
        <div
          className="lg:hidden"
          style={{
            background: "var(--panel)",
            borderTop: "3px solid var(--border-muted)",
          }}
        >
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => goTo(event, item.href)}
                className="pix block"
                style={{
                  fontSize: 10,
                  letterSpacing: 2,
                  padding: "16px 24px",
                  textDecoration: "none",
                  color: isActive ? "var(--yellow)" : "var(--ink-dim)",
                  borderBottom: "2px solid var(--void)",
                }}
              >
                {isActive ? "▸ " : "  "}
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}

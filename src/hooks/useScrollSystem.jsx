import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin)

export default function useScrollSystem() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (!el) return

    window.dispatchEvent(
      new CustomEvent("portfolio:navigate-section", {
        detail: { targetId: id },
      })
    )

    const y = el.getBoundingClientRect().top + window.pageYOffset - 80

    gsap.to(window, {
      scrollTo: y,
      duration: 1,
      ease: "power2.inOut",
    })
  }

  return { scrollToSection }
}

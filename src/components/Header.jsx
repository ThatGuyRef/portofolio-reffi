import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Manifest', href: '#manifest' },
  { label: 'Specs', href: '#specs' },
  { label: 'Hangar', href: '#hangar' },
  { label: 'Signal', href: '#signal' },
]

function Header() {
  const headerRef = useRef(null)
  const indicatorRef = useRef(null)
  const navRefs = useRef([])
  const [active, setActive] = useState('home')

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      }
    )
  }, [])

  useEffect(() => {
    const handleScrollSpy = () => {
      let currentSection = 'home'

      navItems.forEach((item) => {
        const section = document.querySelector(item.href)

        if (section) {
          const rect = section.getBoundingClientRect()

          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section.id
          }
        }
      })

      setActive(currentSection)
    }

    handleScrollSpy()
    window.addEventListener('scroll', handleScrollSpy)

    return () => {
      window.removeEventListener('scroll', handleScrollSpy)
    }
  }, [])

  useEffect(() => {
    const activeIndex = navItems.findIndex((item) => item.href === `#${active}`)
    const activeEl = navRefs.current[activeIndex]

    if (!activeEl || !indicatorRef.current) return

    gsap.to(indicatorRef.current, {
      x: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
      opacity: 1,
      duration: 0.35,
      ease: 'power3.out',
    })
  }, [active])

  const handleScroll = (e, href) => {
    e.preventDefault()

    const target = document.querySelector(href)
    if (!target) {
      console.log(`Section ${href} belum ada`)
      return
    }

    const offsetTop = target.offsetTop - 90

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    })

    setActive(href.replace('#', ''))
  }

  return (
    <header
      ref={headerRef}
      className="fixed left-0 top-0 z-50 w-full px-4 py-4 lg:px-10"
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-cyan-300/20 bg-[#101417]/75 px-5 py-3 shadow-[0_0_35px_rgba(0,245,255,0.08)] backdrop-blur-xl">
        <a
          href="#home"
          onClick={(e) => handleScroll(e, '#home')}
          className="group flex items-center gap-3"
        >
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-cyan-300/30 bg-cyan-300/10 p-1">
            <img
              src="/logo.png"
              alt="Navarro Logo"
              className="h-full w-full rounded-lg object-cover"
            />

            <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
          </div>

          <div className="leading-tight">
            <h1 className="text-sm font-bold uppercase tracking-[0.25em] text-white">
              Navarro
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-300/70">
              Gunadarma University // Informatics
            </p>
          </div>
        </a>

        <nav className="relative hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-2 md:flex">
          <span
            ref={indicatorRef}
            className="absolute left-0 top-2 h-8 rounded-full border border-cyan-300/30 bg-cyan-300/10 opacity-0 shadow-[0_0_20px_rgba(0,245,255,0.18)]"
          />

          {navItems.map((item, index) => {
            const id = item.href.replace('#', '')
            const isActive = active === id

            return (
              <a
                key={item.href}
                ref={(el) => (navRefs.current[index] = el)}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className={`relative z-10 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive
                    ? 'text-cyan-200 drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=navarrorevi@gmail.com&su=Portfolio%20Inquiry&body=Hello%20Navarro,%0D%0A%0D%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200 transition duration-300 hover:bg-cyan-300 hover:text-[#101417] hover:shadow-[0_0_25px_rgba(0,245,255,0.35)] sm:inline-flex"
        >
          Contact
        </a>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200 md:hidden">
          ☰
        </button>
      </div>
    </header>
  )
}

export default Header
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#manifest' },
  { label: 'Tech Specs', href: '#specs' },
  { label: 'Projects', href: '#hangar' },
  { label: 'Signal', href: '#signal' },
]

function Header() {
  const headerRef = useRef(null)
  const indicatorRef = useRef(null)
  const navRefs = useRef([])
  const [active, setActive] = useState('home')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -90, opacity: 0, rotate: -1 },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.85,
        ease: 'back.out(1.6)',
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
      duration: 0.42,
      ease: 'back.out(1.8)',
    })
  }, [active])

  const handleScroll = (e, href) => {
    e.preventDefault()

    const target = document.querySelector(href)
    if (!target) {
      console.log(`Section ${href} belum ada`)
      return
    }

    const offsetTop = target.offsetTop - 100

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    })

    setActive(href.replace('#', ''))
    setIsOpen(false)
  }

  return (
    <header
      ref={headerRef}
      className="fixed left-0 top-0 z-50 w-full px-4 py-4 lg:px-10"
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between rounded-[34px] border-4 border-black bg-white px-7 py-4 shadow-[10px_10px_0_#0b0b0b]">
        {/* COMIC STICKERS */}
        <div className="absolute left-5 -top-6 hidden rotate-[-8deg] rounded-2xl border-4 border-black bg-[#35c9ff] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-black shadow-[4px_4px_0_#0b0b0b] lg:block">
          Pow!
        </div>

        <div className="absolute -right-3 -bottom-5 hidden rotate-[8deg] rounded-2xl border-4 border-black bg-[#ffe45c] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-black shadow-[4px_4px_0_#0b0b0b] lg:block">
          Zap!
        </div>

        {/* BRAND */}
        <a
          href="#home"
          onClick={(e) => handleScroll(e, '#home')}
          className="group flex min-w-[210px] items-center"
        >
          <div className="leading-tight">
            <h1 className="text-base font-black uppercase tracking-[0.28em] text-black">
              Navarro
            </h1>

            <div className="mt-2 inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#b7ff4a] px-3 py-1 shadow-[3px_3px_0_#0b0b0b] transition duration-300 group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-[1px_1px_0_#0b0b0b]">
              <span className="h-2 w-2 rounded-full bg-black" />

              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-black">
                Available Now
              </p>
            </div>
          </div>
        </a>

        {/* DESKTOP NAV */}
        <nav className="relative hidden items-center gap-2 rounded-full border-4 border-black bg-[#f7f4ea] px-3 py-2 shadow-[4px_4px_0_#0b0b0b] md:flex">
          <span
            ref={indicatorRef}
            className="absolute left-0 top-2 h-9 rounded-full border-4 border-black bg-[#ffe45c] opacity-0 shadow-[4px_4px_0_#0b0b0b]"
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
                className={`relative z-10 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.16em] transition-all duration-300 ${
                  isActive
                    ? 'text-black'
                    : 'text-black/55 hover:scale-[1.04] hover:text-black'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        {/* CONTACT BUTTON */}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=navarrorevi@gmail.com&su=Portfolio%20Inquiry&body=Hello%20Navarro,%0D%0A%0D%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rotate-[2deg] rounded-full border-4 border-black bg-[#ff4fd8] px-6 py-2 text-xs font-black uppercase tracking-[0.18em] text-black shadow-[5px_5px_0_#0b0b0b] transition duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:rotate-0 hover:bg-[#b7ff4a] hover:shadow-[2px_2px_0_#0b0b0b] sm:inline-flex"
        >
          Contact
        </a>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border-4 border-black bg-[#ffe45c] text-xl font-black text-black shadow-[4px_4px_0_#0b0b0b] transition duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#35c9ff] hover:shadow-[2px_2px_0_#0b0b0b] md:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? '×' : '☰'}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="mx-auto mt-4 max-w-7xl rounded-[28px] border-4 border-black bg-[#f7f4ea] p-4 shadow-[7px_7px_0_#0b0b0b] md:hidden">
          <div className="mb-4 inline-flex rotate-[-2deg] rounded-2xl border-4 border-black bg-[#35c9ff] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-black shadow-[4px_4px_0_#0b0b0b]">
            Menu Panel
          </div>

          <div className="grid gap-3">
            {navItems.map((item) => {
              const id = item.href.replace('#', '')
              const isActive = active === id

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className={`rounded-2xl border-4 border-black px-4 py-3 text-sm font-black uppercase tracking-[0.16em] shadow-[4px_4px_0_#0b0b0b] transition duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0b0b0b] ${
                    isActive
                      ? 'bg-[#ffe45c] text-black'
                      : 'bg-white text-black hover:bg-[#35c9ff]'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=navarrorevi@gmail.com&su=Portfolio%20Inquiry&body=Hello%20Navarro,%0D%0A%0D%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border-4 border-black bg-[#ff4fd8] px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-black shadow-[4px_4px_0_#0b0b0b] transition duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#b7ff4a] hover:shadow-[2px_2px_0_#0b0b0b]"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 px-6 lg:px-10 py-4 bg-[#101417]/90 backdrop-blur-md border-t border-[#00f5ff]/10">

      <div className="flex justify-between items-center">

        {/* LEFT */}
        <div className="text-[9px] uppercase tracking-[0.15em] text-[#b9caca]/40 hidden sm:block">
          © NAVARRO // UC-0093 SYSTEM SPEC
        </div>

        {/* CENTER NAV */}
        <div className="flex gap-6 md:gap-10 relative">
          {['EFSF_ARCHIVE', 'TERMINAL_LOGS', 'SATELLITE_FEED'].map((item) => (
            <a
              key={item}
              href="#"
              className="relative text-[9px] uppercase tracking-[0.15em] text-[#b9caca]/60 hover:text-[#ffb693] transition-all duration-300 group"
            >
              {item}

              {/* underline glow */}
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#ffb693] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* RIGHT HUD */}
        <div className="hidden md:flex items-center gap-4">

          {/* progress bar */}
          <div className="relative w-28 h-[2px] bg-[#313538] overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-[67%] bg-[#00f5ff]" />

            {/* glow line */}
            <div className="absolute top-0 left-0 h-full w-[67%] bg-[#00f5ff] blur-[4px] opacity-40" />
          </div>

          {/* text */}
          <span className="text-[9px] font-black text-[#00f5ff] uppercase tracking-[0.2em]">
            OS_LOAD: 67%
          </span>
        </div>
      </div>

      {/* EXTRA HUD LINE */}
      <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f5ff]/30 to-transparent" />
    </footer>
  )
}
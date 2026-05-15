export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 z-50 hidden w-full px-4 pb-4 md:block lg:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[24px] border-4 border-black bg-white/90 px-5 py-3 shadow-[7px_7px_0_#0b0b0b] backdrop-blur-md">
        {/* LEFT */}
        <div className="hidden text-[9px] font-black uppercase tracking-[0.16em] text-black/55 sm:block">
          © NAVARRO // PORTFOLIO 2026
        </div>

        {/* CENTER NAV */}
        <div className="flex items-center gap-3 sm:gap-5 md:gap-7">
          {["Archive", "Logs", "Feed"].map((item, index) => {
            const colors = ["#35c9ff", "#ffe45c", "#b7ff4a"];

            return (
              <a
                key={item}
                href="#"
                className="group relative rounded-full border-2 border-black bg-[#f7f4ea] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.13em] text-black shadow-[3px_3px_0_#0b0b0b] transition-all duration-300 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#0b0b0b]"
                style={{
                  backgroundColor: colors[index],
                }}
              >
                {item}
              </a>
            );
          })}
        </div>


        {/* MOBILE STATUS */}
        <div className="sm:hidden rounded-full border-2 border-black bg-[#ff4fd8] px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-black shadow-[3px_3px_0_#0b0b0b]">
          2026
        </div>
      </div>
    </footer>
  );
}
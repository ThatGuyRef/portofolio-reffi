import { useEffect, useRef, useState } from "react"

export default function Preloader({ isExiting = false, onFinish }) {
  const [progress, setProgress] = useState(0)
  const hasFinishedRef = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = Math.min(
          prev + Math.floor(Math.random() * 8) + 3,
          100
        )

        if (nextProgress >= 100 && !hasFinishedRef.current) {
          hasFinishedRef.current = true
          clearInterval(interval)

          setTimeout(() => {
            onFinish?.()
          }, 350)
        }

        return nextProgress
      })
    }, 80)

    return () => clearInterval(interval)
  }, [onFinish])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#f7f4ea] px-6 text-black transition-opacity duration-700 ease-out ${
        isExiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(11,11,11,0.11) 1px, transparent 1px),
            linear-gradient(90deg, rgba(11,11,11,0.11) 1px, transparent 1px)
          `,
          backgroundSize: "86px 86px",
        }}
      />

      {/* SCREEN CORNERS */}
      <div className="absolute left-7 top-7 h-24 w-24 border-l-[8px] border-t-[8px] border-black" />
      <div className="absolute right-7 top-7 h-24 w-24 border-r-[8px] border-t-[8px] border-black" />
      <div className="absolute bottom-7 left-7 h-24 w-24 border-b-[8px] border-l-[8px] border-black" />
      <div className="absolute bottom-7 right-7 h-24 w-24 border-b-[8px] border-r-[8px] border-black" />

      {/* BHAAAPPP STICKER */}
      <div className="absolute left-12 top-12 hidden -rotate-12 md:block">
        <div className="relative rounded-xl border-4 border-black bg-[#35c9ff] px-8 py-4 text-3xl font-black italic uppercase text-white shadow-[8px_8px_0_#242424] lg:text-4xl">
          BHAAAPPP!
          <span className="absolute -left-5 top-7 h-8 w-8 rounded-full border-4 border-black bg-[#ff4fd8]" />
        </div>
      </div>

      {/* ZHAMMMMM STICKER */}
      <div className="absolute bottom-20 right-12 hidden rotate-12 md:block">
        <div className="relative rounded-xl border-4 border-black bg-[#ffe45c] px-8 py-4 text-3xl font-black italic uppercase text-black shadow-[8px_8px_0_#242424] lg:text-4xl">
          ZHAMMMMM!
          <span className="absolute -bottom-5 right-2 h-12 w-12 rotate-45 border-4 border-black bg-[#ff4fd8]" />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        <h1 className="text-6xl font-black uppercase italic leading-none tracking-[-0.08em] text-[#35c9ff] [-webkit-text-stroke:3px_#0b0b0b] [text-shadow:8px_8px_0_#242424] sm:text-7xl md:text-8xl">
          Loading...
        </h1>

        {/* PROGRESS BAR */}
        <div className="mt-14 w-full rounded-xl border-4 border-black bg-white p-2 shadow-[8px_8px_0_#242424]">
          <div className="h-10 overflow-hidden rounded-md bg-[#f7f4ea]">
            <div
              className="h-full border-r-4 border-black bg-[repeating-linear-gradient(45deg,#ff4fd8_0_14px,#ff8bea_14px_28px)] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* STATUS ROW */}
        <div className="mt-8 flex w-full items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.14em] sm:text-sm">
          <span className="text-left text-black">
            <span className="mr-2 text-[#35c9ff]">⚡</span>
            Syncing Issues
          </span>

          <span className="rounded-full bg-black px-5 py-2 text-white">
            {Math.min(progress, 100)}%
          </span>
        </div>

        <p className="mt-16 max-w-xl text-lg italic leading-8 text-black/75 md:text-xl">
          "Everybody in this country should learn how to program a computer… because it teaches you how to think."
          – Steve Jobs
        </p>
      </div>

      {/* MINI BOTTOM NAV */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-2xl border-4 border-black/30 bg-white/70 px-6 py-3 shadow-[4px_4px_0_rgba(0,0,0,0.25)] backdrop-blur-md md:flex">
        <div className="flex items-center gap-7 text-[10px] font-black uppercase tracking-[0.1em] text-black/45">
          <span>⌂ Home</span>
          <span className="text-[#35c9ff]">⚡ Bhaappp!</span>
          <span>✦ Zhammmmm!</span>
        </div>
      </div>
    </div>
  )
}
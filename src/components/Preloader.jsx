import { useEffect, useRef, useState } from "react"
import { FaGear } from "react-icons/fa6"

export default function Preloader({ isExiting = false, onFinish }) {
  const [progress, setProgress] = useState(0)
  const hasFinishedRef = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = Math.min(prev + Math.floor(Math.random() * 8) + 3, 100)

        if (nextProgress >= 100 && !hasFinishedRef.current) {
          hasFinishedRef.current = true
          clearInterval(interval)
          onFinish?.()
        }

        return nextProgress
      })
    }, 120)

    return () => clearInterval(interval)
  }, [onFinish])

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#081012] text-[#00f5ff] overflow-hidden flex items-center justify-center transition-opacity duration-700 ease-out ${
        isExiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >

      {/* GRID BG */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      />

      {/* SCANLINE */}
      <div className="fixed inset-0 pointer-events-none scanline opacity-30" />

      {/* TOP LEFT */}
      <div className="absolute top-8 left-10">
        <div className="bg-[#1b2628] px-6 py-3 chamfer-btn text-sm tracking-[0.35em] font-black">
          V-FIN PROTOCOL
        </div>
        <div className="text-[11px] text-[#b9caca]/70 mt-2 tracking-[0.2em]">
          UC_0096 // NEURAL_LINK_STABLE
        </div>
      </div>

      {/* TOP RIGHT */}
      <div className="absolute top-10 right-10 text-right">
        <div className="text-white italic font-black text-2xl tracking-[-0.05em]">
          Navarro's_Portofolio_V.2026
        </div>
        <div className="text-[#ffb693] text-[11px] tracking-[0.35em] font-black">
          AUTHORIZING ACCESS...
        </div>
        <div className="flex justify-end gap-2 mt-3">
          <div className="w-10 h-1 bg-[#00f5ff]" />
          <div className="w-4 h-1 bg-[#ffb693]" />
          <div className="w-10 h-1 bg-[#2b3437]" />
        </div>
      </div>

      {/* CENTER */}
      <div className="relative flex flex-col items-center text-center">

        {/* CIRCLE */}
        <div className="absolute w-[360px] h-[360px] rounded-full border border-[#00f5ff]/30 animate-spin-slow" />
        <div className="absolute w-[300px] h-[300px] rounded-full border-4 border-dashed border-[#00f5ff]/30 animate-spin-slower" />

        <FaGear className="text-5xl mb-8 animate-spin" />

        <div className="text-7xl font-black text-white tracking-[-0.08em]">
          {Math.min(progress, 100)}
          <span className="text-[#00f5ff] text-2xl">%</span>
        </div>

        <div className="mt-5 bg-[#00f5ff] text-[#003739] px-8 py-2 chamfer-btn font-black tracking-[0.3em] text-sm">
          SYSTEM_BOOTING
        </div>

        <p className="mt-8 max-w-md text-[#b9caca] text-sm tracking-[0.35em] leading-relaxed">
          ESTABLISHING HIGH-BANDWIDTH
          <br />
          NEURAL BRIDGE WITH PILOT
          <br />
          BIOMETRIC SIGNATURE...
        </p>
      </div>

      {/* BOTTOM LEFT LOG */}
      <div className="absolute bottom-20 left-10 w-96 border border-[#00f5ff]/10 bg-[#101417]/70 p-5">
        <div className="text-white text-xs tracking-[0.2em] mb-5">
          ▣ DIAGNOSTIC_LOGS
        </div>

        {[
          ["CORE_PROCESSOR:", "STABLE_OK"],
          ["MEMORY_UNITS:", "ALLOCATED"],
          ["PSYCHO-FRAME:", "CALIBRATING..."],
          ["I-FIELD_GEN:", "STANDBY"],
          ["AVIONICS:", "ACTIVE"],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between text-[11px] mb-2">
            <span className="text-[#00f5ff]">{label}</span>
            <span className="text-[#b9caca]">{value}</span>
          </div>
        ))}
      </div>

      {/* BOTTOM BAR */}
      <div className="absolute bottom-8 left-10 right-10 flex items-center gap-6 text-[11px] tracking-[0.2em] text-[#b9caca]/70">
        <span className="text-[#00f5ff]">● LINK_ACTIVE</span>
        <span>FREQ: 5.24 GHZ</span>
        <span>PACKET_LOSS: 0.002%</span>
        <span className="ml-auto text-[#00f5ff]">MODE: INITIATION</span>
      </div>
    </div>
  )
}

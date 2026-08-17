export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0d0720",
        deep: "#160c2e",
        panel: "#1a1033",
        "panel-raised": "#1f1240",
        "border-muted": "#6a5aa0",
        magenta: "#ff2e88",
        cyan: "#22e0ff",
        yellow: "#ffd447",
        green: "#4ef58a",
        ink: "#f2f0ff",
        "ink-dim": "#c9c2ec",
        "ink-faint": "#8e83c4",
      },
      fontFamily: {
        pixel: ["Press Start 2P", "monospace"],
        body: ["VT323", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0px",
      },
    },
  },
  plugins: [],
}

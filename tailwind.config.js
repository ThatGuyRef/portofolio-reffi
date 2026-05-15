export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "on-primary": "#003739",
        "secondary": "#ffb693",
        "primary": "#e9feff",
        "primary-container": "#00f5ff",
        "on-primary-container": "#006c71",
        "secondary-container": "#fe6b00",
        "on-secondary-container": "#572000",
        "surface": "#101417",
        "surface-container": "#1c2023",
        "surface-container-highest": "#313538",
        "on-surface": "#e0e3e7",
        "on-surface-variant": "#b9caca",
        "primary-fixed-dim": "#00dce5",
        "outline": "#849495",
      },
      fontFamily: {
        headline: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0px",
      },
    },
  },
  plugins: [],
}

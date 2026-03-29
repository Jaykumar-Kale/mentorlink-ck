module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ck: {
          blue:      "#0055B3",
          "blue-d":  "#003D82",
          "blue-dd": "#002456",
          "blue-l":  "#EEF4FF",
          "blue-xl": "#F5F8FF",
          orange:    "#F97316",
          "orange-d":"#EA6005",
          "orange-l":"#FFF7ED",
          dark:      "#050E1F",
          navy:      "#0A1A3A",
          gray:      "#F8FAFF",
          "gray-b":  "#E2E8F5",
          text:      "#0F172A",
          muted:     "#64748B",
          light:     "#F8FAFF",
          teal:      "#0891B2",
        },
      },
      fontFamily: {
        sans:    ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        display: ['"Sora"', '"Plus Jakarta Sans"', "sans-serif"],
        mono:    ['"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        "card":    "0 2px 20px rgba(0,85,179,0.08)",
        "card-lg": "0 10px 48px rgba(0,85,179,0.14)",
        "blue":    "0 8px 32px rgba(0,85,179,0.28)",
        "orange":  "0 8px 32px rgba(249,115,22,0.28)",
        "glow":    "0 0 40px rgba(0,85,179,0.15)",
      },
      animation: {
        "fade-up":   "fadeUp 0.7s ease-out",
        "fade-in":   "fadeIn 0.5s ease-out",
        "float":     "float 3s ease-in-out infinite",
        "pulse-slow":"pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        fadeUp: { "0%":{ opacity:"0", transform:"translateY(28px)" }, "100%":{ opacity:"1", transform:"translateY(0)" } },
        fadeIn: { "0%":{ opacity:"0" }, "100%":{ opacity:"1" } },
        float:  { "0%,100%":{ transform:"translateY(0px)" }, "50%":{ transform:"translateY(-8px)" } },
      },
    },
  },
  plugins: [],
};

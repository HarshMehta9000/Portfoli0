import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Enhanced brand colors
        pink: {
          100: "#FFE5F6",
          200: "#FFCCEE",
          300: "#FFB3E6",
          400: "#FF99DD",
          500: "#FF49DB",
          600: "#CC3AB0",
          700: "#992C85",
          800: "#661D59",
          900: "#330F2E",
        },
        purple: {
          100: "#F0E5FF",
          200: "#E0CCFF",
          300: "#D1B3FF",
          400: "#C299FF",
          500: "#7928CA",
          600: "#6120A2",
          700: "#491879",
          800: "#311051",
          900: "#180828",
        },
        blue: {
          100: "#E5F0FF",
          200: "#CCE0FF",
          300: "#B3D1FF",
          400: "#99C2FF",
          500: "#0070F3",
          600: "#005AC2",
          700: "#004392",
          800: "#002D61",
          900: "#001631",
        },
        orange: {
          100: "#FFF0E5",
          200: "#FFE0CC",
          300: "#FFD1B3",
          400: "#FFC299",
          500: "#FF4D00",
          600: "#CC3E00",
          700: "#992E00",
          800: "#661F00",
          900: "#330F00",
        },
        teal: {
          100: "#E5FFFA",
          200: "#CCFFF5",
          300: "#B3FFF0",
          400: "#99FFEB",
          500: "#00CCAA",
          600: "#00A388",
          700: "#007A66",
          800: "#005244",
          900: "#002922",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "slide-up": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "slide-out-left": "slide-out-left 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "hsl(var(--foreground))",
            a: {
              color: "hsl(var(--primary))",
              "&:hover": {
                color: "hsl(var(--primary))",
              },
            },
            h1: {
              color: "hsl(var(--foreground))",
            },
            h2: {
              color: "hsl(var(--foreground))",
            },
            h3: {
              color: "hsl(var(--foreground))",
            },
            h4: {
              color: "hsl(var(--foreground))",
            },
            blockquote: {
              borderLeftColor: "hsl(var(--muted))",
            },
            code: {
              color: "hsl(var(--foreground))",
              backgroundColor: "hsl(var(--muted))",
              borderRadius: "0.25rem",
              padding: "0.15rem 0.3rem",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    ({ addUtilities }) => {
      const newUtilities = {
        ".text-gradient": {
          "background-clip": "text",
          "-webkit-background-clip": "text",
          color: "transparent",
        },
        ".bg-gradient-blur": {
          "backdrop-filter": "blur(10px)",
        },
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      }
      addUtilities(newUtilities)
    },
  ],
} satisfies Config

export default config

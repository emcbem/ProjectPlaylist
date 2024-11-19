/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xxxs: ["6px", "8px"],
      xxs: ["8px", "12px"],
      tiny: ["11.2px", "16px"],
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      lg: ["18px", "28px"],
      xl: ["20px", "28px"],
      "2xl": ["24px", "32px"],
      "3xl": ["30px", "36px"],
      "4xl": ["36px", "40px"],
      "5xl": ["48px", "1"],
      "6xl": ["60px", "1"],
      "7xl": ["72px", "1"],
      "8xl": ["96px", "1"],
      "9xl": ["128px", "1"],
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      screens: {
        lgmd: "820px",
      },
      colors: {
        pppurple: {
          950: "hsl(316, 40%, 5%)",
          900: "hsl(315, 38%, 9%)",
          800: "hsl(313, 38%, 13%)",
          700: "hsl(315, 38%, 18%)",
          600: "hsl(315, 37%, 22%)",
          500: "hsl(314, 38%, 27%)",
          400: "hsl(315, 20%, 40%)",
          300: "hsl(315, 14%, 53%)",
          200: "hsl(315, 13%, 66%)",
          100: "hsl(315, 14%, 79%)",
          50: "hsl(319, 15%, 92%)",
        },
        pporange: {
          950: "hsl(12, 52%, 12%)",
          900: "hsl(12, 51%, 22%)",
          800: "hsl(12, 51%, 32%)",
          700: "hsl(12, 51%, 42%)",
          600: "hsl(12, 57%, 52%)",
          500: "hsl(12, 86%, 62%)",
          400: "hsl(12, 85%, 69%)",
          300: "hsl(12, 85%, 75%)",
          200: "hsl(12, 86%, 82%)",
          100: "hsl(11, 85%, 89%)",
          50: "hsl(11, 80%, 96%)",
        },
        gradientBlue: "rgba(47, 44, 102, 1)",
        gradientOrange: "rgba(242, 112, 78, 0.41780462184873945)",

        black: "#0E191C",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        "color-1": "hsl(var(--color-1))",
        "color-2": "hsl(var(--color-2))",
        "color-3": "hsl(var(--color-3))",
        "color-4": "hsl(var(--color-4))",
        "color-5": "hsl(var(--color-5))",

        clay: {
          50: "#0e191c",
          100: "#182225",
          200: "#222b2e",
          300: "#2d3538",
          400: "#383f41",
          500: "#43494b",
          600: "#4f5455",
          700: "#5b5f60",
          800: "#676a6a",
          900: "#737575",
          950: "#b9baba",
        },
      },

      animation: {
        shine: "shine var(--duration) infinite linear",
        rainbow: "rainbow var(--speed, 2s) infinite linear",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "background-position-spin":
          "background-position-spin 3000ms infinite alternate",
        grid: "grid 15s linear infinite",
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        shine: {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          to: {
            "background-position": "0% 0%",
          },
        },
        rainbow: {
          "0%": {
            "background-position": "0%",
          },
          "100%": {
            "background-position": "200%",
          },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        "background-position-spin": {
          "0%": {
            backgroundPosition: "top center",
          },
          "100%": {
            backgroundPosition: "bottom center",
          },
        },
        grid: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        marquee: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-100% - var(--gap)))",
          },
        },
        "marquee-vertical": {
          from: {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(calc(-100% - var(--gap)))",
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/container-queries"),
  ],
};

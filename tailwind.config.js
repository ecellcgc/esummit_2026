/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}",
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
            fontFamily: {
                sans: ['Nunito', 'sans-serif'],
            },
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
                glass: {
                    DEFAULT: "hsl(var(--glass-bg))",
                    border: "hsl(var(--glass-border))",
                    glow: "hsl(var(--glass-glow))",
                },
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
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
                "pulse-glow": {
                    "0%, 100%": { opacity: "0.5" },
                    "50%": { opacity: "1" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "pulseArrow": {
                    "0%, 100%": { transform: "translateY(0)", opacity: "0.6" },
                    "50%": { transform: "translateY(3px)", opacity: "1" },
                },
                "p5-scroll": {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(calc((-300px - 2rem) * var(--guest-count, 4)))" },
                },
                "lensFadeIn": {
                    "from": { opacity: "0", transform: "scale(0.8)" },
                    "to": { opacity: "1", transform: "scale(1)" },
                },
                "fadeSlideUp": {
                    "0%": { opacity: "0", transform: "translateY(50px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "p3-scroll": {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(calc((-320px - 1rem) * var(--p3-set-size, 4)))" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "pulse-glow": "pulse-glow 3s ease-in-out infinite",
                "float": "float 6s ease-in-out infinite",
                "pulse-arrow": "pulseArrow 2s infinite",
                "p5-scroll": "p5-scroll 40s linear infinite",
                "lensFadeIn": "lensFadeIn 0.2s ease-out",
                "fadeSlideUp": "fadeSlideUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
                "p3-scroll": "p3-scroll 25s linear infinite",
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

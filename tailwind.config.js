/** @type {import('tailwindcss').Config} */
import keepPreset from "keep-react/preset";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  presets: [keepPreset],
  theme: {
    extend: {
      colors: {
        "token-05859bda": "rgba(248, 213, 207, .99)",
        "token-a621ccc8": "rgb(255, 218, 121)",
        background: "var(--grape)",
        background2: "var(--grape2)",
        titleColor: "var(--tittle-color)",
        textColor: "var(--text-color)",
        spanTextColor: "var(--spanText-color)",
        btnTextColor: "var(--btn-text-color)",
        btnBgColor: "var(--btn-bg-color)",
        cardBgHexa: "var(--bg-hexaprimary-color)",
        cardBgHexaPrimary: "var(--bg-hexaprimary-color)",
        cardBgHexaSecondary: "var(--bg-hexasecondary-color)",
          // ----------text---------
            TextColor: "var(--text-allcard)",

            // ----------all card and text new color------------
            AllCard: "var(--bg-allcard)",
            AllTitle: "var(--text-alltitle)",
            AllSubtitle: "var(--text-allsubtitle)",
      },
    },
    darkTheme: "class",
  },
};

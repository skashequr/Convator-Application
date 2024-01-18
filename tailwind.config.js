/** @type {import('tailwindcss').Config} */
import keepPreset from "keep-react/preset";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  
  presets: [keepPreset],
  theme: {
    extend: {
      colors: {
        'token-05859bda': 'rgba(248, 213, 207, .99)',
        'token-a621ccc8': 'rgb(255, 218, 121)',
      },
    },
  },

}

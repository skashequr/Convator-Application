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
        'token-05859bda': 'rgba(248, 213, 207, .99)',
        'token-a621ccc8': 'rgb(255, 218, 121)',
        'token-9ab47ae7': 'rgb(255, 255, 255)',
        'token-117cbcaa': 'rgb(6, 3, 24)',
        'token-44598686': 'rgb(61, 61, 78)',
        'token-42a81652': 'rgb(110, 109, 122)',
        'token-e99c4951': 'rgb(158, 158, 167)',
        'token-48a71414': 'rgb(219, 218, 222)',
        'token-eb13911e': 'rgb(231, 231, 233)',
        'token-15f3a2f1': 'rgb(243, 243, 244)',
        'token-bbe65d78': 'rgb(249, 249, 250)',
        'token-2d7bc6f4': 'rgb(222, 181, 102)',
        'token-39d4b8e1': 'rgb(227, 215, 247)',
        'token-358ee009': 'rgb(246, 244, 238)',
        'token-66efe343': 'rgb(28, 94, 255)',
        'token-5d4dd9c1': '#EC54A7',
        'token-5c4b2bc0': '#f082ac',
        'token-a23abf65': 'rgb(77, 199, 115)',
        'token-1e9c6608': 'rgb(94, 202, 233)',
      },
    },
  },
  plugins: [require("flowbite/plugin")],
}


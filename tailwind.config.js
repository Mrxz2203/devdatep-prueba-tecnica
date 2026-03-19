/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        pika: {
          yellow: '#FFCC00',
          yellowDark: '#F0B800',
          yellowLight: '#FFF9C4',
          brown: '#8B6914',
          red: '#FF6B6B',
          dark: '#2C2C2C',
        }
      }
    },
  },
  plugins: [],
}
// Se agrega la paleta de Pikachu para el fondo de la pagina y los cards de los pokemones
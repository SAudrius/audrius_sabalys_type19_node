module.exports = {
  content: ['./public/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: '#7A9FFF',
        secondary: '#FFE2C8',
      },
      maxWidth: {
        640: '640px',
        980: '980px',
      },
      width: {
        300: '300px',
      },
    },
  },
  plugins: [],
};

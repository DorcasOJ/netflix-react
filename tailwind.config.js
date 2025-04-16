
// tailwind.config.js
module.exports = {
    content: ["./src/**/*.{js, jsx, ts, tsx}",],
    theme: {
      // ...
    },
    plugins: [
      require('tailwind-scrollbar-hide')
      // ...
    ]
  }
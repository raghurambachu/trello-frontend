module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      width: (theme) => ({
        auto: "auto",
        ...theme("spacing"),
        30: "30%",
        45: "45%",
        72: "18rem",
        80: "20rem",
      }),
    },
  },
  variants: {},
  plugins: [],
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "@nuxtjs/tailwindcss",
    "vuetify-nuxt-module",
    "nuxt-marquee",
  ],
  runtimeConfig: {
    public: {
      commsionPercentage: process.env.COMMISION_PERCENTAGE,
      interestRate: process.env.INTEREST_RATE,
    },
  },
  vuetify: {
    vuetifyOptions: {
      components: ["VTextField", "VCombobox"],
    },
  },
  googleFonts: {
    families: {
      Outfit: true,
      Inter: true,
    },
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          backgroundImage: {
            checkingvitals: "url('/checkingvitals.png')",
            panels: "url('/panels.png')",
            piggy: "url('/piggy.png')",
            handshake: "url('/handshake.jpeg')",
            energy: "url('/energy.png')",
            fixing: "url('/fixing.jpeg')",
            greenwave: "url('/greenwave.png')",
            bluewave: "url('/bluewave.png')",
            minibluewave: "url('/minibluewave.png')",
            miniwhitewave: "url('/miniwhitewave.png')",
            smarthome: "url('/smarthome.png')",
            greenwave2: "url('/greenwave2.png')",
            technicians: "url('/technicians.jpeg')",
          },
          backgroundSize: { "90%": "90%" },
        },
      },
    },
  },
});

const {defineConfig} = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    appUrl: "http://localhost:3000",
    backendUrl: "http://localhost:8080",
  },
});
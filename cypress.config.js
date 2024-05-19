import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    USER_PASSWORD: process.env.USER_PASSWORD,
    USER_EMAIL: process.env.USER_EMAIL,
    USER_NAME: process.env.USER_NAME,
  },
});

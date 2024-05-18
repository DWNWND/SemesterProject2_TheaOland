export const testUrl = "/";

export const validEmail = Cypress.env("USER_EMAIL");
export const validUsername = Cypress.env("USER_NAME");
export const validPassword = Cypress.env("USER_PASSWORD");

export const invalidEmail = "invalid@email";
export const invalidUsername = "invalid.username";
export const invalidPassword = "invalidPassword";
export const invalidRepeatPassword = "passwordInvalid";

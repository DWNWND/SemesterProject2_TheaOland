// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("navigateToLoginForm", () => {
  cy.get("#loginBtnLanding").click();
  cy.wait(500);
});

Cypress.Commands.add("loginWithCredentials", (email, password) => {
  cy.intercept({
    method: "POST",
    url: "**/auth/login",
  }).as("loginWithCredentials");
  cy.get("#loginEmail").type(email);
  cy.get("#loginPassword").type(password);
  cy.get("#loginForm").submit();
});

Cypress.Commands.add("login", (url, email, password) => {
  cy.visit(url);
  cy.wait(500);
  cy.get("#landingPage").should("be.visible");
  cy.navigateToLoginForm();
  cy.loginWithCredentials(email, password);
  cy.wait("@loginWithCredentials").its("response.statusCode").should("eq", 200);
  cy.intercept({
    method: "GET",
    url: "**/auction/listings/**",
  }).as("login");
});

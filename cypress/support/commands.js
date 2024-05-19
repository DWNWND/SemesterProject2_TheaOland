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

Cypress.Commands.add("login", (email, password) => {
  cy.intercept({
    method: "POST",
    url: "**/auth/login",
  }).as("login");
  cy.get("#loginEmail").type(email);
  cy.get("#loginPassword").type(password);
  cy.get("#loginForm").submit();
});

Cypress.Commands.add("registerNewUser", (email, username, password1, password2) => {
  cy.intercept({
    method: "POST",
    url: "**/auth/register",
  }).as("registerNewUser");
  cy.get("#registerEmail").type(email);
  cy.get("#registerUsername").type(username);
  cy.get("#registerPassword").type(password1);
  cy.get("#registerRepeatPassword").type(password2);
  cy.get("#registerForm").submit();
});

Cypress.Commands.add("publishNewListingError", () => {
  cy.intercept({
    method: "POST",
    url: "**/auction/listings/",
  }).as("publishNewListingError");
  cy.get("#new-listing-title").type("test");
  cy.get("#new-listing-description").type("test");
  cy.get("#newListing").submit();
});

Cypress.Commands.add("publishNewListing", () => {
  cy.intercept({
    method: "POST",
    url: "**/auction/listings/",
  }).as("publishNewListing");
  cy.get("#new-listing-title").type("test");
  cy.get("#new-listing-description").type("test");
  cy.get("#deadlineInput")
    .click()
    .then((input) => {
      input[0].dispatchEvent(new Event("input", { bubbles: true }));
      input.val("2025-04-30T13:00");
    })
    .click();
  cy.get("#newListing").submit();
});

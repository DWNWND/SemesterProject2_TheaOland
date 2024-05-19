import { testUrl, validEmail, validPassword, validUsername, invalidEmail, invalidPassword, invalidUsername, invalidRepeatPassword } from "../support/testCredentials.js";

describe("register new user functionality", () => {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.wait(1000);
    cy.get("#loginBtnLanding").click();
    cy.get("#signup-tab").click();
    cy.get("#registerForm").should("be.visible");
  });

  it("displays a message if theres already a user with the email", () => {
    cy.registerNewUser(validEmail, validUsername, validPassword, validPassword);
    cy.wait("@registerNewUser").its("response.statusCode").should("eq", 400);
    cy.get("#feedbackContainer").should("contain", "There is already an account with these credentials, try logging in instead.");
  });

  it("displays error if a user tries to submit the form with invalid credentials", () => {
    cy.registerNewUser(invalidEmail, invalidUsername, invalidPassword, invalidRepeatPassword);
    cy.get("#feedbackContainer").should("contain", "Please fill in all the registration fields according to registration criteria.");
  });

  it("displays validation errors when provided with invalid credentials", () => {
    cy.registerNewUser(invalidEmail, invalidUsername, invalidPassword, invalidRepeatPassword);
    cy.get("#emailHelpBlock").should("be.visible").should("have.class", "error");
    cy.get("#usernameHelpBlock").should("be.visible").should("have.class", "error");
    cy.get("#passwordHelpBlock").should("be.visible").should("have.class", "error");
    cy.get("#registerRepeatPasswordError").should("be.visible").should("have.class", "error").should("contain", "The passwords do not match");
  });

  it("displays validation if the two passwords match and the passwords match citeria", () => {
    cy.registerNewUser(validEmail, validUsername, validPassword, validPassword);
    cy.get("#passwordHelpBlock").should("not.be.visible");
    cy.get("#registerRepeatPasswordError").should("be.visible").should("have.class", "success").should("contain", "The passwords match");
  });

  it("displays validation error if the two passwords match but the passwords don't match citeria", () => {
    cy.registerNewUser(validEmail, validUsername, invalidPassword, invalidPassword);
    cy.get("#passwordHelpBlock").should("be.visible").should("have.class", "error");
    cy.get("#registerRepeatPasswordError").should("be.visible").should("have.class", "success").should("contain", "The passwords match");
  });
});

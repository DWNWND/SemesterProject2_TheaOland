import { testUrl, validEmail, validPassword, invalidEmail, invalidPassword } from "../support/testCredentials.js";

describe("login functionality", () => {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.wait(1000);
    cy.get("#loginBtnLanding").click();
    cy.get("#loginForm").should("be.visible");
  });

  it("displays a message if the login function is called with wrong credentials", () => {
    cy.login(validEmail, invalidPassword);
    cy.wait("@login").its("response.statusCode").should("eq", 401);
    cy.get("#feedbackContainer").should("contain", "Email and/or password does not match.");
  });

  it("displays a message if the login function is called with invalid email", () => {
    cy.login(invalidEmail, invalidPassword);
    cy.wait("@login").its("response.statusCode").should("eq", 400);
    cy.get("#feedbackContainer").should("contain", "An error occured. Check that your credentials are correct or try again later.");
  });

  it("displays a login form and logs in with valid credentials", () => {
    cy.login(validEmail, validPassword);
    cy.wait("@login").its("response.statusCode").should("eq", 200);
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.exist;
    });
  });
});

import { testUrl, validEmail, validPassword, validUsername, invalidEmail, invalidPassword } from "../support/testCredentials.js";

describe("login functionality", () => {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.wait(1000);
    cy.get("#feed").should("be.visible");
  });

  it("does not submit the login form and displays a message if the login function is called with invalid credentals", () => {
    cy.navigateToLoginForm();
    cy.get("#loginForm").should("be.visible");
    cy.loginWithCredentials(invalidEmail, invalidPassword);
    cy.wait("@loginWithCredentials").its("response.statusCode").should("eq", 401);
    cy.wait(1000);
    //ADD EXPECTED ERRORMESSAGE HERE LATER
    cy.get("#userFeedback").should("not.be.empty");
  });

  it("displays a login form and logs in with valid credentials", () => {
    cy.navigateToLoginForm();
    cy.get("#loginForm").should("be.visible");
    cy.loginWithCredentials(validEmail, validPassword);
    cy.wait("@loginWithCredentials").its("response.statusCode").should("eq", 200);

    //THIS MIGHT NOT BE NEEDED:
    // cy.url().should("include", validUsername);

    //THIS IS WHATS NEEDED
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.exist;
    });
  });
});

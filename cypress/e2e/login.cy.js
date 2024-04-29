// from the CA requirements:
// The user can log in with the login form with valid credentials
// The user cannot submit the login form with invalid credentials and is shown a message.

import { testUrl, validEmail, validPassword, validUsername, invalidEmail, invalidPassword } from "../support/testCredentials.js";

describe("login functionality", () => {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.wait(500);
    cy.get("#feedxx").should("be.visible");
  });

  it("does not submit the login form and displays a message if the login function is called with invalid credentals", () => {
    cy.navigateToLoginForm();
    cy.get("#loginForm").should("be.visible");
    cy.loginWithCredentials(invalidEmail, invalidPassword);
    cy.wait("@loginWithCredentials").its("response.statusCode").should("eq", 401);

    //DONT KNOW IF THE WAIT IS NEEDED HERE
    cy.wait(500);

    //ADD EXPECTED ERRORMESSAGE HERE LATER
    expect("#userFeedback").not.to.be.empty;

    //OLD EXAMPLE:
    // cy.on("window:alert", (alertMessage) => {
    //   expect(alertMessage).to.contain("Either your username was not found or your password is incorrect");
    // });
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

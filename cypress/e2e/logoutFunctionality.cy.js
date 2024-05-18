import { testUrl, validEmail, validPassword, validUsername } from "../support/testCredentials.js";

describe("profile page funcitonality", () => {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.wait(1000);
    cy.get("#loginBtnLanding").click();
    cy.login(validEmail, validPassword);
    cy.wait("@login").its("response.statusCode").should("eq", 200);
    cy.get("#usernameBtn").should("have.text", validUsername);
    cy.get("#usernameBtn").click();
  });
  it("shows the logout btn in the profile view", () => {
    cy.get("#logoutBtn").should("be.visible");
  });
  it("removes the token from local storage when the logout function is invoked", () => {
    cy.get("#logoutBtn").click();
    cy.wait(1000);
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.be.null;
    });
  });
});

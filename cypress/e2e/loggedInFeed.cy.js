import { testUrl, validEmail, validPassword, validUsername } from "../support/testCredentials.js";

describe("logged in feed functionality", () => {
  beforeEach(() => {
    cy.login(testUrl, validEmail, validPassword);
    cy.wait("@login");
    cy.wait(1000);
  });
  it("generates a dynamic feed when a user is logged in", () => {
    expect("#feed").not.to.be.empty;
    expect("#logoutBtn").to.be.visible;
    cy.get("#listing").should("include", "button");
    // cy.get("#usernameBtn").should("include", validUsername);
    expect("#newlistingBtn").to.be.visible;
  });
  it("navigates to the profile page when the usernameBtn is clicked", () => {
    cy.get("#usernameBtn").should("include", validUsername).click();
    cy.wait(500);
    cy.url().should("include", "profile");
  });
  it("navigates to the new listing page when the newListingBtn is clicked", () => {
    cy.get("#newListingBtn").should("include", "New listing").click();
    cy.wait(500);
    cy.url().should("include", "edit");
  });
  it("navigates to a listing spesific page when a viewBtn is clicked", () => {
    cy.get("#viewBtn").click();
    cy.wait(500);
    cy.url().should("include", "listing");
  });
  it("logs the user out by clicking the logout button", () => {
    cy.logout();
    cy.wait(1000);
  });
});

import { testUrl, validEmail, validPassword, validUsername } from "../support/testCredentials.js";

describe("edit listing functionality", () => {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.wait(1000);
    cy.get("#loginBtnLanding").click();
    cy.login(validEmail, validPassword);
    cy.wait("@login").its("response.statusCode").should("eq", 200);
    cy.get("#usernameBtn").should("have.text", validUsername);
    cy.get("#usernameBtn").click();
  });
  it("displays edit buttons on the users listings", () => {
    cy.get("#editListingBtn").should("be.visible");
  });
  it("navigates to edit page when the edit listing button is clicked ", () => {
    cy.get("#editListingBtn").click();
    cy.get("#new-listing-title").should("be.visible");
    cy.get("#new-listing-description").should("be.visible");
  });
  it("populates the update form correctly", () => {
    cy.get("#editListingBtn").click();
    cy.get("#new-listing-title").should("have.value", "test");
    cy.get("#new-listing-description").should("have.value", "test");
  });
  it("shows a message when the listing is successfully updated", () => {
    cy.get("#editListingBtn").click();
    cy.get("#new-listing-title").should("have.value", "test");
    cy.get("#new-listing-description").should("have.value", "test");
    cy.get("#newListing").submit();
    cy.get("#feedbackContainerOnAction").should("contain", "listing successfully updated");
  });
  it("shows a error message when a user tries to edit a listing with unvalid information", () => {
    cy.get("#editListingBtn").click();
    cy.get("#new-listing-title").should("have.value", "test");
    cy.get("#new-listing-title").clear();
    cy.get("#new-listing-description").should("have.value", "test");
    cy.get("#new-listing-description").clear();
    cy.get("#newListing").submit();
    cy.get("#feedbackContainerOnAction").should("contain", "Couln't update listing, make sure you have filled out all required fields.");
  });
});

import { testUrl, validEmail, validPassword } from "../support/testCredentials.js";

describe("publish new listing functionality", () => {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.wait(1000);
    cy.get("#loginBtnLanding").click();
    cy.login(validEmail, validPassword);
    cy.wait("@login").its("response.statusCode").should("eq", 200);
    cy.get("#newlistingBtn").should("be.visible").click();
  });
  it("displays error message if the listing is not filled out correctly", () => {
    cy.publishNewListingError();
    cy.get("#feedbackContainerOnAction").should("contain", "Please make sure you have filled out all required fields");
  });
  it("displays a message when a listing is published correctly", () => {
    cy.publishNewListing();
    cy.get("#feedbackContainerOnAction").should("contain", "listing successfully published");
  });
});

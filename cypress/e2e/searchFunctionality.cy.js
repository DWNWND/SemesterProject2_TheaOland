import { testUrl } from "../support/testCredentials.js";

describe("search functionality", () => {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.wait(1000);
    cy.get("#feed").should("be.visible");
  });
  it("shows content related to the search query", () => {
    cy.get("#searchbar").should("be.visible").type("cypress");
    cy.wait(2000);
    cy.get("#currentPage").should("contain", "1");
    cy.get("#listing-title").should("contain", "cypress");
  });
});

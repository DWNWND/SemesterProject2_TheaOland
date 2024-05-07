import { testUrl } from "../support/testCredentials.js";

describe("pagination functionality", () => {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.wait(500);
    cy.get("#feed").should("be.visible");
  });
  it("updated the pages if the nextbtn is clicked", () => {
    cy.get("#nxtBtn").should("be.visible").click();
    cy.wait(1000);
    cy.get("#currentPage").should("contain", "2");
    it("updated the pages if the prevbtn is clicked", () => {
      cy.get("#prvBtn").should("be.visible").click();
      cy.wait(1000);
      cy.get("#currentPage").should("contain", "1");
    });
  });
});

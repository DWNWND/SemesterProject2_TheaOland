import { testUrl } from "../support/testCredentials.js";

describe("pagination functionality", () => {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.wait(1000);
    cy.get("#feed").should("be.visible");
  });
  it("updates the pagination if the nextbtn is clicked", () => {
    cy.get("#currentPage").should("contain", "1");
    cy.get("#nxtBtn").should("be.visible").click();
    cy.wait(1000);
    cy.get("#currentPage").should("contain", "2");
  });
  it("updates the pagination if the prevbtn is clicked", () => {
    cy.get("#currentPage").should("contain", "1");
    cy.get("#nxtBtn").should("be.visible").click();
    cy.wait(1000);
    cy.get("#prvBtn").should("be.visible").click();
    cy.wait(1000);
    cy.get("#currentPage").should("contain", "1");
  });
  it("updates the pagination even if the prevbtn and nextbtn is clicked sporadically", () => {
    cy.get("#currentPage").should("contain", "1");
    cy.get("#nxtBtn").should("be.visible").click();
    cy.get("#nxtBtn").click();
    cy.wait(1000);
    cy.get("#prvBtn").should("be.visible").click();
    cy.wait(1000);
    cy.get("#nxtBtn").should("be.visible").click();
    cy.get("#nxtBtn").click();
    cy.get("#currentPage").should("contain", "4");
  });
  it("updates the pagination to 1 if a user is typing in the search and continues the pagination correctly in the search", () => {
    cy.get("#currentPage").should("contain", "1");
    cy.get("#nxtBtn").should("be.visible").click();
    cy.get("#nxtBtn").click();
    cy.wait(1000);
    cy.get("#searchbar").should("be.visible").type("test");
    cy.wait(1000);
    cy.get("#currentPage").should("contain", "1");
    cy.get("#prvBtn").should("not.be.visible");
    cy.get("#nxtBtn").should("be.visible").click();
    cy.get("#nxtBtn").click();
    cy.wait(1500);
    cy.get("#currentPage").should("contain", "3");
    cy.get("#prvBtn").should("be.visible").click();
    cy.wait(1000);
    cy.get("#nxtBtn").should("be.visible").click();
    cy.get("#nxtBtn").click();
    cy.get("#currentPage").should("contain", "4");
  });
});

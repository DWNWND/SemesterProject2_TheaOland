import { testUrl, validEmail, validPassword, validUsername } from "../support/testCredentials.js";

describe("open listing spesific functionality", () => {
  beforeEach(() => {
    cy.login(testUrl, validEmail, validPassword);
    cy.wait("@login");
    cy.wait(2000);
  });
  it("generates a listing spesific page when clicking on the view btn in the feed", () => {
    cy.get("#viewListingBtn").should("be.visible").click();
    cy.wait(1000);
    expect("#listing").not.to.be.empty;
    cy.get("#newlistingBtn").should("be.visible");
    cy.get("#usernameBtn").should("include", validUsername);

    it("shows listing details, media gallery and bids", () => {
      expect("#listingDetails").not.to.be.empty;
      expect("#listingBids").not.to.be.empty;
      expect("#listingMedia").not.to.be.empty;
    });
    it("is possible to add a bid to the listing", () => {
      cy.get("#placeBid").should("be.visible");
      cy.get("#placeBid").type("1");
      cy.get("#placeBidForm").submit();
      cy.wait(1000);
      cy.get("#listingBids").should("include", "1");
    });
  });
});

import { testUrl, validEmail, validPassword, validUsername } from "../support/testCredentials.js";

describe("listing spesific page, place bid and bid history functionality", () => {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.wait(1000);
    cy.get("#loginBtnLanding").click();
    cy.login(validEmail, validPassword);
    cy.wait("@login").its("response.statusCode").should("eq", 200);
    cy.get("#viewListingBtn").should("be.visible").click();
    cy.wait(1000);
  });
  it("shows listing details, media gallery and bids", () => {
    cy.get("#details").should("be.visible");
    cy.get("#currentBidContainer").should("be.visible");
    cy.get("#bidHistory").should("be.visible");
    cy.get("#mediaGallery").should("be.visible");
    expect("#details").not.to.be.empty;
    expect("#currentBidContainer").not.to.be.empty;
    expect("#bidHistory").not.to.be.empty;
    expect("#mediaGallery").not.to.be.empty;
  });
  it("displays an error if a user is trying to bid lower than the current bid", () => {
    cy.get("#placeBid").should("be.visible");
    cy.get("#bid-input").type("1");
    cy.get("#placeBid").submit();
    cy.wait(1000);
    cy.get("#bidFeedback").should("be.visible").should("contain", "Make sure that the listing is active and your bid is higher than the current bid.");
  });
  it("submits a bid if it's higher than the current one", () => {
    cy.get("#placeBid").should("be.visible");
    cy.get("#bid-input").type("1");
    cy.get("#placeBid").submit();
    cy.wait(1000);
    cy.get("#bidHistory").should("be.contain", validUsername);
  });
});

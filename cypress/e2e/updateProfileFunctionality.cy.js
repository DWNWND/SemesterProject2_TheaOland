import { testUrl, validEmail, validPassword, validUsername } from "../support/testCredentials.js";

describe("profile page funcitonality", () => {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.wait(1000);
    cy.get("#loginBtnLanding").click();
    cy.login(validEmail, validPassword);
    cy.wait("@login").its("response.statusCode").should("eq", 200);
  });
  it("displays the logged in users username in the navbtns", () => {
    cy.get("#usernameBtn").should("have.text", validUsername);
  });
  it("displays the users total credit", () => {
    cy.get("#usernameBtn").click();
    cy.get("#totalCredit").should("be.visible");
  });
  it("it has edit profile functionality", () => {
    cy.get("#usernameBtn").click();
    cy.get("#editProfileBtn").click();
    cy.get("#editProfile").should("be.visible");
  });
  it("it displays an error if the profile is updated without nescessary information", () => {
    cy.get("#usernameBtn").click();
    cy.get("#editProfileBtn").click();
    cy.get("#editProfile").should("be.visible");
    cy.get("#avatar").clear();
    cy.get("#avatar").type("fakeurl");
    cy.get("#editProfile").submit();
    cy.get("#userFeedbackContainer").should("be.visible").should("contain", "Couldn't update userprofile");
  });
  it("it displays a success message of the profile is updated successfully", () => {
    cy.get("#usernameBtn").click();
    cy.get("#editProfileBtn").click();
    cy.get("#editProfile").should("be.visible");
    cy.get("#editProfile").submit();
    cy.get("#userFeedbackContainer").should("be.visible").should("contain", "profile successfully updated");
  });
});

import { validCredentials, invalidCredentials } from "../fixtures/login.json";

describe("Valid Login Test", () => {

    it("shouid allow a user to log in with valid credentials", () =>{
        cy.login(validCredentials);
        cy.location("pathname").should("include", "/");
        cy.get("h1").should("contain", validCredentials.username);
    })
});

describe("Valid Login Server Response Test", () => {
  it("should be able to get a valid response from server", () => {
    cy.loginServerResponseCheck(validCredentials);
  });
});

describe("Invalid Login Server Response Test", () => {
  it("check the server response status code and message", () => {
    cy.InvalidloginServerResponseCheck(invalidCredentials);
  });
});
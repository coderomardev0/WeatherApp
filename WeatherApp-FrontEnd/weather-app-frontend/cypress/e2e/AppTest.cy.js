describe("App Running Test", () => {
  it ("passes", () => {
    cy.visit("http://localhost:3000/login");
    cy.location("pathname").should("include", "/login");

    cy.visit("http://localhost:3000/signup");
    cy.location("pathname").should("include", "/signup");

    cy.visit("http://localhost:3000/resetEmailLink");
    cy.location("pathname").should("include", "/resetEmailLink");
  });
});
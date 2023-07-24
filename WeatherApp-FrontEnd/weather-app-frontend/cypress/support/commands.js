// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const APP_URL = Cypress.env('appUrl');
const BACKEND_URL = Cypress.env('backendUrl');

Cypress.Commands.add('login', (credentials) => {
  cy.visit(`${APP_URL}/login`);
  cy.get("input[name='username']").type(credentials.username);
  cy.get("input[name='password']").type(credentials.password).type('{enter}');
});

Cypress.Commands.add('loginServerResponseCheck', (credentials) => {
  cy.request({
    method: 'POST',
    url: `${BACKEND_URL}/user/login`,
    body: {
      username: credentials.username,
      password: credentials.password,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Cypress.Commands.add("InvalidloginServerResponseCheck", (credentials) => {
  cy.request({
    method: "POST",
    url: `${BACKEND_URL}/user/login`,
    body: {
      username: credentials.username,
      password: credentials.password,
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body.message).to.eq("Username or Password is Incorrect. Please try again");
  });
});

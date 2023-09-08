describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Sunil Tajpuriya",
      username: "tajpuriya",
      password: "tajpuriya27",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
  });

  it("login form can be opened", function () {
    cy.contains("Click to login").click();
  });

  it("user can login", function () {
    cy.contains("Click to login").click();
    cy.get("#username").type("tajpuriya");
    cy.get("#password").type("tajpuriya27");
    cy.get("#login-button").click();

    cy.contains("Sunil Tajpuriya logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("Click to login").click();
      cy.get("#username").type("tajpuriya");
      cy.get("#password").type("tajpuriya27");
      cy.get("#login-button").click();
    });

    it("a new note can be created", function () {
      cy.contains("Add note").click();
      cy.get("#note-input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.contains("Add note").click();
        cy.get("input").type("another note cypress");
        cy.contains("save").click();
      });

      it("it can be made not important", function () {
        cy.contains("another note cypress")
          .contains("make not important")
          .click();

        cy.contains("another note cypress").contains("make important");
      });
    });
  });
});

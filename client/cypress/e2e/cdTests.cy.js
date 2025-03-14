describe("Ajouter un CD", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Ajoute un CD avec des informations valides", () => {
        cy.get('input[name="title"]').type("Thriller");
        cy.get('input[name="artist"]').type("Michael Jackson");
        cy.get('input[name="year"]').type("1982");
        cy.get('button[type="submit"]').click();

        cy.contains("Thriller - Michael Jackson (1982)").should("exist");
    });

    it("Empêche l'ajout d'un CD sans titre", () => {
        cy.get('input[name="artist"]').type("The Beatles");
        cy.get('input[name="year"]').type("1969");
        cy.get('button[type="submit"]').click();

        cy.contains("The Beatles").should("not.exist");
    });

    it("Empêche l'ajout d'un CD sans artiste", () => {
        cy.get('input[name="title"]').type("Abbey Road");
        cy.get('input[name="year"]').type("1969");
        cy.get('button[type="submit"]').click();

        cy.contains("Abbey Road").should("not.exist");
    });

    it("Empêche l'ajout d'un CD sans année", () => {
        cy.get('input[name="title"]').type("Abbey Road");
        cy.get('input[name="artist"]').type("The Beatles");
        cy.get('button[type="submit"]').click();

        cy.contains("Abbey Road").should("not.exist");
    });

    it("Empêche l'ajout d'un CD avec une année invalide", () => {
        cy.get('input[name="title"]').type("Abbey Road");
        cy.get('input[name="artist"]').type("The Beatles");
        cy.get('input[name="year"]').type("abcd");
        cy.get('button[type="submit"]').click();

        cy.contains("Abbey Road").should("not.exist");
    });

    it("Supprime le CD 'Thriller - Michael Jackson (1982)'", () => {
        cy.contains("Thriller - Michael Jackson (1982)").should("exist");

        cy.contains("Thriller - Michael Jackson (1982)")
            .parent("li")
            .contains("🗑 Supprimer")
            .click();

        cy.contains("Thriller - Michael Jackson (1982)").should("not.exist");
    });
});

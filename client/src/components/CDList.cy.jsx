import React from "react";
import { mount } from "cypress/react";
import CDList from "../../src/components/CDList";

describe("CDList Component", () => {
    beforeEach(() => {
        // On intercepte l'appel GET /api/cds et on renvoie des données factices
        cy.intercept("GET", "/api/cds", [
            {
                id: 1,
                title: "Led Zeppelin IV",
                artist: "Led Zeppelin",
                year: 1971,
            },
            {
                id: 2,
                title: "Master of Puppets",
                artist: "Metallica",
                year: 1986,
            },
        ]).as("mockGetCDs");
    });

    it("Affiche la liste des CD et gère le message vide", () => {
        // On monte le composant (Cypress Component Testing)
        mount(<CDList />);

        // Comme c'est un test de composant, l'appel /api/cds partira vers cy.intercept
        cy.wait("@mockGetCDs");

        // Vérifions que les CD mockés s'affichent
        cy.contains("Led Zeppelin IV - Led Zeppelin (1971)").should(
            "be.visible"
        );
        cy.contains("Master of Puppets - Metallica (1986)").should(
            "be.visible"
        );
    });

    it("Affiche 'Aucun CD disponible' quand la liste de CD est vide", () => {
        cy.intercept("GET", "/api/cds", []).as("mockGetCDsEmpty");

        mount(<CDList />);

        // On attend la fin de la requête
        cy.wait("@mockGetCDsEmpty");

        // Vérifie le message de liste vide
        cy.contains("Aucun CD disponible").should("be.visible");
    });
});

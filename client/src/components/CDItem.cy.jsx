// cypress/component/CDItem.cy.jsx
import React from "react";
import { mount } from "cypress/react";
import CDItem from "../../src/components/CDItem";

describe("CDItem Component", () => {
    it("Affiche le titre, l'artiste et l'année du CD", () => {
        const cd = {
            id: 1,
            title: "Dangerous",
            artist: "Michael Jackson",
            year: 1991,
        };
        const onDeleteStub = cy.stub().as("onDeleteStub");

        mount(<CDItem cd={cd} onDelete={onDeleteStub} />);

        cy.contains("Dangerous - Michael Jackson (1991)").should("be.visible");
    });

    it("Appelle onDelete avec l'ID du CD quand on clique sur le bouton Supprimer", () => {
        const cd = { id: 42, title: "Recovery", artist: "Eminem", year: 2010 };
        const onDeleteStub = cy.stub().as("onDeleteStub");

        mount(<CDItem cd={cd} onDelete={onDeleteStub} />);

        cy.get("button.delete-btn").click();

        cy.get("@onDeleteStub").should("have.been.calledOnceWith", 42);
    });
});

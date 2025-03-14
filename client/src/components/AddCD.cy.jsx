import React from "react";
import { mount } from "cypress/react"; // API "mount" de Cypress
import AddCD from "../../src/components/AddCD";

describe("AddCD Component", () => {
    it("Affiche le formulaire et empêche la soumission si un champ est vide", () => {
        const onAddSpy = cy.spy().as("onAddSpy");
        mount(<AddCD onAdd={onAddSpy} />);

        cy.get('input[name="title"]').should("be.visible");
        cy.get('input[name="artist"]').should("be.visible");
        cy.get('input[name="year"]').should("be.visible");

        cy.get('input[name="title"]').type("Test CD");
        cy.get('input[name="artist"]').type("Test Artist");
        cy.get("form").submit();

        cy.get("@onAddSpy").should("not.have.been.called");
    });

    it("Soumet le formulaire et appelle onAdd() quand tous les champs sont remplis", () => {
        const onAddSpy = cy.spy().as("onAddSpy");
        mount(<AddCD onAdd={onAddSpy} />);

        cy.get('input[name="title"]').type("Thriller");
        cy.get('input[name="artist"]').type("Michael Jackson");
        cy.get('input[name="year"]').type("1982");

        cy.get("form").submit();

        cy.get("@onAddSpy").should("have.been.calledOnce");

        cy.get('input[name="title"]').should("have.value", "");
        cy.get('input[name="artist"]').should("have.value", "");
        cy.get('input[name="year"]').should("have.value", "");
    });
});

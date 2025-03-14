const request = require("supertest");
const app = require("../server");
const pool = require("./setupTestDB");

describe("Tests d'intégration de l'API CDs", () => {
    test("Devrait récupérer une liste vide de CDs au départ", async () => {
        const res = await request(app).get("/api/cds");
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBe(0);
    });

    test("Devrait ajouter un CD et le récupérer", async () => {
        const newCD = {
            title: "Test Album",
            artist: "Test Artist",
            year: 2023,
        };

        const addRes = await request(app).post("/api/cds").send(newCD);
        expect(addRes.status).toBe(201);
        expect(addRes.body.title).toBe(newCD.title);
        expect(addRes.body.artist).toBe(newCD.artist);
        expect(addRes.body.year).toBe(newCD.year);

        const getRes = await request(app).get("/api/cds");
        expect(getRes.status).toBe(200);
        expect(getRes.body.length).toBe(1);
        expect(getRes.body[0]).toMatchObject(newCD);
    });

    test("Devrait supprimer un CD", async () => {
        const newCD = {
            title: "Test Album",
            artist: "Test Artist",
            year: 2023,
        };

        const addRes = await request(app).post("/api/cds").send(newCD);
        const cdId = addRes.body.id;

        const deleteRes = await request(app).delete(`/api/cds/${cdId}`);
        expect(deleteRes.status).toBe(204);

        const getRes = await request(app).get("/api/cds");
        expect(getRes.body.length).toBe(0);
    });
});

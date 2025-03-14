const cdController = require("../controllers/cdController");
const pool = require("../configs/db");
const { json } = require("express");

jest.mock("../configs/db", () => ({
    query: jest.fn(),
}));

describe("cdController Unit Tests", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getCD (fetch tous les CDs)", () => {
        it("doit récupérer tous les CDs avec succès", async () => {
            const mockCDs = [
                { id: 1, title: "Test CD 1", artist: "Artist 1", year: 2023 },
                { id: 2, title: "Test CD 2", artist: "Artist 2", year: 2022 },
            ];
            pool.query.mockResolvedValue({ rows: mockCDs });

            const req = {};
            const res = { json: jest.fn() };

            await cdController.getAllCDs(req, res);

            expect(pool.query).toHaveBeenCalledTimes(1);
            expect(pool.query).toHaveBeenCalledWith(
                "SELECT * FROM cds ORDER BY id ASC"
            );
            expect(res.json).toHaveBeenCalledWith(mockCDs);
        });
    });

    describe("addCD", () => {
        it("doit ajouter un CD avec succès", async () => {
            const mockRequest = {
                body: { title: "New CD", artist: "New Artist", year: 2024 },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                json: jest.fn(),
            };
            pool.query.mockResolvedValue({
                rows: [{ id: 3, ...mockRequest.body }],
            });

            await cdController.addCD(mockRequest, mockResponse);

            expect(pool.query).toHaveBeenCalledWith(
                "INSERT INTO cds (title, artist, year) VALUES ($1, $2, $3) RETURNING *",
                ["New CD", "New Artist", 2024]
            );
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({ title: "New CD" })
            );
        });

        it("doit gérer une erreur lors de l'ajout", async () => {
            const mockRequest = { body: { title: "", artist: "", year: 2024 } };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            pool.query.mockRejectedValue(new Error("Erreur d'ajout"));

            await cdController.addCD(mockRequest, mockResponse);

            expect(mockResponse.json).toHaveBeenCalledWith({
                error: "Erreur d'ajout",
            });
            expect(mockResponse.status).toHaveBeenCalledWith(500);
        });
    });

    describe("deleteCD", () => {
        it("doit supprimer un CD avec succès", async () => {
            const mockRequest = { params: { id: 1 } };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                send: jest.fn(),
            };

            pool.query.mockResolvedValue({ rowCount: 1 });

            await cdController.deleteCD(mockRequest, mockResponse);

            expect(pool.query).toHaveBeenCalledWith(
                "DELETE FROM cds WHERE id = $1",
                [1]
            );
            expect(mockResponse.status).toHaveBeenCalledWith(204);
            expect(mockResponse.send).toHaveBeenCalled();
        });

        it("doit gérer les erreurs lors de la suppression", async () => {
            const mockRequest = { params: { id: 999 } };
            const mockResponse = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            pool.query.mockRejectedValue(new Error("Erreur de suppression"));

            await cdController.deleteCD(mockRequest, mockResponse);

            expect(mockResponse.json).toHaveBeenCalledWith({
                error: "Erreur de suppression",
            });
            expect(mockResponse.status).toHaveBeenCalledWith(500);
        });
    });
});

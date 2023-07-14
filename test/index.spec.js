const app = require("../app");
const request = require("supertest");

const log4 = require("log4js");
const {model} = require("mongoose");
const logger =log4.getLogger("index.spec.js");

describe("Auth Controller", () => {
    describe("POST /auth/register", () => {
        it("Should register a new user", async () => {
            const response = await request(app).post("/auth/register").send({
            });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("msg", "Registro Exitoso");
        });
        it("Should return a error if required fields are missing", async () => {
            const response = await request(app).post("/api/ver1/auth/register").send({});
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty("msg", "Erro al registrar")
        })
    })
})


import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../app";

describe("Authentication", () => {

    it("should reject invalid login", async () => {

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "wrong@test.com",
                password: "wrong"
            });

        expect(res.status).toBe(401);

    });

});
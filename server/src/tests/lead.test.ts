import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../app";

describe("Lead API", () => {
  it("should create a public lead", async () => {
    const res = await request(app)
      .post("/api/leads/public")
      .send({
        name: "Test User",
        email: "test@example.com",
        phone: "9876543210",
        company: "Test Company",
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });
});
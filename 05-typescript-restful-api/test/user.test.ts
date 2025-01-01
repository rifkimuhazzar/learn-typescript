import bcrypt from "bcrypt";
import supertest from "supertest";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { app } from "../src/application/app";
import { logger } from "../src/application/logging";
import { UserTest } from "./test-util";

describe("POST /api/users", () => {
  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be able to register a new user", async () => {
    const response = await supertest(app).post("/api/users").send({
      name: "Test",
      username: "test",
      password: "test1234",
    });

    console.log("--------------------LOGGER.DEBUG--------------------");
    logger.debug(response.body);
    console.log("--------------------CONSOLE.LOG---------------------");
    console.log(response.body);
    console.log("------------------------END-------------------------");

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual({
      name: "Test",
      username: "test",
    });
  });

  it("should not be able to register a new user if the request is invalid", async () => {
    const response = await supertest(app)
      .post("/api/users")
      .send({ name: "", username: "", password: "" });

    console.log("--------------------LOGGER.DEBUG--------------------");
    logger.debug(response.body);
    console.log("--------------------CONSOLE.LOG---------------------");
    console.log(response.body);
    console.log("------------------------END-------------------------");

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should not be able to register a new user if username already exist", async () => {
    let response = await supertest(app).post("/api/users").send({
      name: "Test",
      username: "test",
      password: "test123",
    });
    response = await supertest(app).post("/api/users").send({
      name: "Test",
      username: "test",
      password: "test123",
    });

    console.log("--------------------LOGGER.DEBUG--------------------");
    logger.debug(response.body);
    console.log("--------------------CONSOLE.LOG---------------------");
    console.log(response.body);
    console.log("------------------------END-------------------------");

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be able to login", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      username: "test",
      password: "test123",
    });

    console.log("--------------------LOGGER.DEBUG--------------------");
    logger.debug(response.body);
    console.log("--------------------CONSOLE.LOG---------------------");
    console.log(response.body);
    console.log("------------------------END-------------------------");

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Test");
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.token).toBeDefined();
  });

  it("should not be able to login if username or password is wrong", async () => {
    // wrong username
    let response = await supertest(app).post("/api/users/login").send({
      username: "usernameIsWrong",
      password: "test1233",
    });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ errors: "Username or password is wrong" });

    // wrong password
    response = await supertest(app).post("/api/users/login").send({
      username: "test",
      password: "passwordIsWrong",
    });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ errors: "Username or password is wrong" });
  });
});

describe("GET /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be able to get user", async () => {
    const user = await UserTest.getUser();
    const response = await supertest(app)
      .get("/api/users/current")
      .set("X-API-TOKEN", user!.token!);

    console.log("--------------------LOGGER.DEBUG--------------------");
    logger.debug(response.body);
    console.log("--------------------CONSOLE.LOG---------------------");
    console.log(response.body);
    console.log("------------------------END-------------------------");

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual({ name: "Test", username: "test" });
  });

  it("should not be able to get user", async () => {
    const response = await supertest(app)
      .get("/api/users/current")
      .set("X-API-TOKEN", "wrongToken");

    console.log("--------------------LOGGER.DEBUG--------------------");
    logger.debug(response.body);
    console.log("--------------------CONSOLE.LOG---------------------");
    console.log(response.body);
    console.log("------------------------END-------------------------");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ errors: "Unauthorized" });
  });
});

describe("PATCH /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be able to update name only", async () => {
    const user = await UserTest.getUser();
    const response = await supertest(app)
      .patch("/api/users/current")
      .set("X-API-TOKEN", user!.token!)
      .send({
        name: "New Test",
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: { name: "New Test", username: "test" },
    });
  });

  it("should be able to update password only", async () => {
    let user = await UserTest.getUser();
    const response = await supertest(app)
      .patch("/api/users/current")
      .set("X-API-TOKEN", user!.token!)
      .send({
        password: "newPassword",
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: { name: "Test", username: "test" },
    });

    user = await UserTest.getUser();
    expect(await bcrypt.compare("newPassword", user!.password)).toBe(true);
  });

  it("should be able to update name and password", async () => {
    let user = await UserTest.getUser();
    const response = await supertest(app)
      .patch("/api/users/current")
      .set("X-API-TOKEN", user!.token!)
      .send({
        name: "New Name",
        password: "newPassword",
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: { name: "New Name", username: "test" },
    });

    user = await UserTest.getUser();
    expect(await bcrypt.compare("newPassword", user!.password)).toBe(true);
  });

  it("should not be able to update name if it is empty", async () => {
    const user = await UserTest.getUser();
    const response = await supertest(app)
      .patch("/api/users/current")
      .set("X-API-TOKEN", user!.token!)
      .send({
        name: "",
      });
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      errors: expect.stringMatching("Validation Error:"),
    });
  });

  it("should not be able to update password if it is empty", async () => {
    const user = await UserTest.getUser();
    const response = await supertest(app)
      .patch("/api/users/current")
      .set("X-API-TOKEN", user!.token!)
      .send({
        password: "",
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: expect.stringContaining("Validation Error:"),
    });
  });

  it("should not be able to update if token is wrong", async () => {
    const response = await supertest(app)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "wrongToken")
      .send({
        password: "",
      });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ errors: "Unauthorized" });
  });
});

describe("DELETE /api/users/current", async () => {
  beforeEach(async () => void (await UserTest.create()));
  afterEach(async () => void (await UserTest.delete()));

  it("should be able to log out and delete token", async () => {
    let user = await UserTest.getUser();
    const response = await supertest(app)
      .delete("/api/users/current")
      .set("x-api-token", user!.token!);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: "OK" });

    user = await UserTest.getUser();
    expect(user!.token!).toBe(null);
  });

  it("should not be able to log out and delete token if token is wrong", async () => {
    const response = await supertest(app)
      .delete("/api/users/current")
      .set("x-api-token", "wrongToken");
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ errors: "Unauthorized" });
  });
});

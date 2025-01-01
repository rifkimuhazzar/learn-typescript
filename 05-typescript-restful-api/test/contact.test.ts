import supertest from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { app } from "../src/application/app";
import { ContactTest, UserTest } from "./test-util";
import { Contact, User } from "@prisma/client";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to create new contact with full fields", async () => {
    const user = await UserTest.getUser();
    const response = await supertest(app)
      .post("/api/contacts")
      .set("x-api-token", user!.token!)
      .send({
        first_name: "Hello",
        last_name: "World",
        email: "helloworld@example.com",
        phone: "010101010101",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        id: response.body.data.id, // id is auto increment
        first_name: "Hello",
        last_name: "World",
        email: "helloworld@example.com",
        phone: "010101010101",
      },
    });
  });

  it("should be able to create contact with first_name field only", async () => {
    const user = await UserTest.getUser();
    const response = await supertest(app)
      .post("/api/contacts")
      .set("x-api-token", user!.token!)
      .send({
        first_name: "Hello",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        id: response.body.data.id, // id is auto increment
        first_name: "Hello",
        last_name: null,
        email: null,
        phone: null,
      },
    });
  });

  it("should not be able to create contact if request is invalid", async () => {
    const user = await UserTest.getUser();
    const response = await supertest(app)
      .post("/api/contacts")
      .set("x-api-token", user!.token!)
      .send({
        last_name: "",
        email: "",
        phone: "",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: expect.stringContaining("Validation Error:"),
    });
  });

  it("should not be able to create contact if token is wrong", async () => {
    const response = await supertest(app)
      .post("/api/contacts")
      .set("x-api-token", "wrongToken")
      .send({
        firs_name: "Hello",
        last_name: "World",
        email: "helloworld@example.com",
        phone: "010101010101",
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ errors: "Unauthorized" });
  });
});

describe("GET /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to get contact with contactId", async () => {
    const user = await UserTest.getUser();
    const contact = await ContactTest.get();
    const response = await supertest(app)
      .get(`/api/contacts/${contact.id}`)
      .set("x-api-token", user?.token!);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        id: contact.id,
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone,
      },
    });
  });

  it("should not be able to get contact if contactId is wrong number", async () => {
    const user = await UserTest.getUser();
    const contact = await ContactTest.get();
    const response = await supertest(app)
      .get(`/api/contacts/${contact.id + 1}`)
      .set("x-api-token", user?.token!);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      errors: "Contact is not found",
    });
  });

  it("should not be able to get contact if contactId is not a number", async () => {
    const user = await UserTest.getUser();
    const response = await supertest(app)
      .get(`/api/contacts/wrongToken`)
      .set("x-api-token", user?.token!);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });

  it("should not be able to get contact if token is wrong", async () => {
    const response = await supertest(app)
      .get("/api/contacts/20")
      .set("x-api-token", "wrongToken");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      errors: "Unauthorized",
    });
  });
});

describe("PATCH /api/contacts/:contactId", () => {
  let user: User;
  let contact: Contact;

  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();

    user = await UserTest.getUser();
    contact = await ContactTest.get();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to update contact with full fields", async () => {
    const response = await supertest(app)
      .patch(`/api/contacts/${contact.id}`)
      .set("x-api-token", user?.token!)
      .send({
        first_name: "New Hello",
        last_name: "New World",
        email: "newhelloworld@example.com",
        phone: "02020202",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        id: contact.id,
        first_name: "New Hello",
        last_name: "New World",
        email: "newhelloworld@example.com",
        phone: "02020202",
      },
    });
  });

  it("should be able to update contact with first_name field only", async () => {
    const response = await supertest(app)
      .patch(`/api/contacts/${contact.id}`)
      .set("x-api-token", user?.token!)
      .send({
        first_name: "New Hello",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        id: contact.id,
        first_name: "New Hello",
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone,
      },
    });
  });

  it("should not be able to update contact if request is invalid", async () => {
    const response = await supertest(app)
      .patch(`/api/contacts/${contact.id}`)
      .set("x-api-token", user?.token!)
      .send({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: expect.stringContaining("Validation Error:"),
    });
  });

  it("should not be able to update contact if param contactId is wrong number", async () => {
    const response = await supertest(app)
      .patch(`/api/contacts/${contact.id + 1}`)
      .set("x-api-token", user?.token!)
      .send({
        first_name: "New Hello",
        last_name: "New World",
        email: "newhelloworld@example.com",
        phone: "02020202",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ errors: "Contact is not found" });
  });

  it("should not be able to update contact if param contactId is not a number", async () => {
    const response = await supertest(app)
      .patch(`/api/contacts/wrongContactId`)
      .set("x-api-token", user?.token!)
      .send({
        first_name: "New Hello",
        last_name: "New World",
        email: "newhelloworld@example.com",
        phone: "02020202",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });

  it("should not be able to update contact if token is wrong", async () => {
    const response = await supertest(app)
      .patch(`/api/contacts/${contact.id}`)
      .set("x-api-token", "wrongToken")
      .send({
        first_name: "New Hello",
        last_name: "New World",
        email: "newhelloworld@example.com",
        phone: "02020202",
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ errors: "Unauthorized" });
  });
});

describe("DELETE /api/contacts/:contactId", () => {
  let user: User;
  let contact: Contact;

  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();

    user = await UserTest.getUser();
    contact = await ContactTest.get();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to delete a contact", async () => {
    const response = await supertest(app)
      .delete(`/api/contacts/${contact.id}`)
      .set("x-api-token", user.token!);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: "OK" });
  });

  it("should not be able to delete a contact if contactId param is wrong", async () => {
    const response = await supertest(app)
      .delete(`/api/contacts/${contact.id + 1}`)
      .set("x-api-token", user.token!);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      errors: "Contact is not found",
    });
  });

  it("should not be able to delete a contact if token is wrong", async () => {
    const response = await supertest(app)
      .delete(`/api/contacts/${contact.id}`)
      .set("x-api-token", "wrongToken");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      errors: "Unauthorized",
    });
  });
});

describe("GET /api/contacts", () => {
  let user: User;

  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.createMany();

    user = await UserTest.getUser();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to search contact without query param", async () => {
    const response = await supertest(app)
      .get("/api/contacts")
      .set("x-api-token", user.token!);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: [
        {
          id: response.body.data[0].id,
          first_name: "Hello",
          last_name: "World",
          email: "helloworld@example.com",
          phone: "01010101",
        },
        {
          id: response.body.data[1].id,
          first_name: "Hello",
          last_name: "Express",
          email: "helloexpress@example.com",
          phone: "02020202",
        },
        {
          id: response.body.data[2].id,
          first_name: "Hello",
          last_name: "Nest",
          email: "hellonest@example.com",
          phone: "03030303",
        },
      ],
      paging: { size: 10, current_page: 1, total_page: 1 },
    });
  });

  it("should be able to search contact with query param name", async () => {
    const response = await supertest(app)
      .get("/api/contacts?name=pREss")
      .set("x-api-token", user.token!);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: [
        {
          id: response.body.data[0].id,
          first_name: "Hello",
          last_name: "Express",
          email: "helloexpress@example.com",
          phone: "02020202",
        },
      ],
      paging: { size: 10, current_page: 1, total_page: 1 },
    });
  });

  it("should be able to search contact with query param email", async () => {
    const response = await supertest(app)
      .get("/api/contacts?email=pREss")
      .set("x-api-token", user.token!);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: [
        {
          id: response.body.data[0].id,
          first_name: "Hello",
          last_name: "Express",
          email: "helloexpress@example.com",
          phone: "02020202",
        },
      ],
      paging: { size: 10, current_page: 1, total_page: 1 },
    });
  });

  it("should be able to search contact with query param phone", async () => {
    const response = await supertest(app)
      .get("/api/contacts?phone=0202")
      .set("x-api-token", user.token!);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: [
        {
          id: response.body.data[0].id,
          first_name: "Hello",
          last_name: "Express",
          email: "helloexpress@example.com",
          phone: "02020202",
        },
      ],
      paging: { size: 10, current_page: 1, total_page: 1 },
    });
  });

  it("should be able to search contact with all query param", async () => {
    const response = await supertest(app)
      .get("/api/contacts?phone=02&name=Pres&email=@example.com&size=20&page=1")
      .set("x-api-token", user.token!);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: [
        {
          id: response.body.data[0].id,
          first_name: "Hello",
          last_name: "Express",
          email: "helloexpress@example.com",
          phone: "02020202",
        },
      ],
      paging: { size: 20, current_page: 1, total_page: 1 },
    });
  });
});

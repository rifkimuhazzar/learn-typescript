import supertest from "supertest";
import { Address, Contact, User } from "@prisma/client";
import { afterEach, beforeEach, expect, describe, it } from "vitest";
import { app } from "../src/application/app";
import { AddressTest, ContactTest, UserTest } from "./test-util";

describe("POST /api/contacts/:contactId/addresses", () => {
  let user: User;
  let contact: Contact;

  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();

    user = await UserTest.getUser();
    contact = await ContactTest.get();
  });

  afterEach(async () => {
    await AddressTest.deleteAll(contact.id);
    await ContactTest.deleteAll(user.username);
    await UserTest.delete();
  });

  it("should be able to create a new address with full fields", async () => {
    const response = await supertest(app)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("x-api-token", user.token!)
      .send({
        street: "Street Test",
        city: "City Test",
        province: "Province Test",
        country: "Country Test",
        postal_code: "01010101",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        id: response.body.data.id,
        street: "Street Test",
        city: "City Test",
        province: "Province Test",
        country: "Country Test",
        postal_code: "01010101",
      },
    });
  });

  it("should be able to create a new address with country and postal_code fields only", async () => {
    const response = await supertest(app)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("x-api-token", user.token!)
      .send({
        country: "Country Test",
        postal_code: "01010101",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        id: response.body.data.id,
        street: null,
        city: null,
        province: null,
        country: "Country Test",
        postal_code: "01010101",
      },
    });
  });

  it("should not be able to create a new address if the request is invalid", async () => {
    const response = await supertest(app)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("x-api-token", user.token!)
      .send({
        street: "",
        city: "",
        province: "",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: expect.stringContaining("Validation Error:"),
    });
  });

  it("should not be able to create a new address if contact doesn't exist", async () => {
    const response = await supertest(app)
      .post(`/api/contacts/${contact.id + 1}/addresses`)
      .set("x-api-token", user.token!)
      .send({
        street: "Street Test",
        city: "City Test",
        province: "Province Test",
        country: "Country Test",
        postal_code: "01010101",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ errors: "Contact is not found" });
  });
});

describe("GET /api/contact/:contactId/addresses/:addressId", () => {
  let user: User;
  let contact: Contact;
  let address: Address;

  beforeEach(async () => {
    await UserTest.create();
    user = await UserTest.getUser();
    await ContactTest.create();
    contact = await ContactTest.get();
    await AddressTest.create(contact.id);
    address = await AddressTest.get(contact.id);
  });

  afterEach(async () => {
    await AddressTest.deleteAll(contact.id);
    await ContactTest.deleteAll(user.username);
    await UserTest.delete();
  });

  it("should be able to get address", async () => {
    const response = await supertest(app)
      .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", user.token!);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        id: expect.any(Number),
        street: "Street Test",
        city: "City Test",
        province: "Province Test",
        country: "Country Test",
        postal_code: "01010101",
      },
    });
  });

  it("should not be able to get address if token is wrong", async () => {
    const response = await supertest(app)
      .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "wrongToken");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ errors: "Unauthorized" });
  });

  it("should not be able to get address if contact doesn't exist", async () => {
    const response = await supertest(app)
      .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
      .set("X-API-TOKEN", user.token!);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ errors: "Contact is not found" });
  });

  it("should not be able to get address if address doesn't exist", async () => {
    const response = await supertest(app)
      .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set("X-API-TOKEN", user.token!);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ errors: "Address is not found" });
  });
});

describe("PATCH /api/contacts/:contactId/addresses/:addressId", () => {
  let user: User;
  let contact: Contact;
  let address: Address;

  beforeEach(async () => {
    await UserTest.create();
    user = await UserTest.getUser();
    await ContactTest.create();
    contact = await ContactTest.get();
    await AddressTest.create(contact.id);
    address = await AddressTest.get(contact.id);
  });

  afterEach(async () => {
    await AddressTest.deleteAll(contact.id);
    await ContactTest.deleteAll(user.username);
    await UserTest.delete();
  });

  it("should be able to update a address with full fields", async () => {
    const result = await supertest(app)
      .patch(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", user.token!)
      .send({
        street: "New Street",
        city: "New City",
        province: "New Province",
        country: "New Country",
        postal_code: "New Postal Code",
      });

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      data: {
        id: expect.any(Number),
        street: "New Street",
        city: "New City",
        province: "New Province",
        country: "New Country",
        postal_code: "New Postal Code",
      },
    });
  });

  it("should be able to update a address with 'country' and 'postal_code' fields only", async () => {
    const result = await supertest(app)
      .patch(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", user.token!)
      .send({
        country: "New Country",
        postal_code: "New Postal Code",
      });

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      data: {
        id: expect.any(Number),
        street: "Street Test",
        city: "City Test",
        province: "Province Test",
        country: "New Country",
        postal_code: "New Postal Code",
      },
    });
  });

  it("should not be able to update a address if token is wrong", async () => {
    const result = await supertest(app)
      .patch(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "wrongToken")
      .send({
        street: "New Street",
        city: "New City",
        province: "New Province",
        country: "New Country",
        postal_code: "New Postal Code",
      });

    expect(result.status).toBe(401);
    expect(result.body).toEqual({ errors: "Unauthorized" });
  });

  it("should not be able to update a address if request is invalid", async () => {
    const result = await supertest(app)
      .patch(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", user.token!)
      .send({
        street: "",
        city: "",
        province: "",
      });

    expect(result.status).toBe(400);
    expect(result.body).toEqual({
      errors: expect.stringContaining("Validation Error:"),
    });
  });

  it("should not be able to update a address if contact id is wrong", async () => {
    const result = await supertest(app)
      .patch(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
      .set("X-API-TOKEN", user.token!)
      .send({
        street: "New Street",
        city: "New City",
        province: "New Province",
        country: "New Country",
        postal_code: "New Postal Code",
      });

    expect(result.status).toBe(404);
    expect(result.body).toEqual({ errors: "Contact is not found" });
  });

  it("should not be able to update a address if address id is wrong", async () => {
    const result = await supertest(app)
      .patch(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set("X-API-TOKEN", user.token!)
      .send({
        street: "New Street",
        city: "New City",
        province: "New Province",
        country: "New Country",
        postal_code: "New Postal Code",
      });

    expect(result.status).toBe(404);
    expect(result.body).toEqual({ errors: "Address is not found" });
  });
});

describe("DELETE /api/contacts/:contactId/addresses/:addressId", () => {
  let user: User;
  let contact: Contact;
  let address: Address;

  beforeEach(async () => {
    await UserTest.create();
    user = await UserTest.getUser();
    await ContactTest.create();
    contact = await ContactTest.get();
    await AddressTest.create(contact.id);
    address = await AddressTest.get(contact.id);
  });

  afterEach(async () => {
    await AddressTest.deleteAll(contact.id);
    await ContactTest.deleteAll(user.username);
    await UserTest.delete();
  });

  it("should be able to delete address", async () => {
    const result = await supertest(app)
      .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("x-api-token", user.token!);

    expect(result.status).toBe(200);
    expect(result.body).toEqual({ data: "OK" });
  });

  it("should not be able to delete address if token is wrong", async () => {
    const result = await supertest(app)
      .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("x-api-token", "wrongToken");

    expect(result.status).toBe(401);
    expect(result.body).toEqual({ errors: "Unauthorized" });
  });

  it("should not be able to delete address if contact id is wrong", async () => {
    const result = await supertest(app)
      .delete(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
      .set("x-api-token", user.token!);

    expect(result.status).toBe(404);
    expect(result.body).toEqual({ errors: "Contact is not found" });
  });

  it("should not be able to delete address if address id is wrong", async () => {
    const result = await supertest(app)
      .delete(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set("x-api-token", user.token!);

    expect(result.status).toBe(404);
    expect(result.body).toEqual({ errors: "Address is not found" });
  });
});

describe("GET /api/contacts/:contactId/addresses", () => {
  let user: User;
  let contact: Contact;
  let address: Address;

  beforeEach(async () => {
    await UserTest.create();
    user = await UserTest.getUser();
    await ContactTest.create();
    contact = await ContactTest.get();
    await AddressTest.createMany(contact.id);
    address = await AddressTest.get(contact.id);
  });

  afterEach(async () => {
    await AddressTest.deleteAll(contact.id);
    await ContactTest.deleteAll(user.username);
    await UserTest.delete();
  });

  it("should be able to get all addresses from a contact if the address exist", async () => {
    const result = await supertest(app)
      .get(`/api/contacts/${contact.id}/addresses`)
      .set("x-api-token", user.token!);

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      data: [
        {
          id: expect.any(Number),
          street: "Street Test",
          city: "City Test",
          province: "Province Test",
          country: "Country Test",
          postal_code: "01010101",
        },
        {
          id: expect.any(Number),
          street: "Street Test 2",
          city: "City Test 2",
          province: "Province Test 2",
          country: "Country Test 2",
          postal_code: "01010101 2",
        },
        {
          id: expect.any(Number),
          street: "Street Test 2",
          city: "City Test 2",
          province: "Province Test 2",
          country: "Country Test 2",
          postal_code: "01010101 2",
        },
      ],
    });
  });

  it("should be able to get response 'There is no addreses yet' if address doesn't exist yet in a contact", async () => {
    const resultMakeAContact = await supertest(app)
      .post(`/api/contacts`)
      .set("x-api-token", user.token!)
      .send({
        first_name: "Test 2",
      });

    const resultGetAllAddresses = await supertest(app)
      .get(`/api/contacts/${resultMakeAContact.body.data.id}/addresses`)
      .set("x-api-token", user.token!);

    expect(resultGetAllAddresses.status).toBe(200);
    expect(resultGetAllAddresses.body).toEqual({
      data: "There is no address yet",
    });
  });

  it("should not be able to get all addresses from a contact if token is wrong", async () => {
    const result = await supertest(app)
      .get(`/api/contacts/${contact.id}/addresses`)
      .set("x-api-token", "wrongToken");

    expect(result.status).toBe(401);
    expect(result.body).toEqual({ errors: "Unauthorized" });
  });

  it("should not be able to get all addresses from a contact if contact id doesn't exist", async () => {
    const result = await supertest(app)
      .get(`/api/contacts/${contact.id}/addresses`)
      .set("x-api-token", "wrongToken");

    expect(result.status).toBe(401);
    expect(result.body).toEqual({ errors: "Unauthorized" });
  });
});

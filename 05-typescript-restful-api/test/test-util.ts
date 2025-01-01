import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { prismaClient } from "../src/application/database";
import { Address, Contact } from "@prisma/client";

export class UserTest {
  static async delete() {
    await prismaClient.user.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async create() {
    await prismaClient.user.create({
      data: {
        name: "Test",
        username: "test",
        password: await bcrypt.hash("test123", 10),
        token: uuidV4(),
      },
    });
  }

  static async getUser() {
    const user = await prismaClient.user.findUnique({
      where: {
        username: "test",
      },
    });

    if (!user) {
      throw new Error("User is not found");
    }

    return user;
  }
}

export class ContactTest {
  static async deleteAll(user_username: string) {
    await prismaClient.contact.deleteMany({
      where: {
        user_username: user_username,
      },
    });
  }

  static async create() {
    return await prismaClient.contact.create({
      data: {
        first_name: "Hello",
        last_name: "World",
        email: "helloworld@example.com",
        phone: "01010101",
        user_username: "test",
      },
    });
  }

  static async createMany() {
    return await prismaClient.contact.createMany({
      data: [
        {
          first_name: "Hello",
          last_name: "World",
          email: "helloworld@example.com",
          phone: "01010101",
          user_username: "test",
        },
        {
          first_name: "Hello",
          last_name: "Express",
          email: "helloexpress@example.com",
          phone: "02020202",
          user_username: "test",
        },
        {
          first_name: "Hello",
          last_name: "Nest",
          email: "hellonest@example.com",
          phone: "03030303",
          user_username: "test",
        },
      ],
    });
  }

  static async get(): Promise<Contact> {
    const contact = await prismaClient.contact.findFirst({
      where: {
        first_name: "Hello",
        last_name: "World",
        email: "helloworld@example.com",
        phone: "01010101",
        user_username: "test",
      },
    });

    if (!contact) {
      throw new Error("Contact is not found");
    }

    return contact;
  }
}

export class AddressTest {
  static async deleteAll(contact_id: number) {
    await prismaClient.address.deleteMany({
      where: {
        contact_id: contact_id,
      },
    });
  }

  static async create(contactId: number) {
    await prismaClient.address.create({
      data: {
        street: "Street Test",
        city: "City Test",
        province: "Province Test",
        country: "Country Test",
        postal_code: "01010101",
        contact_id: contactId,
      },
    });
  }

  static async createMany(contactId: number) {
    await prismaClient.address.createMany({
      data: [
        {
          street: "Street Test",
          city: "City Test",
          province: "Province Test",
          country: "Country Test",
          postal_code: "01010101",
          contact_id: contactId,
        },
        {
          street: "Street Test 2",
          city: "City Test 2",
          province: "Province Test 2",
          country: "Country Test 2",
          postal_code: "01010101 2",
          contact_id: contactId,
        },
        {
          street: "Street Test 2",
          city: "City Test 2",
          province: "Province Test 2",
          country: "Country Test 2",
          postal_code: "01010101 2",
          contact_id: contactId,
        },
      ],
    });
  }

  static async get(contactId: number): Promise<Address> {
    const address = await prismaClient.address.findFirst({
      where: {
        street: "Street Test",
        city: "City Test",
        province: "Province Test",
        country: "Country Test",
        postal_code: "01010101",
        contact_id: contactId,
      },
    });

    if (!address) {
      throw new Error("Address is not found");
    }

    return address;
  }
}

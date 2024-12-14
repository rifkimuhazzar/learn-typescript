import { Customer, CustomerType } from "../src/09-enum-type";

describe("Enum", () => {
  test("enum", () => {
    let customer: Customer = {
      id: 1,
      name: "Hello World",
      type: CustomerType.GOLD,
    };
    console.log(customer);

    customer = {
      id: 1,
      name: "Hello World",
      type: CustomerType.diamond,
    };
    console.log(customer);

    customer = {
      id: 1,
      name: "Hello World",
      type: CustomerType.gd,
    };
    console.log(customer);
  });
});

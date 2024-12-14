import { Category, ID, Product } from "../src/07-type-alias";

describe("Type Alias", () => {
  test("type alias", () => {
    const category: Category = {
      id: 1,
      name: "Smartphone",
    };

    const product: Product = {
      id: "1",
      name: "Iphone 16 Pro Max",
      price: 23500000,
      category: category,
    };

    const value: ID = 100;

    console.log(category);
    console.log(product);
    console.log(value);
  });
});

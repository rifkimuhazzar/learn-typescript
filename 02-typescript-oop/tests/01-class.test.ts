describe("Class", () => {
  class Customer {
    constructor() {
      console.log("Create a new customer");
    }
  }
  class Order {}

  it("should be able to create class", () => {
    const customer: Customer = new Customer();
    const order = new Order();
    console.log(customer);
    console.log(order);
  });

  it("should be able to create class with constructor", () => {
    new Customer();
    new Customer();
  });
});

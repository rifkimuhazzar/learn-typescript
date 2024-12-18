describe("Properties", () => {
  class Customer {
    readonly id: number;
    name: string;
    age?: number;

    constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
    }

    sayHello(name: string): void {
      console.log(`Hello ${name}, my name is ${this.name}`);
    }
  }

  it("should be able to have properties", () => {
    const customer = new Customer(1, "Express");
    customer.age = 25;
    console.log(customer);
    console.log(customer.id);
    console.log(customer.name);
    console.log(customer.age);
  });

  it("should be able to have method", () => {
    const customer = new Customer(1, "React");
    customer.sayHello("Express");
  });
});

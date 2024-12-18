describe("Abstract Class", () => {
  abstract class Customer {
    readonly id: number;
    abstract name: string;

    constructor(id: number) {
      this.id = id;
    }

    hello(): void {
      console.log("Hello");
    }

    abstract sayHello(name: string): void;
  }

  class RegularCustomer extends Customer {
    name: string;
    constructor(id: number, name: string) {
      super(id);
      this.name = name;
    }

    sayHello(name: string): void {
      console.log(`Hello ${name}, my name is ${this.name}`);
    }
  }

  it("should be able to do abstract class", () => {
    const customer1 = new RegularCustomer(1, "Express");
    console.log(customer1);
    customer1.hello();
    customer1.sayHello("Nest");
  });
});

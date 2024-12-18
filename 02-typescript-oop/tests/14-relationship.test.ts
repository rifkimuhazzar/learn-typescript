describe("Relationship", () => {
  class Person {
    constructor(public name: string) {}
  }
  class Customer {
    constructor(public name: string) {}
  }

  it("should be able to instantiate from different class", () => {
    const person: Person = new Customer("Express");
    console.log(person);
    console.log(person.name);
  });
});

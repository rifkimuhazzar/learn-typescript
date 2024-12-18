describe("Parameter Properties", () => {
  class Person {
    constructor(public name: string) {}
  }
  it("should be able to have parameter properties", () => {
    const person = new Person("Express");
    console.log(person);
    console.log(person.name);
    person.name = "Nest";
    console.log(person);
    console.log(person.name);
  });
});

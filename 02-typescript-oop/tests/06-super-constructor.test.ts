describe("Super Constructor", () => {
  class Person {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
  class Employee extends Person {
    departement: string;
    constructor(name: string, departement: string) {
      super(name);
      this.departement = departement;
    }
  }

  it("should be able to use super", () => {
    const employee = new Employee("React", "Frontend");
    console.log(employee);
    console.log(employee.name);
    console.log(employee.departement);
  });
});

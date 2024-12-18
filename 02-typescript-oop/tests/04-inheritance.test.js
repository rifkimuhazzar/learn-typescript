"use strict";
describe("Inheritance", () => {
    class Employee {
        constructor(name) {
            this.name = name;
        }
    }
    class Manager extends Employee {
    }
    class Director extends Manager {
    }
    it("should be able to do inheritance", () => {
        const employee = new Employee("React");
        console.log(employee);
        console.log(employee.name);
        const manager = new Manager("Next");
        console.log(manager);
        console.log(manager.name);
        const director = new Director("Nest");
        console.log(director);
        console.log(director.name);
    });
});

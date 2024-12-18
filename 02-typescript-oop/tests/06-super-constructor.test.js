"use strict";
describe("Super Constructor", () => {
    class Person {
        constructor(name) {
            this.name = name;
        }
    }
    class Employee extends Person {
        constructor(name, departement) {
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

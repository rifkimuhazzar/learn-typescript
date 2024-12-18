"use strict";
describe("Instanceof", () => {
    class Employee {
    }
    class Manager {
    }
    const employee = new Employee();
    const manager = new Manager();
    it("problem with typeof", () => {
        console.log(typeof employee);
        console.log(typeof manager);
    });
    it("instanceof", () => {
        console.log(employee instanceof Employee);
        console.log(employee instanceof Manager);
        console.log(manager instanceof Manager);
        console.log(manager instanceof Employee);
    });
});

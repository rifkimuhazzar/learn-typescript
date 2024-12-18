"use strict";
describe("Method Overriding", () => {
    class Employee {
        constructor(name) {
            this.name = name;
        }
        sayHello(name) {
            console.log(`Hello ${name}, my name is ${this.name}`);
        }
    }
    class Manager extends Employee {
        sayHello(name) {
            // console.log(`Hello ${name}, my name is ${this.name}, i am your manager`);
            super.sayHello(name);
            console.log("And i am your manager");
        }
    }
    it("should be able to do method overriding", () => {
        const employee = new Employee("Next");
        console.log(employee);
        employee.sayHello("React");
        const manager = new Manager("Next");
        console.log(manager);
        manager.sayHello("React");
    });
});

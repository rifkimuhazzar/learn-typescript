"use strict";
describe("Properties", () => {
    class Customer {
        constructor(id, name) {
            this.id = id;
            this.name = name;
        }
        sayHello(name) {
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

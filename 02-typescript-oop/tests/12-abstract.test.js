"use strict";
describe("Abstract Class", () => {
    class Customer {
        constructor(id) {
            this.id = id;
        }
        hello() {
            console.log("Hello");
        }
    }
    class RegularCustomer extends Customer {
        constructor(id, name) {
            super(id);
            this.name = name;
        }
        sayHello(name) {
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

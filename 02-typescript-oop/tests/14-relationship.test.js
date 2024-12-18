"use strict";
describe("Relationship", () => {
    class Person {
        constructor(name) {
            this.name = name;
        }
    }
    class Customer {
        constructor(name) {
            this.name = name;
        }
    }
    it("should be able to instantiate from different class", () => {
        const person = new Customer("Express");
        console.log(person);
        console.log(person.name);
    });
});

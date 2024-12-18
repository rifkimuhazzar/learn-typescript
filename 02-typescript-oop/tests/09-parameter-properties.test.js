"use strict";
describe("Parameter Properties", () => {
    class Person {
        constructor(name) {
            this.name = name;
        }
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

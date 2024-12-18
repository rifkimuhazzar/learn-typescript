"use strict";
describe("Implements Interface", () => {
    class Person {
        constructor(name, age, country) {
            this.name = name;
            this.age = age;
            this.country = country;
        }
        sayHello(name) {
            console.log(`Hello ${name}, my name is ${this.name}, my age is ${this.age} and my address is ${this.country}`);
        }
    }
    it("should be able to implements interface", () => {
        const person = new Person("Next", 25, "Singapore");
        console.log(person);
        person.sayHello("React");
    });
});
describe("My Test: Interface and Type", () => {
    it("should be able to combine/extends interface and type", () => {
        const a = { name: "Express", age: 25, city: "Singapore" };
        console.log(a);
        const b = { name: "Express", age: 25 };
        console.log(b);
        const c = { name: "Express", age: 25, city: "Singapore" };
        console.log(c);
        // const d: D = [{ name: "Express", age: 25, city: "Singapore" }];
        // console.log(d);
    });
});

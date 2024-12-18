"use strict";
describe("Polymophism", () => {
    class Person {
        constructor(name) {
            this.name = name;
        }
    }
    class Employee {
        constructor(name) {
            this.name = name;
        }
    }
    class Manager extends Employee {
    }
    class VicePresident extends Manager {
    }
    function sayHello(object) {
        console.log(`Hello ${object.name}`);
    }
    function sayHello2(employee) {
        if (employee instanceof VicePresident) {
            const vp = employee;
            console.log(`Hello VP ${vp.name}`);
        }
        else if (employee instanceof Manager) {
            const manager = employee;
            console.log(`Hello Manager ${manager.name}`);
        }
        else {
            console.log(`Hello Employee ${employee.name}`);
        }
    }
    function sayHello2Wrong(employee) {
        if (employee instanceof Manager) {
            const manager = employee;
            console.log(`Hello Manager ${manager.name}`);
        }
        else if (employee instanceof VicePresident) {
            const vp = employee;
            console.log(`Hello VP ${vp.name}`);
        }
        else {
            console.log(`Hello Employee ${employee.name}`);
        }
    }
    it("should be able to do polymorphism in object", () => {
        let employee = new Employee("Next");
        console.log(employee);
        employee = new Manager("Next");
        console.log(employee);
        employee = new VicePresident("Next");
        console.log(employee);
        employee = new Person("Next");
        console.log(employee);
        let manager = new Manager("Next");
        console.log(manager);
        manager = new Employee("Next");
        console.log(manager);
        manager = new VicePresident("Next");
        console.log(manager);
        manager = new Person("Next");
        console.log(manager);
    });
    it("should be able to do polymorphism in function/method", () => {
        sayHello(new Employee("React"));
        sayHello(new Manager("Next"));
        sayHello(new VicePresident("Express"));
        sayHello(new Person("Nest - Person"));
    });
    it("should be able to do polymorphism in function/method 2", () => {
        sayHello2(new Employee("React"));
        sayHello2(new Manager("Next"));
        sayHello2(new VicePresident("Express"));
        sayHello2(new Person("Nest - Person"));
    });
    it("should be able to do polymorphism in function/method 2 wrong", () => {
        sayHello2Wrong(new Employee("React"));
        sayHello2Wrong(new Manager("Next"));
        sayHello2Wrong(new VicePresident("Express"));
        sayHello2Wrong(new Person("Nest - Person"));
        console.log(new VicePresident("Vue") instanceof VicePresident);
        console.log(new VicePresident("Vue") instanceof Manager);
        console.log(new VicePresident("Vue") instanceof Employee);
        console.log(new Manager("Vue") instanceof VicePresident);
        console.log(new Manager("Vue") instanceof Manager);
        console.log(new Manager("Vue") instanceof Employee);
        console.log(new Person("Vue") instanceof Employee);
    });
});

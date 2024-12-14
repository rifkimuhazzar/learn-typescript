"use strict";
describe("Optional Parameter", () => {
    test("null and undefined", () => {
        function sayHello(name) {
            if (name) {
                console.log(`Hello ${name}`);
            }
            else {
                console.log("Hello");
            }
        }
        sayHello("World");
        const name = undefined;
        sayHello(name);
        sayHello(null);
    });
});

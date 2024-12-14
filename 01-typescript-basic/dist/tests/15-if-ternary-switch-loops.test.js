"use strict";
it("if statement", () => {
    let examValue = 90;
    // examValue = "test";
    if (examValue >= 80) {
        console.info("Good");
    }
    else if (examValue >= 60) {
        console.info("Not Bad");
    }
    else {
        console.info("Try Again");
    }
});
it("ternary operator", () => {
    const value = 80;
    const information = value >= 75 ? "Contgratulation" : "Try again";
    console.log(information);
});
test("switch statement", () => {
    function sayHello(name) {
        switch (name) {
            case "React":
                return `Hello ${name}`;
            case "Next":
                return `Hello ${name}`;
            case "Express":
                return `Hello ${name}`;
            default:
                return `Hello`;
        }
    }
    console.log(sayHello("Express"));
    console.log(sayHello("Next"));
    console.log(sayHello("React"));
});
test("for loop", () => {
    const names = ["React", "Next", "Fastify", "Nest"];
    console.log("--- for regular ---");
    for (let i = 0; i < names.length; i++) {
        console.log(names[i]);
    }
    console.log("--- for of ---");
    for (const name of names) {
        console.log(name);
    }
    console.log("--- for in ---");
    for (const index in names) {
        console.log(names[index]);
    }
});
test("while loop", () => {
    let counter = 0;
    while (counter < 5) {
        console.log(counter);
        counter++;
    }
});
test("do while loop", () => {
    let counter = 0;
    do {
        console.log(counter);
        counter++;
    } while (counter < 5);
});
test("break and continue", () => {
    let counter = 0;
    do {
        counter++;
        if (counter === 10)
            break;
        if (counter % 2 === 0)
            continue;
        console.log(counter);
    } while (true);
});

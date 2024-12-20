"use strict";
describe("Array in Typescript", () => {
    test("array", () => {
        const names = ["React", "Next", "Express", "Nest"];
        const names2 = ["React", "Next", "Express", "Nest", 1, 2];
        const values = [1, 2, 3, 4, 5];
        console.log(names);
        console.log(names2);
        console.log(values);
    });
    test("read only array", () => {
        const hobbies = [
            "Coding",
            "Watching Series, Anime, Movies",
        ];
        console.log(hobbies);
        console.log(hobbies[0]);
        console.log(hobbies[1]);
    });
    test.only("tuple", () => {
        // const person: [string, string, number] = ["Hello", "World", 100];
        const person = ["Hello", "World", 100];
        console.log(person);
        console.log(person[0]);
        console.log(person[1]);
        console.log(person[2]);
    });
});

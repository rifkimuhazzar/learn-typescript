"use strict";
describe("Without Generic", () => {
    class Data {
        constructor(value) {
            this.value = value;
        }
    }
    it("should error in runtime", () => {
        const data = new Data("Express");
        data.value = 100;
        console.log(data.value.toUpperCase());
    });
});

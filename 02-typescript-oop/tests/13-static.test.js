"use strict";
describe("Static", () => {
    class Configuration {
    }
    Configuration.NAME = "Learn TypeScript OOP";
    Configuration.VERSION = 1.0;
    Configuration.author = "Hello World";
    class MathUtil {
        static sum(...values) {
            let total = 0;
            for (let i = 0; i < values.length; i++) {
                total += values[i];
            }
            return total;
        }
        hello() {
            return MathUtil.namex;
        }
    }
    MathUtil.namex = "This is static prop";
    it("should be able to use static", () => {
        console.log(Configuration.NAME);
        console.log(Configuration.VERSION);
        console.log(Configuration.author);
        console.log(MathUtil.sum(1, 2, 3, 4, 5));
        console.log(MathUtil.sum(10, 10, 10));
        const a = new MathUtil();
        console.log(a.hello());
    });
});

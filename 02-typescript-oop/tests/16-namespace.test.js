"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _16_math_util_1 = require("../src/16-math-util");
describe("Namespace", () => {
    it("should be able to using namespace", () => {
        console.log(_16_math_util_1.MathUtil.PI);
        console.log(_16_math_util_1.MathUtil.sum(1, 2, 3, 4, 5));
        console.log(_16_math_util_1.MathUtil.name);
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathUtil = void 0;
var MathUtil;
(function (MathUtil) {
    MathUtil.name = "Express";
})(MathUtil || (exports.MathUtil = MathUtil = {}));
(function (MathUtil) {
    MathUtil.PI = 3.14;
    function sum(...values) {
        let total = 0;
        for (const value of values) {
            total += value;
        }
        return total;
    }
    MathUtil.sum = sum;
})(MathUtil || (exports.MathUtil = MathUtil = {}));

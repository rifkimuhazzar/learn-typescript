"use strict";
const score = [];
const names = [];
function indentityOne(val) {
    return val;
}
function indentityTwo(val) {
    return val;
}
function indentityThree(val) {
    return val;
}
indentityThree(true);
function indentityFour(val) {
    return val;
}
// indentityFour<Bottle>({});
// #2
function getSearchProducts(products) {
    // do some database operations
    const myIndex = 3;
    return products[myIndex];
}
const getMoreSearchProducts = (products) => {
    // do some database operations
    const myIndex = 4;
    return products[myIndex];
};
function anotherF(valOne, valTwo) {
    return {
        valOne,
        valTwo,
    };
}
class Sellable {
    constructor() {
        this.cart = [];
    }
    addToCart(product) {
        this.cart.push(product);
    }
}

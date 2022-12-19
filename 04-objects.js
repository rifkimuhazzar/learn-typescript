"use strict";
exports.__esModule = true;
function createUser(_a) {
    var string = _a.name, boolean = _a.isPaid;
}
var newUser = { name: "Rifki", isPaid: false, email: "rifkiki78@gmail.com" };
createUser(newUser);
function createCourse() {
    return { name: "Rifki", isPaid: false };
}
function createUser2(user) {
    return { name: "", email: "", isActive: true };
}
createUser2({ name: "", email: "", isActive: true });
var myUser = {
    _id: "12345",
    name: "rifki",
    email: "rifkiki78@gmail.com",
    isActive: false
};
myUser.name = "My Name";

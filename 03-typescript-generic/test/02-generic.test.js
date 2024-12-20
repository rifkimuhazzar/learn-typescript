"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
describe("Generic", () => {
    class GenericData {
        constructor(value) {
            this.value = value;
        }
        get() {
            return this.value;
        }
        set(value) {
            this.value = value;
        }
    }
    it("should be able to do generic class", () => {
        const dataNumber = new GenericData(100);
        console.log(dataNumber);
        console.log(dataNumber.value);
        const dataString = new GenericData("Express");
        console.log(dataString);
        console.log(dataString.value);
    });
    function create(value) {
        return value;
    }
    it("should be able to generic function", () => {
        const result = create(100);
        console.log(result);
        const result2 = create("Hello");
        console.log(result2);
    });
    class Entry {
        constructor(key, value) {
            this.key = key;
            this.value = value;
        }
    }
    class Triple {
        constructor(first, second, third) {
            this.first = first;
            this.second = second;
            this.third = third;
        }
    }
    it("should be able to do multiple generic type", () => {
        const entry = new Entry(1, "Hello");
        console.log(entry);
        const triple = new Triple(1, "Hello", true);
        console.log(triple);
    });
    it("should be able to do optional/implicit generic", () => {
        const entry = new Entry(1, "Hello");
        console.log(entry);
    });
    class SimpleGeneric {
        setValue(value) {
            this.value = value;
        }
        getValue() {
            return this.value;
        }
    }
    it("should be error without explicit generic", () => {
        // const simple = new SimpleGeneric<string>();
        const simple = new SimpleGeneric();
        simple.setValue("Express");
        console.log(simple.getValue().toUpperCase());
    });
    class EmployeeData {
        constructor(employee) {
            this.employee = employee;
        }
    }
    it("should be able to do generic constraint", () => {
        const data1 = new EmployeeData({
            id: "100",
            name: "Express",
        });
        const data2 = new EmployeeData({
            id: "100",
            name: "Express",
            totalEmployees: 10,
        });
        const data3 = new EmployeeData({
            id: "100",
            name: "Express",
            totalEmployees: 100,
            totalManagers: 10,
        });
        console.log(data1);
        console.log(data2);
        console.log(data3);
    });
    it("should support array", () => {
        const array = new Array();
        array.push("Express");
        array.push("100");
        console.log(array);
    });
    it("should support set", () => {
        const set = new Set();
        set.add("Express");
        set.add("100");
        set.add("Express");
        console.log(set);
        console.log(set.size);
        console.log(set.has("100"));
    });
    it("should support map", () => {
        const map = new Map();
        map.set("Express", 100);
        map.set("Nest", 95);
        console.log(map);
        console.log(map.get("Express"));
    });
    function fetchData(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (value === "Express")
                        resolve("Resolve: " + value);
                    reject("Reject: " + value);
                }, 1000);
            });
        });
    }
    it("should support promise", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield fetchData("Express");
        console.log(result);
        try {
            const result = yield fetchData("Fastify");
        }
        catch (error) {
            console.log(error);
        }
    }));
});

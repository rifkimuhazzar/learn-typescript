"use strict";
describe("Visibility", () => {
    class Counter {
        constructor() {
            // private counter = 0;
            this.counter = 0;
        }
        increment() {
            this.counter++;
        }
        getCounter() {
            return this.counter;
        }
    }
    class DoubleCounter extends Counter {
        increment() {
            this.counter += 2;
        }
    }
    it("should be able to do visibility", () => {
        const counter = new Counter();
        console.log(counter);
        counter.increment();
        counter.increment();
        counter.increment();
        console.log(counter);
        console.log(counter.getCounter());
        const doubleCounter = new DoubleCounter();
        console.log(doubleCounter);
        doubleCounter.increment();
        doubleCounter.increment();
        doubleCounter.increment();
        console.log(doubleCounter);
        console.log(doubleCounter.getCounter());
    });
});

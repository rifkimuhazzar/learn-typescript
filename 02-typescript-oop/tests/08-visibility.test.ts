describe("Visibility", () => {
  class Counter {
    // private counter = 0;
    protected counter = 0;
    public increment(): void {
      this.counter++;
    }
    public getCounter(): number {
      return this.counter;
    }
  }
  class DoubleCounter extends Counter {
    increment(): void {
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

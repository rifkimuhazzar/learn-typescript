describe("Static", () => {
  class Configuration {
    static NAME: string = "Learn TypeScript OOP";
    static VERSION = 1.0;
    static author = "Hello World";
  }

  class MathUtil {
    static namex: string = "This is static prop";

    static sum(...values: number[]): number {
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

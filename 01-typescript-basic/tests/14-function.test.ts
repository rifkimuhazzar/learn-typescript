describe("Function", () => {
  test("function", () => {
    function sayHello1(name: string): string {
      return `Hello ${name}`;
    }
    console.log(sayHello1("World"));

    function sayHello2(name: string): void {
      console.log(`Hello ${name}`);
    }
    sayHello2("World");
  });

  test("function parameter default value", () => {
    function sayHello1(name: string = "Guest"): string {
      return `Hello ${name}`;
    }
    console.log(sayHello1("World"));
    console.log(sayHello1());
  });

  test("function rest parameter (variable argument)", () => {
    function sum(...values: number[]): number {
      let total = 0;
      for (const value of values) {
        total += value;
      }
      return total;
    }
    console.log(sum(1, 2, 3, 4, 5));
  });

  test("function optional parameter", () => {
    function sayHello(firstName: string, lastName?: string): string {
      if (lastName) {
        return `Hello ${firstName} ${lastName}`;
      }
      return `Hello ${firstName}`;
    }
    console.log(sayHello("React"));
    console.log(sayHello("React", "Next"));
  });

  test("function overloading", () => {
    function callMe(a: number): number;
    function callMe(a: string): string;
    function callMe(value: any) {
      if (typeof value === "number") return value * 10;
      return value.toUpperCase();
    }

    console.log(callMe(100));
    console.log(callMe("Hello"));
    // console.log(callMe(true)); // tidak bisa karena menggunakan overload
  });

  test("function as parameter", () => {
    function sayHello(name: string, filter: (name: string) => string): string {
      return `Hello ${filter(name)}`;
    }
    function toUpper(name: string): string {
      return name.toUpperCase();
    }

    console.log(sayHello("Express", toUpper));
    console.log(
      sayHello("React", function (name: string): string {
        return name.toUpperCase();
      })
    );
    console.log(sayHello("Nest", (name: string): string => name.toUpperCase()));
  });
});

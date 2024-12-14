describe("Optional Parameter", () => {
  test("null and undefined", () => {
    function sayHello(name?: string | null) {
      if (name) {
        console.log(`Hello ${name}`);
      } else {
        console.log("Hello");
      }
    }

    sayHello("World");
    const name: string | undefined = undefined;
    sayHello(name);
    sayHello(null);
  });
});

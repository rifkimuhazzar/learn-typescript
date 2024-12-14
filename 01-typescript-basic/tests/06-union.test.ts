describe("Union Type", () => {
  test("union type", () => {
    let sample: string | number | boolean = "Hello World";
    console.log(sample);
    sample = 100;
    console.log(sample);
    sample = true;
    console.log(sample);
  });

  test.only("union type check with typeof", () => {
    function proccess(value: string | number | boolean) {
      if (typeof value === "string") {
        return value.toUpperCase();
      } else if (typeof value === "number") {
        return value + 5;
      } else {
        return !value;
      }
    }
    console.log(proccess("Hello World"));
    console.log(proccess(20));
    console.log(proccess(true));
    expect(proccess("Hello World")).toBe("HELLO WORLD");
    expect(proccess(20)).toBe(25);
    expect(proccess(true)).toBe(false);
  });
});

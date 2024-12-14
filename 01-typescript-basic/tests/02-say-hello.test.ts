import { sayHello } from "../src/02-say-hello";

describe("sayHello", () => {
  it("should return Hello World", () => {
    expect(sayHello("World")).toBe("Hello World");
  });
});

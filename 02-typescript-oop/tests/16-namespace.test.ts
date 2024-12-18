import { MathUtil } from "../src/16-math-util";

describe("Namespace", () => {
  it("should be able to using namespace", () => {
    console.log(MathUtil.PI);
    console.log(MathUtil.sum(1, 2, 3, 4, 5));
    console.log(MathUtil.name);
  });
});

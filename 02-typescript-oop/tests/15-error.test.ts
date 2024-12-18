describe("Error Handling", () => {
  class ValidationError extends Error {
    constructor(public message: string) {
      super(message);
    }
  }

  it("should be able to throw ValidationError", () => {
    function validation(value: number): number {
      if (value < 1) {
        throw new ValidationError("Value must be greater than 0");
      }
      return value;
    }

    try {
      const result = validation(0);
    } catch (error) {
      if (error instanceof ValidationError) {
        console.log(error.message);
      }
    }
    console.log(validation(1));
  });
});

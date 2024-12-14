describe("Any", () => {
  test("any data type", () => {
    const person: any = {
      firstName: "Hello",
      lastName: "World",
      age: 25,
    };
    person.age = "30";
    person.address = "Singapore";
    console.log(person);

    let name: any = "Hello World";
    name = 10;
    console.log(name);
  });
});

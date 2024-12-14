describe("Obejct Type", () => {
  test("object type", () => {
    const person: { id: string; name: string; hobbies?: string[] } = {
      id: "1",
      name: "Hello World",
    };

    console.log(person);
    console.log(person.id);
    console.log(person.name);
  });
});

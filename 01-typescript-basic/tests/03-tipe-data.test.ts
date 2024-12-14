describe("Data Types", () => {
  test("explicit/implicit data types", () => {
    // let exampleImplicitDataType = "Hello World";
    // exampleImplicitDataType = "Hello TS";
    // console.log(exampleImplicitDataType);

    let name: string = "Hello World";
    name = "Hello TypeScript";
    let balance: number = 1000000;
    let isVip: boolean = true;

    console.info(name);
    console.info(balance);
    console.info(isVip);
  });
});

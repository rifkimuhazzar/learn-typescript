import { Seller } from "../src/11-seller";
import { Employee, Manager } from "../src/12-employee";
import { Person } from "../src/13-person";

describe("Interface", () => {
  test("interface", () => {
    const seller: Seller = {
      id: 1,
      name: "Hello World",
      nib: "200",
    };
    seller.id = 100;
    seller.address = "Singapore";

    // tidak bisa diubah/ditambahkan karena readonly prop harus diisi saat membuat object
    // seller.nib = 100;
    // seller.npwp = "200";

    console.log(seller);
  });

  test("interface for function", () => {
    /*
    interface AddFunction {
      add(a: number, b: number): number;
      name: string;
    }
    */
    interface AddFunction {
      (a: number, b: number): number;
    }

    // dapat ditambah juga type pada parameter dan return valuenya
    const add1: AddFunction = (value1, value2) => {
      return value1 + value2;
    };
    console.log(add1(1, 2));
  });

  test("indexable interface for number index (array & object)", () => {
    interface StringArray {
      [index: number]: string; // nama index bebas
    }

    let names: StringArray = ["React", "Nextjs", "Express"];
    console.log(names);

    names = { 1: "First Name", 2: "Last Name" };
    console.log(names);
  });

  test("indexable interface for non number index (object)", () => {
    interface StringDictionary {
      [key: string]: string; // nama key bebas
    }

    const dictionary: StringDictionary = {
      frontEnd: "Nextjs",
      backend: "Nestjs",
    };

    console.log(dictionary);
    console.log(dictionary["frontEnd"]);
    console.log(dictionary.backend);
  });

  test("extends interface", () => {
    const employee: Employee = {
      id: "1",
      name: "React",
      division: "Web",
    };
    console.log(employee);

    const manager: Manager = {
      id: "2",
      name: "Next",
      division: "Web",
      numberOfEmployees: 10,
    };
    console.log(manager);
  });

  test("interface for method", () => {
    const person: Person = {
      name: "TypeScript",
      sayHello(name) {
        return `Hello ${name}, my name is ${this.name}`;
      },
    };
    console.log(person.sayHello("JavaScript"));
  });

  test("intersection type", () => {
    interface HasName {
      name: string;
    }
    interface HasId {
      id: number;
    }

    interface Person extends HasName, HasId {}
    type Domain = HasId & HasName;

    const person: Person = { id: 1, name: "React" };
    const domain: Domain = { id: 1, name: "Next" };
    console.log(person);
    console.log(domain);
  });

  test("type assertion", () => {
    const person: any = {
      name: "Express",
      age: "20",
    };
    console.log(person);
    const person2: Person = person as Person;
    console.log(person2);
    // error
    // console.log(person2.age);
    // console.log(person2.sayHello("Express"));
  });

  test("MY TEST", () => {
    function addOrConcatenate(
      a: number,
      b: number,
      c: "add" | "concatenate"
    ): string | number | null {
      if (c === "add") return a + b;
      return "This is string: " + a + b;
    }
    // tanda ! hanya untuk mempersempit type dengan menghilangkan type null
    let value1: number = addOrConcatenate(1, 2, "add") as number;
    let value2: string = addOrConcatenate(1, 2, "concatenate") as string;
    let value3: string = 90 as any as string;
    let value4: string = 90 as unknown as string;
    console.log(typeof value1);
    console.log(typeof value2);
    console.log(typeof value3);
    console.log(typeof value4);

    const value5: any = "Express";
    const value6 = value5.toUpperCase();
    console.log(value6);
  });
});

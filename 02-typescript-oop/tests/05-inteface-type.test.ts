describe("Implements Interface", () => {
  interface HasName {
    name: string;
  }
  interface CanSayHello {
    sayHello(name: string): void;
  }
  type MyAge = {
    age: number;
  };
  type MyCountry = {
    country: string;
  };

  class Person implements HasName, CanSayHello, MyAge, MyCountry {
    name: string;
    age: number;
    country: string;
    constructor(name: string, age: number, country: string) {
      this.name = name;
      this.age = age;
      this.country = country;
    }

    sayHello(name: string): void {
      console.log(
        `Hello ${name}, my name is ${this.name}, my age is ${this.age} and my address is ${this.country}`
      );
    }
  }

  it("should be able to implements interface", () => {
    const person = new Person("Next", 25, "Singapore");
    console.log(person);
    person.sayHello("React");
  });
});

describe("My Test: Interface and Type", () => {
  interface Name {
    name: string;
  }
  interface Age {
    age: number;
  }
  type City = {
    city: string;
  };
  type Country = string;

  interface A extends Age, Name, City {}
  type B = Name & Age;
  type C = Name & Age & City;
  type D = Name & Age & City & Country; // errornya terjadi saat digunakan

  it("should be able to combine/extends interface and type", () => {
    const a: A = { name: "Express", age: 25, city: "Singapore" };
    console.log(a);
    const b: B = { name: "Express", age: 25 };
    console.log(b);
    const c: C = { name: "Express", age: 25, city: "Singapore" };
    console.log(c);
    // const d: D = [{ name: "Express", age: 25, city: "Singapore" }];
    // console.log(d);
  });
});

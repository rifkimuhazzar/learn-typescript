describe("Generic", () => {
  class GenericData<x> {
    value: x;
    constructor(value: x) {
      this.value = value;
    }

    get(): x {
      return this.value;
    }

    set(value: x) {
      this.value = value;
    }
  }

  it("should be able to do generic class", () => {
    const dataNumber = new GenericData<number>(100);
    console.log(dataNumber);
    console.log(dataNumber.value);

    const dataString = new GenericData("Express");
    console.log(dataString);
    console.log(dataString.value);
  });

  function create<T>(value: T): T {
    return value;
  }

  it("should be able to generic function", () => {
    const result: number = create(100);
    console.log(result);
    const result2: string = create<string>("Hello");
    console.log(result2);
  });

  class Entry<K, V> {
    constructor(public key: K, public value: V) {}
  }

  class Triple<K, V, T> {
    constructor(public first: K, public second: V, public third: T) {}
  }

  it("should be able to do multiple generic type", () => {
    const entry = new Entry<number, string>(1, "Hello");
    console.log(entry);
    const triple = new Triple(1, "Hello", true);
    console.log(triple);
  });

  it("should be able to do optional/implicit generic", () => {
    const entry = new Entry(1, "Hello");
    console.log(entry);
  });

  class SimpleGeneric<T = string> {
    private value?: T;

    setValue(value: T) {
      this.value = value;
    }

    getValue(): T | undefined {
      return this.value;
    }
  }

  it("should be error without explicit generic", () => {
    // const simple = new SimpleGeneric<string>();
    const simple = new SimpleGeneric();
    simple.setValue("Express");
    console.log(simple.getValue()!.toUpperCase());
  });

  interface Employee {
    id: string;
    name: string;
  }

  interface Manager extends Employee {
    totalEmployees: number;
  }

  interface VP extends Manager {
    totalManagers: number;
  }

  class EmployeeData<T extends Employee> {
    constructor(public employee: T) {}
  }

  it("should be able to do generic constraint", () => {
    const data1 = new EmployeeData<Employee>({
      id: "100",
      name: "Express",
    });
    const data2 = new EmployeeData<Manager>({
      id: "100",
      name: "Express",
      totalEmployees: 10,
    });
    const data3 = new EmployeeData<VP>({
      id: "100",
      name: "Express",
      totalEmployees: 100,
      totalManagers: 10,
    });

    console.log(data1);
    console.log(data2);
    console.log(data3);
  });

  it("should support array", () => {
    const array = new Array<string>();
    array.push("Express");
    array.push("100");
    console.log(array);
  });

  it("should support set", () => {
    const set = new Set<string>();
    set.add("Express");
    set.add("100");
    set.add("Express");
    console.log(set);
    console.log(set.size);
    console.log(set.has("100"));
  });

  it("should support map", () => {
    const map = new Map<string, number>();
    map.set("Express", 100);
    map.set("Nest", 95);
    console.log(map);
    console.log(map.get("Express"));
  });

  async function fetchData(value: string): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value === "Express") resolve("Resolve: " + value);
        reject("Reject: " + value);
      }, 1000);
    });
  }

  it("should support promise", async () => {
    const result = await fetchData("Express");
    console.log(result);

    try {
      const result = await fetchData("Fastify");
    } catch (error) {
      console.log(error);
    }
  });
});

describe("Interface", () => {
    test("interface", () => {
        const seller = {
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
        // dapat ditambah juga type pada parameter dan return valuenya
        const add1 = (value1, value2) => {
            return value1 + value2;
        };
        console.log(add1(1, 2));
    });
    test("indexable interface for number index (array & object)", () => {
        let names = ["React", "Nextjs", "Express"];
        console.log(names);
        names = { 1: "First Name", 2: "Last Name" };
        console.log(names);
    });
    test("indexable interface for non number index (object)", () => {
        const dictionary = {
            frontEnd: "Nextjs",
            backend: "Nestjs",
        };
        console.log(dictionary);
        console.log(dictionary["frontEnd"]);
        console.log(dictionary.backend);
    });
    test("extends interface", () => {
        const employee = {
            id: "1",
            name: "React",
            division: "Web",
        };
        console.log(employee);
        const manager = {
            id: "2",
            name: "Next",
            division: "Web",
            numberOfEmployees: 10,
        };
        console.log(manager);
    });
    test("interface for method", () => {
        const person = {
            name: "TypeScript",
            sayHello(name) {
                return `Hello ${name}, my name is ${this.name}`;
            },
        };
        console.log(person.sayHello("JavaScript"));
    });
    test("intersection type", () => {
        const person = { id: 1, name: "React" };
        const domain = { id: 1, name: "Next" };
        console.log(person);
        console.log(domain);
    });
    test("type assertion", () => {
        const person = {
            name: "Express",
            age: "20",
        };
        console.log(person);
        const person2 = person;
        console.log(person2);
        // error
        // console.log(person2.age);
        // console.log(person2.sayHello("Express"));
    });
    test("MY TEST", () => {
        function addOrConcatenate(a, b, c) {
            if (c === "add")
                return a + b;
            return "This is string: " + a + b;
        }
        // tanda ! hanya untuk mempersempit type dengan menghilangkan type null
        let value1 = addOrConcatenate(1, 2, "add");
        let value2 = addOrConcatenate(1, 2, "concatenate");
        let value3 = 90;
        let value4 = 90;
        console.log(typeof value1);
        console.log(typeof value2);
        console.log(typeof value3);
        console.log(typeof value4);
        const value5 = "Express";
        const value6 = value5.toUpperCase();
        console.log(value6);
    });
});
export {};

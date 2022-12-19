function n(num: number): number {
  return num + 2;
  // return `Hello`;
}

function s(val: string) {
  return val.toUpperCase();
}

function signUp(user: string, email: string, isPaid: boolean) {}

const isLogin = (name: string, emai: string, isPaid: boolean = false) => {};

n(5);
s("Hello");
signUp("Rifki", "rifkiki78@gmail.com", false);
isLogin("R", "r@gmail.com");

// #2
// function getValue(myVal: number): boolean {
//   if (myVal > 5) {
//     return true;
//   } else {
//     return "200 OK";
//   }
// }

const sayHello = (s: string): string => "Hello World";

const person = ["Rifki 1", "Rifki 2", "Rifki 3"];
person.map((p): string => {
  return `person is ${p}`;
});

function consoleError(err: string): void {
  console.info(err);
}

function handleError(err: string): never {
  throw new Error(err);
}

export {};

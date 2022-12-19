let score: number | string = 27;
score = 30;
score = "50";

type User = {
  name: string;
  id: number;
};

type Admin = {
  username: string;
  id: number;
};

let person: User | Admin = { name: "Rifki", id: 12345 };
person = { username: "rm", id: 123 };

// function getDbId(id: number | string) {
//   console.log(`DB id is ${id}`);
// }

getDbId(3);
getDbId("5");

function getDbId(id: number | string) {
  if (typeof id === "string") {
    id.toLowerCase();
  } else if (typeof id === "number") {
    id + 10;
  }
}

const data: (string | number | boolean)[] = [1, 2, 3, "Hi", true];

let setAllotment: "aisle" | "middle" | "window";
setAllotment = "aisle";
// setAllotment = "crew";

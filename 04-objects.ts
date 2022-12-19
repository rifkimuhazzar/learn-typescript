function createUser({ name: string, isPaid: boolean }) {}
const newUser = { name: "Rifki", isPaid: false, email: "rifkiki78@gmail.com" };
createUser(newUser);

function createCourse(): { name: string; isPaid: boolean } {
  return { name: "Rifki", isPaid: false };
}

// #3 type
type User = {
  name: string;
  email: string;
  isActive: boolean;
};

function createUser2(user: User): User {
  return { name: "", email: "", isActive: true };
}
createUser2({ name: "", email: "", isActive: true });

// #4 readonly and optional
type User2 = {
  readonly _id: string;
  name: string;
  email: string;
  isActive: boolean;
  creditCardDetails?: number;
};

let myUser: User2 = {
  _id: "12345",
  name: "rifki",
  email: "rifkiki78@gmail.com",
  isActive: false,
};

type cardNumber = {
  cardNumber: string;
};

type cardDate = {
  cardDate: string;
};

type cardDetails = cardNumber &
  cardDate & {
    cvv: number;
  };

myUser.name = "My Name";
// myUser._id = "1234567";

export {};

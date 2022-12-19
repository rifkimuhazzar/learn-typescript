const score: Array<number> = [];
const names: Array<string> = [];

function indentityOne(val: boolean | number): boolean | number {
  return val;
}

function indentityTwo(val: any): any {
  return val;
}

function indentityThree<Type>(val: Type): Type {
  return val;
}
indentityThree(true);

function indentityFour<T>(val: T): T {
  return val;
}

interface Bottle {
  brand: string;
  type: number;
}
// indentityFour<Bottle>({});

// #2
function getSearchProducts<T>(products: T[]): T {
  // do some database operations
  const myIndex = 3;
  return products[myIndex];
}

const getMoreSearchProducts = <T>(products: T[]): T => {
  // do some database operations
  const myIndex = 4;
  return products[myIndex];
};

// #3
interface Database {
  connection: string;
  username: string;
  password: string;
}

function anotherF<T, X extends Database>(valOne: T, valTwo: X): object {
  return {
    valOne,
    valTwo,
  };
}
// anotherF(3, {});

interface Quiz {
  name: string;
  type: string;
}

interface Course {
  name: string;
  author: string;
  subject: string;
}

class Sellable<T> {
  public cart: T[] = [];

  addToCart(product: T) {
    this.cart.push(product);
  }
}

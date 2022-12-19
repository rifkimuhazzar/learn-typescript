// console.info("TypeScript is here");

// class User {
//   public email: string;
//   private name: string;
//   city: string = "";
//   constructor(email: string, name: string) {
//     this.email = email;
//     this.name = name;
//   }
// }

class User {
  protected _courseCount = 1;
  readonly city: string = "Singapore";

  constructor(
    public email: string,
    public name: string,
    private userId: string
  ) {}
  private deleteToken() {
    console.log("delete");
  }

  get getAppleEmail(): string {
    return `apple ${this.email}`;
  }

  get courseCount(): number {
    return this._courseCount;
  }

  set courseCount(courseNum) {
    if (courseNum <= 1) {
      throw new Error("Course count should be more than 1");
    }
    this._courseCount = courseNum;
  }
}

class SubUser extends User {
  isFamily: boolean = true;
  changeCourseCount() {
    this._courseCount;
  }
}

const r = new User("rifkiki78@gmail.com", "rifki", "123345");
r.city;
r.email;

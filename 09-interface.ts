interface User {
  readonly dbId: number;
  email: string;
  userId: number;
  googleId?: number;
  // startTrail: () => string;
  startTrail(): string;
  getCoupon(couponname: string, value: number): number;
}

interface User {
  gitHubToken: string;
}

interface Admin extends User {
  role: "admin" | "ta" | "learner";
}

const newUser: Admin = {
  dbId: 32,
  email: "Rifkiki78@gmail.com",
  userId: 123,
  startTrail: () => "Trail started",
  getCoupon: (name: "rifki", off: 10) => 10,
  gitHubToken: "github",
  role: "admin",
};

newUser.email = "r@gmail.com";
// newUser.dbId = 22;

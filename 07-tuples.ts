// const user: (string | number)[] = [1, "rm"];
let user: [string, number, boolean];
user = ["rm", 1, true];

const rgb: [number, number, number] = [255, 255, 255];

type User = [number, string];
const newUser: User = [123, "rm"];
newUser[1] = "r";
newUser.push(true);

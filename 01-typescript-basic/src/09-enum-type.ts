export enum CustomerType {
  Platinum = 2,
  REGULAR = 0,
  GOLD = 1,
  diamond = "diamond",
  gd = GOLD + diamond,
}

export type Customer = {
  id: number;
  name: string;
  type: CustomerType;
};

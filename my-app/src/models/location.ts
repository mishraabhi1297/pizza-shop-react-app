import { IPizza } from "./pizza";

export interface ILocation {
  id: number;
  name: string;
  pizzas: IPizza[];
}

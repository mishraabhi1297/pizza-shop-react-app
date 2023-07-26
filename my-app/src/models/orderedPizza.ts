import { IPizza } from "./pizza";

export interface IOrderedPizza extends IPizza {
  toppings?: string[];
  currentToppingSelection?: string;
}

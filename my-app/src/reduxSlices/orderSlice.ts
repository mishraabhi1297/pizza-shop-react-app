import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IOrderedPizza } from '../models/orderedPizza'

export interface OrderState {
  pizzas: IOrderedPizza[]
}

interface IUpdatePizzaTopping {
  index: number;
  topping: string;
}

const initialState: OrderState = {
  pizzas: []
}

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<IOrderedPizza>) => {
      state.pizzas.push(action.payload)
    },
    updatePizzaToppingSelection: (state, action: PayloadAction<IUpdatePizzaTopping>) => {
      state.pizzas[action.payload.index].currentToppingSelection = action.payload.topping
    },
    addTopping: (state, action: PayloadAction<number>) => {
      const newPizza = state.pizzas[action.payload];

      if (newPizza.currentToppingSelection) {
        newPizza.price++;
        newPizza.toppings = [ ...newPizza.toppings ?? [], newPizza.currentToppingSelection ];
      }
    },
    removeTopping: (state, action: PayloadAction<number>) => {
      const newPizza = state.pizzas[action.payload];

      if (newPizza.currentToppingSelection 
        && newPizza.toppings?.includes(newPizza.currentToppingSelection)) {

        newPizza.price--;
        const indexToRemove = newPizza.toppings.findIndex(x => x === newPizza.currentToppingSelection);
        newPizza.toppings.splice(indexToRemove, 1);
      }
    },
    clearOrder: (state) => {
      state.pizzas = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { addPizza, updatePizzaToppingSelection, addTopping, removeTopping, clearOrder } = orderSlice.actions

export default orderSlice.reducer;
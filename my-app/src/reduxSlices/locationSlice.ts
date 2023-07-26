import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ILocation } from '../models/location';

export interface LocationState {
  locations: ILocation[]
}

const getInitialLocations = () : ILocation[] => {
  var locations: ILocation[] = []

  // Preston Pizzeria
  var prestonLocation: ILocation = {
    id: 43267534,
    name: "Preston Pizzeria",
    pizzas: [
      {
        id: 89283,
        name: "Capricciosa",
        price: 20,
        ingredients: [ "Cheese", "Ham", "Mushrooms", "Olives" ]
      },
      {
        id: 9282743,
        name: "Mexicana",
        price: 18,
        ingredients: [ "Cheese", "Salami", "Capsicum", "Chilli" ]
      },
      {
        id: 1273009,
        name: "Margherita",
        price: 22,
        ingredients: [ "Cheese", "Spinach", "Ricotta", "Cherry Tomatoes" ]
      }
    ]
  };

  // Southbank Pizzeria
  var southbankLocation: ILocation = {
    id: 93072061,
    name: "Southbank Pizzeria",
    pizzas: [
      {
        id: 728273,
        name: "Capricciosa",
        price: 25,
        ingredients: [ "Cheese", "Ham", "Mushrooms", "Olives" ]
      },
      {
        id: 9482734,
        name: "Vegetarian",
        price: 17,
        ingredients: [ "Cheese", "Mushrooms", "Capsicum", "Onion", "Olives" ]
      }
    ]
  };

  locations.push(prestonLocation, southbankLocation);

  return locations;
}

const initialState: LocationState = {
  locations: getInitialLocations()
}

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
  },
})

// Action creators are generated for each case reducer function
export const {  } = locationSlice.actions

export default locationSlice.reducer;
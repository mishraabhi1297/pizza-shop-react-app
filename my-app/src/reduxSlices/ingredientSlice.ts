import { createSlice } from '@reduxjs/toolkit'

export interface LocationState {
  ingredients: string[]
}

const initialState: LocationState = {
  ingredients: [ "Cheese", "Ham", "Mushrooms", "Olives", "Salami", "Capsicum" ]
}

export const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
  },
})

// Action creators are generated for each case reducer function
export const {  } = ingredientSlice.actions

export default ingredientSlice.reducer;
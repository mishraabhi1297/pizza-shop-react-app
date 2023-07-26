import { combineReducers, configureStore } from '@reduxjs/toolkit'
import locationSlice from './reduxSlices/locationSlice'
import ingredientSlice from './reduxSlices/ingredientSlice';
import orderSlice from './reduxSlices/orderSlice';

const rootReducer = combineReducers({ 
  locationSlice: locationSlice,
  ingredientSlice: ingredientSlice,
  orderSlice: orderSlice
});

export const store = configureStore({
  reducer: rootReducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
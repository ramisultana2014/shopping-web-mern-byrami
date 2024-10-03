import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./context/cartSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
export default store;

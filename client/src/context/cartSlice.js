import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
  token: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((el) => el.productId !== action.payload);
    },
    decreasQuantity(state, action) {
      const currentSelectItem = state.cart.find(
        (el) => el.productId === action.payload
      );
      currentSelectItem.orderQuantity--;
      currentSelectItem.totalPrice =
        currentSelectItem.orderQuantity * currentSelectItem.price;
      if (currentSelectItem.orderQuantity === 0)
        cartSlice.caseReducers.deleteItem(state, action);
    },
    increasquantity(state, action) {
      const currentSelectItem = state.cart.find(
        (el) => el.productId === action.payload
      );
      currentSelectItem.orderQuantity++;
      currentSelectItem.totalPrice =
        currentSelectItem.orderQuantity * currentSelectItem.price;
    },
    clearCart(state, action) {
      state.cart = [];
    },
    addToken(state, action) {
      state.token = action.payload;
    },
  },
});
export const {
  addItem,
  deleteItem,
  decreasQuantity,
  increasquantity,
  clearCart,
  addToken,
} = cartSlice.actions;
export default cartSlice.reducer;



import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "../Slice/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },
});

export default store;

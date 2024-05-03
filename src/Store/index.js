import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import shopReducer from "../features/Shop/shopSlice";
export default configureStore({
  reducer: {
    counter: counterReducer,
    shop: shopReducer,
  },
});

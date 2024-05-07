import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import shopReducer from "../features/Shop/shopSlice";
import { carsApi } from "../services/service";
import { setupListeners } from "@reduxjs/toolkit/query";
import cartReducer from "../features/Cart/cartSlice";
const store = configureStore({
  reducer: {
    counter: counterReducer,
    shop: shopReducer,
    cart: cartReducer,
    [carsApi.reducerPath]: carsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(carsApi.middleware),
});

setupListeners(store.dispatch);

export default store;

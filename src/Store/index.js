import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../features/Shop/shopSlice";
import { carsApi } from "../services/service";
import { setupListeners } from "@reduxjs/toolkit/query";
import cartReducer from "../features/Cart/cartSlice";
import authReducer from "../features/User/userSlice";
import { authApi } from "../services/authService";

const store = configureStore({
  reducer: {
    shop: shopReducer,
    cart: cartReducer,
    auth: authReducer,
    [carsApi.reducerPath]: carsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(carsApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch);

export default store;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { apiProducts } from "./feature/productsSlice";
import { apiUsers } from "./feature/usersSlice";
import { apiCategory } from "./feature/categorysSlice";
import { apiCarts } from "./feature/cartsSlice";
import { apiOrders } from "./feature/ordersSlice";

const reducers = combineReducers({
  [apiUsers.reducerPath]: apiUsers.reducer,
  [apiProducts.reducerPath]: apiProducts.reducer,
  [apiCategory.reducerPath]: apiCategory.reducer,
  [apiCarts.reducerPath]: apiCarts.reducer,
  [apiOrders.reducerPath]: apiOrders.reducer,
});
export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiUsers.middleware,
      apiProducts.middleware,
      apiCategory.middleware,
      apiCarts.middleware,
      apiOrders.middleware,
    ]),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

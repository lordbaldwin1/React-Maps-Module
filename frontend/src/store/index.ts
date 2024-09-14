/**
 * Configures and exports the Redux store for the application.
 * @module
 */

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

/**
 * The configured Redux store for the application.
 *
 * @remarks
 * This store is created using Redux Toolkit's configureStore function,
 * which automatically sets up good defaults for the store, including
 * enabling Redux DevTools and setting up thunk middleware.
 */
export const rootStore = configureStore({
  reducer: rootReducer,
});

/**
 * Inferred type of the root state from the store itself.
 *
 * @remarks
 * This type can be used to declare the expected type of the Redux store's state
 * throughout the application.
 */
export type RootState = ReturnType<typeof rootStore.getState>;

/**
 * Inferred type of the dispatch function from the store itself.
 *
 * @remarks
 * This type can be used for dispatching actions with correct typing throughout
 * the application.
 */
export type AppDispatch = typeof rootStore.dispatch;

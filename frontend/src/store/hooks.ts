/**
 * Custom Redux hooks for use with the app's store.
 * @module
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./index";

/**
 * Custom hook to access the `dispatch` function with correct typing for the app's store.
 *
 * @returns {AppDispatch} The correctly typed dispatch function.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Custom hook to access the Redux store's state with correct typing.
 *
 * @type {TypedUseSelectorHook<RootState>}
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

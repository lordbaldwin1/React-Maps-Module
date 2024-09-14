/**
 * Redux slice for managing the application's theme state.
 * @module
 */

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";

/**
 * Represents the state shape for the theme slice.
 * @public
 */
export interface ThemeState {
  isDarkMode: boolean;
}

/**
 * Initial state for the theme slice.
 */
const initialState: ThemeState = {
  isDarkMode: true, // Default to dark mode
};

/**
 * Redux slice for theme management.
 */
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    /**
     * Toggles the theme between dark and light mode.
     * @param {ThemeState} state - Current theme state
     * @returns {void}
     */
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

/**
 * Action creator to toggle the theme
 */
export const { toggleTheme } = themeSlice.actions;

/**
 * Selector to get the current dark mode state from the Redux store.
 * @param {RootState} state - The root state of the Redux store
 * @returns {boolean} The current dark mode state
 */
export const selectIsDarkMode = (state: RootState): boolean =>
  state.theme.isDarkMode;

export default themeSlice.reducer;

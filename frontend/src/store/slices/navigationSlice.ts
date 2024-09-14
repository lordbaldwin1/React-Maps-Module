import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

export interface NavigationState {
  showNavigationPopup: boolean;
}

const initialState: NavigationState = {
  showNavigationPopup: false,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    showNavigationPopup(state) {
      state.showNavigationPopup = true;
    },
    hideNavigationPopup(state) {
      state.showNavigationPopup = false;
    },
  },
});

export const { showNavigationPopup, hideNavigationPopup } =
  navigationSlice.actions;

export const selectNavigation = (state: RootState) => state.navigation;

export default navigationSlice.reducer;

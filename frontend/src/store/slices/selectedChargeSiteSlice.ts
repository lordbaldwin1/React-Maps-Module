/**
 * Redux slice for managing the selected charge site state.
 * @module selectedChargeSiteSlice
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { ChargeSite } from "../../types/ChargeSite";

/**
 * @property {ChargeSite|undefined} site - The currently selected charge site.
 * @property {boolean} isClosing - Whether the popup is in the process of closing.
 */
export interface SelectedChargeSiteState {
  site: ChargeSite | undefined;
  isClosing: boolean;
}

const initialState: SelectedChargeSiteState = {
  site: undefined,
  isClosing: false,
};

export const selectedChargeSiteSlice = createSlice({
  name: "selectedChargeSite",
  initialState,
  reducers: {
    /**
     * Selects a charge site and opens the popup.
     * @param {SelectedChargeSiteState} state - The current state.
     * @param {PayloadAction<ChargeSite|undefined>} action - The action containing the charge site to select.
     */
    selectChargeSite: (
      state: SelectedChargeSiteState,
      action: PayloadAction<ChargeSite | undefined>,
    ) => {
      if (state.site?.id !== action.payload?.id) {
        state.site = action.payload;
        state.isClosing = false;
      }
    },
    /**
     * Switches to a different charge site without closing the popup.
     * @param {SelectedChargeSiteState} state - The current state.
     * @param {PayloadAction<ChargeSite|undefined>} action - The action containing the new charge site.
     */
    switchChargeSite: (
      state: SelectedChargeSiteState,
      action: PayloadAction<ChargeSite | undefined>,
    ) => {
      state.site = action.payload;
      state.isClosing = false;
    },

    /**
     * Starts the process of closing the popup.
     * @param {SelectedChargeSiteState} state - The current state.
     */
    unselectChargeSite: (state) => {
      state.isClosing = true;
    },

    /**
     * Completes the process of closing the popup and clears the selected site.
     * @param {SelectedChargeSiteState} state - The current state.
     */
    finishClosingPopup: (state: SelectedChargeSiteState) => {
      state.site = undefined;
      state.isClosing = false;
    },
  },
});

export const {
  selectChargeSite,
  switchChargeSite,
  unselectChargeSite,
  finishClosingPopup,
} = selectedChargeSiteSlice.actions;

/**
 * Selector to get the currently selected charge site from the Redux store.
 * @param {RootState} state - The root state of the Redux store.
 * @returns {ChargeSite|undefined} The currently selected charge site.
 */
export const selectSelectedChargeSite = (
  state: RootState,
): ChargeSite | undefined => state.selectedChargeSite.site;

/**
 * Selector to check if the popup is in the process of closing.
 * @param {RootState} state - The root state of the Redux store.
 * @returns {boolean} Whether the popup is closing.
 */
export const selectIsClosing = (state: RootState): boolean =>
  state.selectedChargeSite.isClosing;

export default selectedChargeSiteSlice.reducer;

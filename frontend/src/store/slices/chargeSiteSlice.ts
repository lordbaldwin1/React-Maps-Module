/**
 * Redux slice for managing charge site data and related state.
 * @module
 */

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ChargeSite } from "../../types/ChargeSite";
import { fetchChargeSites } from "../../services/chargeSiteService";
import { RootState } from "../rootReducer";
import { ChargeSiteParamState } from "./chargeSiteParamSlice";

/**
 * Represents the state shape for the charge sites slice.
 */
export interface ChargeSiteState {
  /** Array of charge site objects */
  chargeSites: ChargeSite[];
  /** Current loading state */
  loading: "idle" | "pending" | "succeeded" | "failed";
  /** Error message, if any */
  error: string | null;
}

/**
 * Initial state for the charge sites slice.
 */
const initialState: ChargeSiteState = {
  chargeSites: [],
  loading: "idle",
  error: null,
};

/**
 * Async thunk for fetching charge sites.
 *
 * @remarks
 * This thunk takes an object with `region` and `filters` properties,
 * which are used to determine which charge sites to fetch.
 */
export const fetchChargeSitesThunk = createAsyncThunk<
  ChargeSite[],
  ChargeSiteParamState,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  "chargeSites/fetchChargeSites",
  async (chargeSiteParams, { rejectWithValue }) => {
    try {
      return await fetchChargeSites(chargeSiteParams);
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || "Failed to fetch charge sites",
      );
    }
  },
);

/**
 * Redux slice for charge sites.
 */
const chargeSiteSlice = createSlice({
  name: "chargeSites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChargeSitesThunk.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchChargeSitesThunk.fulfilled,
        (state, action: PayloadAction<ChargeSite[]>) => {
          state.loading = "succeeded";
          state.chargeSites = action.payload;
          state.error = null;
        },
      )
      .addCase(fetchChargeSitesThunk.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Failed to fetch charge sites";
      });
  },
});

/**
 * Selector to get charge sites from the Redux store.
 */
export default chargeSiteSlice.reducer;

/**
 * Selector to get the loading state for charge sites.
 */
export const selectChargeSites = (state: RootState) =>
  state.chargeSites.chargeSites;

/**
 * Selector to get the loading state for charge sites.
 */
export const selectChargeSitesLoading = (state: RootState) =>
  state.chargeSites.loading;

/**
 * Selector to get any error related to charge sites.
 */
export const selectChargeSitesError = (state: RootState) =>
  state.chargeSites.error;

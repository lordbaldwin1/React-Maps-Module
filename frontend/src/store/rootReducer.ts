/**
 * Combines all reducer slices into the root reducer for the Redux store.
 * @module
 */

import { combineReducers } from "@reduxjs/toolkit";
import chargeSiteReducer, { ChargeSiteState } from "./slices/chargeSiteSlice";
import themeReducer, { ThemeState } from "./slices/themeSlice";
import navigationReducer, { NavigationState } from "./slices/navigationSlice";
import chargeSiteParamReducer, {
  ChargeSiteParamState,
} from "./slices/chargeSiteParamSlice";
import selectedChargeSiteReducer, {
  SelectedChargeSiteState,
} from "./slices/selectedChargeSiteSlice";

/**
 * The root reducer for the application's Redux store.
 *
 * @remarks
 * Combines individual slice reducers into a single reducer function.
 * This is used to create the store in index.ts.
 */
const rootReducer = combineReducers({
  chargeSites: chargeSiteReducer,
  chargeSiteParams: chargeSiteParamReducer,
  selectedChargeSite: selectedChargeSiteReducer,
  theme: themeReducer,
  navigation: navigationReducer,
});

/**
 * Represents the shape of the entire Redux store state.
 *
 * @property chargeSites - State related to charge sites
 * @property theme - State related to application theme
 * @property filters - State related to charge site filters
 * @property popup - State related to popup visibility
 */
export interface RootState {
  chargeSites: ChargeSiteState;
  chargeSiteParams: ChargeSiteParamState;
  selectedChargeSite: SelectedChargeSiteState;
  theme: ThemeState;
  navigation: NavigationState;
}

export default rootReducer;

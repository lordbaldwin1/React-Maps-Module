import { describe, it, expect, beforeEach } from "vitest";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import chargeSiteReducer from "../../../src/store/slices/chargeSiteSlice";
import { RootState } from "../../../src/store/rootReducer";
import themeReducer from "../../../src/store/slices/themeSlice";
import navigationReducer from "../../../src/store/slices/navigationSlice";
import chargeSiteParamReducer, {
  initialCenter,
  initialZoom,
  QUERY_DISTANCE_SCALE,
  updateFilters,
  updateRegion,
} from "../../../src/store/slices/chargeSiteParamSlice";
import selectedChargeSiteReducer from "../../../src/store/slices/selectedChargeSiteSlice";
import { AppDispatch } from "../../../src/store";

const createTestStore = (
  preloadedState?: Partial<RootState>,
): EnhancedStore<RootState> => {
  return configureStore({
    reducer: {
      chargeSites: chargeSiteReducer,
      chargeSiteParams: chargeSiteParamReducer,
      selectedChargeSite: selectedChargeSiteReducer,
      theme: themeReducer,
      navigation: navigationReducer,
    },
    preloadedState: preloadedState as RootState,
  });
};

describe("chargeSiteParamSlice", () => {
  let store: EnhancedStore<RootState>;
  let dispatch: AppDispatch;

  beforeEach(() => {
    store = createTestStore();
    dispatch = store.dispatch as AppDispatch;
  });

  it("should have initial state", () => {
    const state = store.getState().chargeSiteParams;
    expect(state).toEqual({
      region: {
        latitude: initialCenter.lat,
        longitude: initialCenter.lng,
        latitudeDelta:
          (180 * (window.innerWidth / window.innerHeight)) /
          Math.pow(2, initialZoom - 1),
        longitudeDelta: (180 * 1) / Math.pow(2, initialZoom - 1),
      },
      filters: {
        obfuscatedFilter: null,
        reservedFilter: null,
        privateFilter: null,
      },
    });
  });

  it("should update filters, and not update region, when updateFilters is called", () => {
    const beforeState = store.getState().chargeSiteParams;
    const beforeRegion = beforeState.region;

    const mockFilter = {
      obfuscatedFilter: false,
      reservedFilter: false,
      privateFilter: false,
    };

    dispatch(updateFilters(mockFilter));

    const afterState = store.getState().chargeSiteParams;
    expect(afterState.region).toBe(beforeRegion);
    expect(afterState.filters).toBe(mockFilter);
  });

  it("should update region, and not update filters, when updateRegion is called", () => {
    const beforeState = store.getState().chargeSiteParams;
    const beforeFilters = beforeState.filters;

    // NOTE: This needs to update charge sites.
    // This may fail if the initial region is too big.
    const mockRegionLarge = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 180,
      longitudeDelta: 180,
    };

    dispatch(updateRegion(mockRegionLarge));

    const afterState = store.getState().chargeSiteParams;
    expect(afterState.region).toBe(mockRegionLarge);
    expect(afterState.filters).toBe(beforeFilters);
  });

  it("should not update region when the new region is inside the old region * QUERY_DISTANCE_SCALE", () => {
    const beforeState = store.getState().chargeSiteParams;
    const beforeRegion = beforeState.region;

    dispatch(
      updateRegion({
        ...beforeRegion,
        latitudeDelta: beforeRegion.latitudeDelta * QUERY_DISTANCE_SCALE,
        longitudeDelta: beforeRegion.longitudeDelta * QUERY_DISTANCE_SCALE,
      }),
    );

    const afterState = store.getState().chargeSiteParams;
    expect(afterState.region).toBe(beforeRegion);
  });

  it("should update region when the new region is outside the old region * QUERY_DISTANCE_SCALE", () => {
    const beforeState = store.getState().chargeSiteParams;
    const beforeRegion = beforeState.region;

    const afterRegion = {
      ...beforeRegion,
      latitudeDelta:
        beforeRegion.latitudeDelta * (QUERY_DISTANCE_SCALE + 0.001),
      longitudeDelta:
        beforeRegion.longitudeDelta * (QUERY_DISTANCE_SCALE + 0.001),
    };

    dispatch(updateRegion(afterRegion));

    const afterState = store.getState().chargeSiteParams;
    expect(afterState.region).toBe(afterRegion);
  });
});

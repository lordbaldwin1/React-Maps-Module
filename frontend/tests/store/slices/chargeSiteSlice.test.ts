import { describe, it, expect, beforeEach, vi } from "vitest";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import chargeSiteReducer, {
  fetchChargeSitesThunk,
  selectChargeSites,
  selectChargeSitesLoading,
  selectChargeSitesError,
} from "../../../src/store/slices/chargeSiteSlice";
import * as chargeSiteServiceModule from "../../../src/services/chargeSiteService";
import { RootState } from "../../../src/store/rootReducer";
import themeReducer from "../../../src/store/slices/themeSlice";
import navigationReducer from "../../../src/store/slices/navigationSlice";
import chargeSiteParamReducer from "../../../src/store/slices/chargeSiteParamSlice";
import selectedChargeSiteReducer from "../../../src/store/slices/selectedChargeSiteSlice";
import { AppDispatch } from "../../../src/store";

vi.mock("../../../src/services/chargeSiteService", () => ({
  fetchChargeSites: vi.fn(),
}));

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

describe("chargeSiteSlice", () => {
  let store: EnhancedStore<RootState>;
  let dispatch: AppDispatch;
  const mockFilter = {
    obfuscatedFilter: false,
    reservedFilter: false,
    privateFilter: false,
  };

  beforeEach(() => {
    store = createTestStore();
    dispatch = store.dispatch as AppDispatch;
  });

  it("should have initial state", () => {
    const state = store.getState().chargeSites;
    expect(state).toEqual({
      chargeSites: [],
      loading: "idle",
      error: null,
    });
  });

  it("should set loading state to pending when fetchChargeSitesThunk is pending", async () => {
    vi.mocked(chargeSiteServiceModule.fetchChargeSites).mockImplementation(
      () => new Promise(() => {}),
    );

    dispatch(
      fetchChargeSitesThunk({
        region: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
        },
        filters: mockFilter,
      }),
    );

    const state = store.getState().chargeSites;
    expect(state.loading).toBe("pending");
  });

  it("should update state with charge sites when fetchChargeSitesThunk is fulfilled", async () => {
    const mockChargeSites = [
      {
        id: 1,
        userId: 1,
        latitude: 45.5,
        longitude: -122.6,
        obfuscatedStatus: false,
        reservedStatus: false,
        privateStatus: false,
        rateOfCharge: 50,
      },
    ];
    vi.mocked(chargeSiteServiceModule.fetchChargeSites).mockResolvedValue(
      mockChargeSites,
    );

    await dispatch(
      fetchChargeSitesThunk({
        region: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
        },
        filters: mockFilter,
      }),
    );

    const state = store.getState().chargeSites;
    expect(state.loading).toBe("succeeded");
    expect(state.chargeSites).toEqual(mockChargeSites);
    expect(state.error).toBeNull();
  });

  it("should set error state when fetchChargeSitesThunk is rejected", async () => {
    const errorMessage = "Failed to fetch charge sites";
    vi.mocked(chargeSiteServiceModule.fetchChargeSites).mockRejectedValue(
      new Error(errorMessage),
    );

    await dispatch(
      fetchChargeSitesThunk({
        region: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
        },
        filters: mockFilter,
      }),
    );

    const state = store.getState().chargeSites;
    expect(state.loading).toBe("failed");
    expect(state.error).toBe(errorMessage);
  });

  it("should return the correct charge sites from the selector", () => {
    const mockChargeSites = [
      {
        id: 1,
        userId: 1,
        latitude: 45.5,
        longitude: -122.6,
        obfuscatedStatus: false,
        reservedStatus: false,
        privateStatus: false,
        rateOfCharge: 50,
      },
    ];
    store = createTestStore({
      chargeSites: {
        chargeSites: mockChargeSites,
        loading: "succeeded",
        error: null,
      },
    } as Partial<RootState>);

    const state = store.getState();
    expect(selectChargeSites(state)).toEqual(mockChargeSites);
  });

  it("should return the correct loading state from the selector", () => {
    store = createTestStore({
      chargeSites: {
        chargeSites: [],
        loading: "pending",
        error: null,
      },
    } as Partial<RootState>);

    const state = store.getState();
    expect(selectChargeSitesLoading(state)).toBe("pending");
  });

  it("should return the correct error state from the selector", () => {
    const errorMessage = "Test error";
    store = createTestStore({
      chargeSites: {
        chargeSites: [],
        loading: "failed",
        error: errorMessage,
      },
    } as Partial<RootState>);

    const state = store.getState();
    expect(selectChargeSitesError(state)).toBe(errorMessage);
  });
});

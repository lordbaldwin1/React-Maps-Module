import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { Region } from "../../types/ChargeSite";
import { Filters } from "../../types/Filters";
import { LatLngLiteral } from "leaflet";

export type ChargeSiteParamState = {
  region: Region;
  filters: Filters;
};

/**
 * Initial latitude and longitude of the map's center.
 */
export const initialCenter: LatLngLiteral = {
  lat: 45.54698979840522,
  lng: -122.66310214492715,
};

/**
 * Initial zoom to render the map at.
 */
export const initialZoom = 12;

/**
 * Calculates a rough estimate for the initial delta latitude and longitude.
 * @param aspect A multiplier to adjust the delta, based on the width and height of the window.
 * @returns Initial delta latitude or longitude, depending on the aspect.
 */
const calculateDelta = (aspect: number) => {
  return (180 * aspect) / Math.pow(2, initialZoom - 1);
};

const initialState: ChargeSiteParamState = {
  region: {
    latitude: initialCenter.lat,
    longitude: initialCenter.lng,
    latitudeDelta: calculateDelta(window.innerWidth / window.innerHeight),
    longitudeDelta: calculateDelta(1),
  },
  filters: {
    obfuscatedFilter: null,
    reservedFilter: null,
    privateFilter: null,
  },
};

/**
 * How many times farther than the visible region that charge sites should be fetched.
 * Keep this identical to ChargeSiteService.java's copy.
 */
export const QUERY_DISTANCE_SCALE = 2;

const calculateMaxDistance = (
  latitudeDelta: number,
  longitudeDelta: number,
) => {
  return QUERY_DISTANCE_SCALE * Math.max(latitudeDelta, longitudeDelta);
};

/**
 * Checks if the new region should be fetched.
 * More specifically, if the new region is outside the
 * @param oldRegion The current region fetched.
 * @param newRegion The new region to potentially be fetched.
 * @returns Whether the new region should be fetched.
 */
const shouldRequery = (oldRegion: Region, newRegion: Region) => {
  const oldMaxDistance = calculateMaxDistance(
    oldRegion.latitudeDelta,
    oldRegion.longitudeDelta,
  );

  const oldWest = oldRegion.latitude - oldMaxDistance;
  const oldEast = oldRegion.latitude + oldMaxDistance;
  const oldSouth = oldRegion.longitude - oldMaxDistance;
  const oldNorth = oldRegion.longitude + oldMaxDistance;

  const newWest = newRegion.latitude - newRegion.latitudeDelta;
  const newEast = newRegion.latitude + newRegion.latitudeDelta;
  const newSouth = newRegion.longitude - newRegion.longitudeDelta;
  const newNorth = newRegion.longitude + newRegion.longitudeDelta;

  // FIXME(Bruce):
  //  This distance calculation does not take into account
  //  the wrapping coordinates that ChargeSite.java's generateObfuscation does.
  return (
    newWest < oldWest ||
    newEast > oldEast ||
    newSouth < oldSouth ||
    newNorth > oldNorth
  );
};

const chargeSiteParamSlice = createSlice({
  name: "chargeSiteParams",
  initialState,
  reducers: {
    updateRegion: (state, action: PayloadAction<Region>) => {
      if (shouldRequery(state.region, action.payload)) {
        state.region = action.payload;
      }
    },
    updateFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
    },
  },
});

export const { updateRegion, updateFilters } = chargeSiteParamSlice.actions;

export const selectChargeSiteParams = (state: RootState) =>
  state.chargeSiteParams;
export const selectRegion = (state: RootState) => state.chargeSiteParams.region;
export const selectFilters = (state: RootState) =>
  state.chargeSiteParams.filters;

export default chargeSiteParamSlice.reducer;

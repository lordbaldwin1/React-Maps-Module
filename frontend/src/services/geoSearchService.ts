/**
 * Service for managing geolocation search functionality.
 * @module
 */

import { GeoSearchControl, HereProvider } from "leaflet-geosearch";
import { Map, LatLngBounds, LatLngTuple, LeafletEvent } from "leaflet";

/**
 * Represents a basic search result with a label.
 */
interface GeoSearchResult {
  /** Human-readable label for the search result */
  label: string;
}

/**
 * Type alias for the GeoSearchControl return type.
 * This allows for easier type annotations when working with the search control.
 */
type SearchControl = ReturnType<typeof GeoSearchControl>;

/**
 * Represents a detailed geosearch result.
 * Extends the basic GeoSearchResult with additional properties.
 */
interface GeoSearchResult {
  /** X-coordinate (typically longitude) of the result */
  x: number;
  /** Y-coordinate (typically latitude) of the result */
  y: number;
  /** Human-readable label for the search result */
  label: string;
  /** Optional bounding box for the result, if available */
  bounds?: LatLngTuple[];
  /** Raw data returned by the geocoding service */
  raw: unknown;
}

/**
 * Represents a Leaflet event that includes geosearch result information.
 * Extends the standard LeafletEvent with a location property.
 */
interface GeoSearchLeafletEvent extends LeafletEvent {
  /** The geosearch result associated with this event */
  location: GeoSearchResult;
}

/**
 * Initializes a GeoSearch control with the HERE provider.
 *
 * @param {string} apiKey - The API key for the HERE geocoding service.
 * @returns {SearchControl} An instance of GeoSearchControl.
 */
export const initializeSearchControl = (apiKey: string): SearchControl => {
  const provider = new HereProvider({
    params: {
      apiKey: apiKey,
      at: "45.5152,122.6784",
    },
  });

  const searchControl = GeoSearchControl({
    provider: provider,
    position: "topright",
    style: "bar",
    searchLabel: "Enter address",
    autoComplete: true,
    autoCompleteDelay: 250,
    showMarker: false,
    showPopup: false,
    popupFormat: (data: { result: GeoSearchResult }) => {
      return `<div class="custom-popup">${data.result.label}</div>`; // Customize HTML content
    },
    maxMarkers: 1,
    retainZoomLevel: false,
    animateZoom: true,
    autoClose: false,
    keepResult: true,
  });

  return searchControl;
};

/**
 * Adds a search control to the map and sets up event listeners.
 *
 * @param {Map} map - The Leaflet map instance.
 * @param {SearchControl} searchControl - The search control to add to the map.
 */
export const addSearchControl = (map: Map, searchControl: SearchControl) => {
  map.addControl(searchControl);

  // Add event listener for geosearch/showlocation
  map.on("geosearch/showlocation", (event: LeafletEvent) => {
    const geoSearchEvent = event as GeoSearchLeafletEvent;
    const { location } = geoSearchEvent;

    if (location.bounds && Array.isArray(location.bounds)) {
      // If bounds are available, fit the map to these bounds
      const bounds = new LatLngBounds(location.bounds);
      map.fitBounds(bounds);
    } else if (location.x !== undefined && location.y !== undefined) {
      // If no bounds but coordinates are available, center on the point
      map.setView([location.y, location.x], 15);
    }
  });
};

/**
 * Removes the search control from the map and cleans up event listeners.
 *
 * @param {Map} map - The Leaflet map instance.
 * @param {SearchControl} searchControl - The search control to remove from the map.
 */
export const removeSearchControl = (map: Map, searchControl: SearchControl) => {
  map.removeControl(searchControl);

  // Remove the event listener
  map.off("geosearch/showlocation");
};

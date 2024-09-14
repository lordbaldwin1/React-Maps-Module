/**
 * Search bar component for geolocation search functionality.
 * @module
 */

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { unselectChargeSite } from "../../store/slices/selectedChargeSiteSlice";
import { useMap } from "react-leaflet";
import {
  initializeSearchControl,
  addSearchControl,
  removeSearchControl,
} from "../../services/geoSearchService.ts";
import "leaflet-geosearch/dist/geosearch.css";
import "../../styles/SearchBar.css";

/**
 * SearchBar component that adds a geolocation search control to the map.
 *
 * This component integrates the leaflet-geosearch library with the map to provide
 * address search functionality. It uses the HERE provider for geocoding services.
 *
 * @returns This component doesn't render any visible elements directly.
 *                 Instead, it adds a search control to the map.
 *
 * @remarks
 * The component uses the useEffect hook to set up and tear down the search control:
 * - On mount, it initializes the search control with the HERE API key.
 * - It then adds the search control to the map.
 * - On unmount, it removes the search control from the map to prevent memory leaks.
 *
 * The search control appears as a search bar on the map, allowing users to enter
 * addresses or place names. When a location is selected, the map centers on that location.
 *
 * @example
 * // To use this component, simply include it as a child of the MapContainer component:
 * <MapContainer>
 *   <SearchBar />
 *   //{ Other map components }
 * </MapContainer>
 */
function SearchBar(): null {
  const map = useMap();
  const apiKey = import.meta.env.VITE_HERE_API_KEY;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!map || !apiKey) return;

    const searchControl = initializeSearchControl(apiKey);
    addSearchControl(map, searchControl);

    // Function to handle the search input interaction
    const handleSearchInputInteraction = () => {
      dispatch(unselectChargeSite());
    };

    // Add event listeners
    const searchInput = document.querySelector(
      ".leaflet-control-geosearch form input",
    );
    if (searchInput) {
      searchInput.addEventListener("click", handleSearchInputInteraction);
    }

    return () => {
      removeSearchControl(map, searchControl);
      const searchInput = document.querySelector(
        ".leaflet-control-geosearch form input",
      );
      // Remove event listeners
      if (searchInput) {
        searchInput.removeEventListener("click", handleSearchInputInteraction);
      }
    };
  }, [map, apiKey, dispatch]);

  return null;
}

export default SearchBar;

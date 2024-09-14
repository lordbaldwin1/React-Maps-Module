/**
 * MapComponent.tsx
 * Main component for rendering the interactive map interface.
 * @module MapComponent
 */

import React from "react";
import { MapContainer, ZoomControl, useMap, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import { useSelector } from "react-redux";
import {
  selectChargeSites,
  selectChargeSitesError,
} from "../../store/slices/chargeSiteSlice";
import { CustomMarker } from "./CustomMarker";
import { getMarkerColor } from "../../utils/mapUtils";
import SearchBar from "./SearchBar";
import ChargeSitePopup from "./ChargeSitePopup";
import FiltersSelect from "./Filters";
import "../../styles/MapComponent.css";
import mapStyles from "../../styles/mapStyle.json";
import { useAppDispatch } from "../../store/hooks";
import {
  updateRegion,
  initialCenter,
  initialZoom,
} from "../../store/slices/chargeSiteParamSlice";
import {
  selectSelectedChargeSite,
  unselectChargeSite,
} from "../../store/slices/selectedChargeSiteSlice";
import { ChargeSite } from "../../types/ChargeSite";

/**
 * Google Maps API key retrieved from environment variables
 */
const apiKey: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export interface MapComponentProps {
  isDisabled: boolean;
}

/**
 * MapComponent is the core of the application, integrating various features:
 * - Displays a Google Maps layer using react-leaflet-google-layer
 * - Renders charge sites as markers or clusters
 * - Provides search functionality
 * - Includes zoom controls and attribution
 * - Incorporates filter selection for charge sites
 *
 * @returns A functional component rendering the map interface
 *
 * @example
 * ```tsx
 * <MapComponent />
 * ```
 *
 * @remarks
 * - Requires a valid Google Maps API key set in the environment variable VITE_GOOGLE_MAPS_API_KEY
 * - Depends on Redux store for accessing charge site data and error states
 * - Uses marker clustering to improve performance with a large number of charge sites
 * - Keyboard navigation for zoom controls is provided by default Leaflet functionality
 */
const MapComponent: React.FC<MapComponentProps> = ({ isDisabled }) => {
  const dispatch = useAppDispatch();
  /**
   * @constant chargeSites
   * Array of charge sites retrieved from the Redux store
   * @private
   */
  const chargeSites: ChargeSite[] = useSelector(selectChargeSites);
  /**
   * @constant error
   * Error message if charge site fetch fails, null otherwise
   * @private
   */
  const error: string | null = useSelector(selectChargeSitesError);
  /**
   * @constant selectedChargeSite
   * Currently selected charge site, undefined otherwise
   * @private
   */
  const selectedChargeSite = useSelector(selectSelectedChargeSite);

  if (error) {
    console.log(error);
  }

  // This is where global map events are handled.
  // See LeafletEventHandlerFnMap for a comprehensive list.
  const EventHooks = () => {
    const map = useMap();

    // Function to close the popup
    const handleClosePopup = () => {
      dispatch(unselectChargeSite());
    };

    // When dragging and zooming are finished, requery the backend.
    const handleUpdateRegion = () => {
      if (isDisabled) return; // Prevent updates when disabled
      const bounds = map.getBounds();
      const center = bounds.getCenter();
      dispatch(
        updateRegion({
          latitude: center.lat,
          longitude: center.lng,
          latitudeDelta: Math.abs(bounds.getEast() - bounds.getWest()) / 2,
          longitudeDelta: Math.abs(bounds.getSouth() - bounds.getNorth()) / 2,
        }),
      );
      handleClosePopup();
    };

    useMapEvents({
      click: () => {
        dispatch(unselectChargeSite());
      },
      moveend: handleUpdateRegion,
      zoomend: handleUpdateRegion,
    });

    React.useEffect(() => {
      const mapFeatures = [
        "dragging",
        "touchZoom",
        "doubleClickZoom",
        "scrollWheelZoom",
        "boxZoom",
        "keyboard",
      ] as const;

      const action = isDisabled ? "disable" : "enable";

      mapFeatures.forEach((feature) => {
        map[feature][action]();
      });

      if (map.tap) map.tap[action]();
    }, [map]);
    return null;
  };

  return (
    <div style={{ position: "relative" }}>
      <FiltersSelect />
      {selectedChargeSite && <ChargeSitePopup />}
      <MapContainer
        zoom={initialZoom}
        center={initialCenter}
        zoomControl={false} // Removes default, top left, zoom control.
        attributionControl={false}
      >
        <EventHooks />
        <SearchBar />
        <ZoomControl position="topleft" />
        <ReactLeafletGoogleLayer
          apiKey={apiKey}
          type={"roadmap"}
          styles={mapStyles}
        />
        <MarkerClusterGroup>
          {chargeSites.map((site) => (
            <CustomMarker
              key={`${site.id}`}
              chargeSiteID={site.id}
              obfuscated={site.obfuscatedStatus}
              position={{ lat: site.latitude, lng: site.longitude }}
              color={getMarkerColor(site.privateStatus, site.reservedStatus)}
            />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default MapComponent;

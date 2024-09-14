/**
 * Custom marker component for rendering markers on the map.
 * @module
 */

import React from "react";
import L from "leaflet";
import { CustomMarkerProps } from "../../../types/CustomMarker";
import { ObfuscatedMarker } from "./ObfuscatedMarker";
import { UnobfuscatedMarker } from "./UnobfuscatedMarker";
import {
  selectChargeSite,
  switchChargeSite,
  unselectChargeSite,
  selectSelectedChargeSite,
} from "../../../store/slices/selectedChargeSiteSlice";
import { useAppDispatch } from "../../../store/hooks";
import { useSelector } from "react-redux";
import { selectChargeSites } from "../../../store/slices/chargeSiteSlice";

/**
 * CustomMarker component that renders either an ObfuscatedMarker or UnobfuscatedMarker, based on the obfuscated prop.
 *
 * @param {CustomMarkerProps} props - The props for the CustomMarker component.
 * @returns {React.ReactElement} A React element representing the custom marker.
 */
export const CustomMarker: React.FC<CustomMarkerProps> = ({
  obfuscated,
  chargeSiteID,
  position,
  color,
}) => {
  const dispatch = useAppDispatch();
  const chargeSites = useSelector(selectChargeSites);
  const selectedChargeSite = useSelector(selectSelectedChargeSite);

  /**
   * Handles the click event on the marker.
   * Selects the charge site corresponding to this marker.
   */
  const handleMarkerClick = (e: L.LeafletMouseEvent) => {
    // Don't send the event to the map; just the marker needs to handle it.
    L.DomEvent.stopPropagation(e);

    const site = chargeSites.find((site) => site.id == chargeSiteID);

    if (selectedChargeSite) {
      if (selectedChargeSite?.id === chargeSiteID) {
        dispatch(unselectChargeSite());
      } else {
        dispatch(switchChargeSite(site));
      }
    } else {
      dispatch(selectChargeSite(site));
    }
  };

  const selected = chargeSiteID === selectedChargeSite?.id;

  const MarkerComponent = obfuscated ? ObfuscatedMarker : UnobfuscatedMarker;

  return (
    <MarkerComponent
      selected={selected}
      position={position}
      color={color}
      eventHandlers={{
        click: handleMarkerClick,
      }}
    />
  );
};

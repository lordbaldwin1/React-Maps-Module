/**
 * Obfuscated marker component for rendering obfuscated locations on the map.
 * @module
 */

import React from "react";
import { CircleMarker } from "react-leaflet";
import { ObfuscatedMarkerProps } from "../../../types/CustomMarker";

/**
 * ObfuscatedMarker component that renders a circular area to represent an obfuscated location.
 *
 * @param {ObfuscatedMarkerProps} props - The props for the ObfuscatedMarker component.
 * @returns {React.ReactElement} A React element representing the obfuscated marker.
 */
export const ObfuscatedMarker: React.FC<ObfuscatedMarkerProps> = ({
  selected,
  position,
  color,
  eventHandlers,
}) => {
  const scale = selected ? 1.5 : 1;
  const radius = 20 * scale;

  return (
    <CircleMarker
      center={position}
      radius={radius}
      pathOptions={{ color }}
      eventHandlers={eventHandlers}
    />
  );
};

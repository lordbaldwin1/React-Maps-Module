/**
 * Non-obfuscated marker component for rendering precise locations on the map.
 * @module
 */

import React from "react";
import { renderToString } from "react-dom/server";
import * as L from "leaflet";
import { Marker } from "react-leaflet";
import { UnobfuscatedMarkerProps } from "../../../types/CustomMarker";

/**
 * NonObfuscatedMarker component that renders a precise location marker on the map.
 *
 * @param {UnobfuscatedMarkerProps} props - The props for the UnobfuscatedMarker component.
 * @returns {React.ReactElement} A React element representing the non-obfuscated marker.
 *
 * @remarks
 * This component uses a custom SVG icon for the marker.
 */
export const UnobfuscatedMarker: React.FC<UnobfuscatedMarkerProps> = ({
  selected,
  position,
  color,
  eventHandlers,
}) => {
  const scale = selected ? 1.5 : 1;
  const size = 40 * scale;

  /**
   * Creates a custom icon for the marker using an SVG.
   */
  const icon: L.DivIcon = L.divIcon({
    // TODO: This function's docs say its only supposed to be used on the server, and I don't know if this qualifies.
    html: renderToString(
      <svg height={size} width={size} viewBox={"0 0 28 28"}>
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
          fill={color}
        />
      </svg>,
    ),
    className: "marker-icon",
    // FIXME: This doesn't scale around the bottom center point.
    // I'd expected it to be half the width, but no, it's apparently not.
    iconAnchor: [17 * scale, 28 * scale],
  });

  return (
    <Marker position={position} icon={icon} eventHandlers={eventHandlers} />
  );
};

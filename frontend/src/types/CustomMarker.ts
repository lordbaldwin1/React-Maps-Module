/**
 * Defines types for custom map markers used in the application.
 * @module
 */

import type { LatLngExpression, LeafletEventHandlerFnMap } from "leaflet";

/**
 * Props for the CustomMarker component.
 */
export interface CustomMarkerProps {
  /** Determines if the marker should be obfuscated */
  obfuscated: boolean;
  /** The ID of the corresponding charge site */
  chargeSiteID: number;
  /** Geographic position of the marker */
  position: LatLngExpression;
  /** Color of the marker */
  color: string;
}

/**
 * Props for the UnobfuscatedMarker component.
 */
export interface UnobfuscatedMarkerProps {
  /** If the marker is selected */
  selected: boolean;
  /** Geographic position of the marker */
  position: LatLngExpression;
  /** Color of the marker */
  color: string;
  /** Optional event handlers for the marker */
  eventHandlers: LeafletEventHandlerFnMap;
}

/**
 * Props for the ObfuscatedMarker component.
 */
export interface ObfuscatedMarkerProps {
  /** If the marker is selected */
  selected: boolean;
  /** Geographic position of the marker */
  position: LatLngExpression;
  /** Color of the marker */
  color: string;
  /** Optional event handlers for the marker */
  eventHandlers: LeafletEventHandlerFnMap;
}

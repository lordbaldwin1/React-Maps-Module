/**
 * Utility functions for map-related operations.
 * @module
 */

import { pinColors } from "../styles/Colors";

/**
 * Determines the color of a marker based on its private and reserved status.
 *
 * @param {boolean} privateStatus - Whether the charge site is private.
 * @param {boolean} reservedStatus - Whether the charge site is reserved.
 * @returns {string} The color code for the marker.
 *
 * @example
 * const color = getMarkerColor(true, false);
 * // Returns the color for a private, unreserved charge site
 */
export const getMarkerColor = (
  privateStatus: boolean,
  reservedStatus: boolean,
): string => {
  const key = `${privateStatus ? "private" : "public"}${reservedStatus ? "Reserved" : "Available"}`;
  return pinColors[key as keyof typeof pinColors];
};

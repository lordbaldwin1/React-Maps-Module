/**
 * Types related to charge sites and geographical regions.
 * @module
 */

/**
 * Represents a charge site with its properties.
 */
export type ChargeSite = {
  /** Unique identifier for the charge site */
  id: number;
  /** Identifier of the user associated with the charge site */
  userId: number;
  /** Latitude coordinate of the charge site */
  latitude: number;
  /** Longitude coordinate of the charge site */
  longitude: number;
  /** Indicates if the charge site's location is obfuscated */
  obfuscatedStatus: boolean;
  /** Indicates if the charge site is currently reserved */
  reservedStatus: boolean;
  /** Indicates if the charge site is private */
  privateStatus: boolean;
  /** The rate of charge provided by the charge site */
  rateOfCharge: number;
};

/**
 * Represents a geographical region on the map.
 */
export type Region = {
  /** Latitude of the center of the region */
  latitude: number;
  /** Longitude of the center of the region */
  longitude: number;
  /** Change in latitude that spans the region */
  latitudeDelta: number;
  /** Change in longitude that spans the region */
  longitudeDelta: number;
};

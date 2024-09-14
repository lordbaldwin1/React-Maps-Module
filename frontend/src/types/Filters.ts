/**
 * Types for filter states used in the application.
 * @module
 */

/**
 * Represents the state of a single filter.
 * - `true`: The filter is active and includes items matching the filter.
 * - `false`: The filter is active and excludes items matching the filter.
 * - `null`: The filter is inactive.
 */
export type Filter = boolean | null;

/**
 * Represents the complete set of filters available in the application.
 */
export type Filters = {
  /** Filter for obfuscated/unobfuscated charge sites */
  obfuscatedFilter: Filter;
  /** Filter for reserved/available charge sites */
  reservedFilter: Filter;
  /** Filter for private/public charge sites */
  privateFilter: Filter;
};

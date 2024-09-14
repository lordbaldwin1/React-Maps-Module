/**
 * Service for fetching charge site data from the API.
 * @module
 */

import { ChargeSite } from "../types/ChargeSite";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";
import { ChargeSiteParamState } from "../store/slices/chargeSiteParamSlice";

const databaseIp = import.meta.env.VITE_DATABASE_IP;
const API_BASE_URL = `http://${databaseIp}:8081/api/chargesites`;

/**
 * Fetches charge sites based on the given region and filters.
 * @returns {Promise<ChargeSite[]>} A promise that resolves to an array of ChargeSite objects.
 * @throws {Error} If the network request fails or times out.
 *
 * @example
 * const params = {
 *   region: { latitude: 45, longitude: -122, latitudeDelta: 0.1, longitudeDelta: 0.1 },
 *   filters: { obfuscatedFilter: null, reservedFilter: true, privateFilter: false }
 * };
 * const chargeSites = await fetchChargeSites(params);
 */
export const fetchChargeSites = async ({
  region: { latitude, longitude, latitudeDelta, longitudeDelta },
  filters: { obfuscatedFilter, reservedFilter, privateFilter },
}: ChargeSiteParamState): Promise<ChargeSite[]> => {
  console.log("Fetching charge sites.");

  const response = await fetchWithTimeout(
    `${API_BASE_URL}` +
      `?lat=${latitude}` +
      `&lon=${longitude}` +
      `&latd=${latitudeDelta}` +
      `&lond=${longitudeDelta}` +
      (obfuscatedFilter !== null ? `&obf=${obfuscatedFilter}` : "") +
      (reservedFilter !== null ? `&res=${reservedFilter}` : "") +
      (privateFilter !== null ? `&pri=${privateFilter}` : ""),
  );
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  return await response.json();
};

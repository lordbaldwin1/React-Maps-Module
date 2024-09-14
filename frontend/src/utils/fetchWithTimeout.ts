/**
 * Utility function for fetching resources with a timeout.
 * @module
 */

/**
 * Performs a fetch request with a timeout.
 *
 * @param {string} url - The URL to fetch.
 * @param {RequestInit} [options={}] - Optional fetch options.
 * @param {number} [timeout=5000] - The timeout in milliseconds.
 * @returns {Promise<Response>} A promise that resolves with the fetch response.
 * @throws {Error} If the request times out or fails.
 *
 * @example
 * try {
 *   const response = await fetchWithTimeout('https://api.example.com/data', {}, 3000);
 *   const data = await response.json();
 * } catch (error) {
 *   console.error('Request failed or timed out:', error);
 * }
 */
export const fetchWithTimeout = (
  url: string,
  options: RequestInit = {},
  timeout: number = 5000,
): Promise<Response> => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout),
    ),
  ]);
};

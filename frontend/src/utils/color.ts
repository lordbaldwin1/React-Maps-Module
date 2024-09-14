/**
 * Utility functions for color manipulation.
 * @module
 */

/**
 * Darkens a given color by a specified amount.
 *
 * @param {string} color - The color to darken, in hexadecimal format (with or without leading #).
 * @param {number} amount - The amount to darken the color by, between 0 and 1.
 * @returns {string} The darkened color in hexadecimal format.
 *
 * @example
 * const darkerColor = darkenColor("#FF0000", 0.2);
 * // Returns a darker shade of red
 */

export const darkenColor = (color: string, amount: number) => {
  let usePound = false;
  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) - Math.round(255 * amount);
  let g = ((num >> 8) & 0x00ff) - Math.round(255 * amount);
  let b = (num & 0x0000ff) - Math.round(255 * amount);
  r = r < 0 ? 0 : r;
  g = g < 0 ? 0 : g;
  b = b < 0 ? 0 : b;
  return (
    (usePound ? "#" : "") +
    ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")
  );
};

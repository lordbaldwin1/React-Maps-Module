/**
Shared component for all overlays
@module
*/

import React from "react";
import "../../styles/Overlay.css";

/**
 * Props passed to the overlay component.
 */
export interface OverlayProps {
  // True when the overlay should be visible.
  isVisible: boolean;
}

/**
 * Creates a gray overlay over the entire screen.
 */
const Overlay: React.FC<OverlayProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return <div className="overlay" />;
};

export default Overlay;

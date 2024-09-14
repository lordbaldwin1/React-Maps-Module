/**
 * A React component that displays a popup with navigation options.
 * This component allows users to choose between different navigation apps
 * to get directions to a specific location.
 * @module NavigationOptionsPopup
 */

import React from "react";
import "../../styles/NavigationPopup.css";

/**
 * Props for the NavigationOptionsPopup component.
 */
export interface NavigationOptionsPopupProps {
  /** The latitude of the destination */
  latitude: number;
  /** The longitude of the destination */
  longitude: number;
  /** A function to be called when the popup should be closed */
  onClose: () => void;
}

/**
 * A component that displays a popup with navigation options for different map services.
 *
 * @param props - The component props
 * @returns The rendered NavigationOptionsPopup component
 */
const NavigationOptionsPopup: React.FC<NavigationOptionsPopupProps> = ({
  latitude,
  longitude,
  onClose,
}): React.ReactElement => {
  /**
   * Handles the click event for a navigation option.
   * Opens the selected navigation app in a new tab and closes the popup.
   *
   * @param url - The URL for the selected navigation app
   */
  const handleNavigationOptionClick = (url: string): void => {
    window.open(url, "_blank");
    onClose();
  };

  return (
    <div
      className="navigation-popup-content"
      onClick={(e): void => e.stopPropagation()}
    >
      <h3>Select Navigation App</h3>
      <button
        onClick={(): void =>
          handleNavigationOptionClick(
            `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
          )
        }
      >
        Google Maps
      </button>
      <button
        onClick={(): void =>
          handleNavigationOptionClick(
            `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`,
          )
        }
      >
        Waze
      </button>
      <button
        onClick={(): void =>
          handleNavigationOptionClick(
            `https://beta.maps.apple.com/?daddr=${latitude},${longitude}`,
          )
        }
      >
        Apple Maps
      </button>
      <button className="cancel-button" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
};

export default NavigationOptionsPopup;

/**
 * Popup component for displaying charge site information.
 * @module
 */

import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  unselectChargeSite,
  finishClosingPopup,
  selectIsClosing,
  selectSelectedChargeSite,
} from "../../store/slices/selectedChargeSiteSlice";
import "../../styles/ChargeSitePopup.css";
import NavigationOptionsPopup from "./NavigationOptionsPopup";
import "../../styles/NavigationPopup.css";
import {
  showNavigationPopup,
  hideNavigationPopup,
  selectNavigation,
} from "../../store/slices/navigationSlice";

const ChargeSitePopup: React.FC = () => {
  const dispatch = useDispatch();
  const popupRef = useRef<HTMLDivElement>(null);
  const isClosing = useSelector(selectIsClosing);
  const selectedSite = useSelector(selectSelectedChargeSite);
  const [isOpen, setIsOpen] = useState(false);
  const { showNavigationPopup: showNavigationPopupState } =
    useSelector(selectNavigation);

  useEffect(() => {
    if (selectedSite) {
      setIsOpen(true); // Trigger the opening animation
    } else if (isClosing) {
      setIsOpen(false); // Reset the opening state when closing
    }
  }, [selectedSite, isClosing]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !showNavigationPopup
      ) {
        dispatch(unselectChargeSite());
      }
    };

    if (selectedSite && !isClosing) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, selectedSite, isClosing]);

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        dispatch(finishClosingPopup());
      }, 300); // Match this to your CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isClosing, dispatch]);

  if (selectedSite === undefined && !isClosing) {
    return null;
  }

  /**
   * Handles the click event on the navigate button.
   * Shows navigation options popup.
   */
  const handleNavigateClick = () => {
    dispatch(showNavigationPopup());
  };

  /**
   * Handles the close event of the navigation popup.
   */
  const handleCloseNavigationPopup = () => {
    dispatch(hideNavigationPopup());
  };

  const popupClasses = [
    "popup",
    "container",
    isOpen ? "open" : "",
    isClosing ? "closing" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div className={popupClasses} ref={popupRef}>
        {selectedSite && (
          <>
            <h2>Ranger Station ID {selectedSite.id}</h2>
            <hr />
            {!selectedSite.obfuscatedStatus && (
              <div className="info">
                <h3>Address:</h3>
                <p style={{ color: "red" }}>{"[Placeholder]"}</p>
              </div>
            )}
            <div className="info">
              <h3>Private Status:</h3>
              <p>{selectedSite.privateStatus ? "Private" : "Public"}</p>
            </div>
            <div className="info">
              <h3>Reserved Status:</h3>
              <p>{selectedSite.reservedStatus ? "Reserved" : "Available"}</p>
            </div>
            {!selectedSite.obfuscatedStatus && (
              <div className="popup-button-container">
                <button className="show-route" onClick={handleNavigateClick}>
                  Show Route
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {showNavigationPopupState && selectedSite && (
        <NavigationOptionsPopup
          latitude={selectedSite.latitude}
          longitude={selectedSite.longitude}
          onClose={handleCloseNavigationPopup}
        />
      )}
    </>
  );
};

export default ChargeSitePopup;

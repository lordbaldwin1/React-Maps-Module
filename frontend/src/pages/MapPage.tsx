/**
 * This module defines the MapPage component, which serves as the primary interface for
 * displaying the map of charging sites on the application. It leverages the Redux state management
 * architecture to fetch and display charge sites based on user-specified filters.
 *
 * @module MapPage
 */
import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/hooks";
import {
  fetchChargeSitesThunk,
  selectChargeSitesError,
} from "../store/slices/chargeSiteSlice";
import { selectChargeSiteParams } from "../store/slices/chargeSiteParamSlice";
import MapComponent from "../components/map/MapComponent";
import Layout from "../components/layout/Layout";
import ErrorAlert from "../components/common/ErrorAlert";
import Overlay from "../components/common/Overlay";
import { selectNavigation } from "../store/slices/navigationSlice";

/**
 * The `MapPage` functional component uses React hooks for dispatching actions and accessing the Redux store.
 * It utilizes a `useEffect` hook to fetch charging sites based on the current region and selected filters
 * upon component mount or changes to the filters. The `MapComponent` is wrapped within a `Layout` component
 * to maintain a consistent layout structure.
 *
 * This component also handles error states, displaying an ErrorAlert component when there's an issue
 * fetching charge sites. It uses the Overlay component to create a dimming effect behind the error message.
 *
 * @returns The `MapPage` component renders the `MapComponent` within the `Layout`, along with error handling UI when necessary.
 */
const MapPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const chargeSiteParams = useSelector(selectChargeSiteParams);
  const error = useSelector(selectChargeSitesError);
  const navigation = useSelector(selectNavigation);
  /**
   * Dispatches the action to fetch charge sites based on the current parameters.
   */
  const fetchChargeSites = useCallback(() => {
    return dispatch(fetchChargeSitesThunk(chargeSiteParams));
  }, [dispatch, chargeSiteParams]);

  useEffect(() => {
    fetchChargeSites();
  }, [fetchChargeSites]);

  /**
   * Handles the retry action when there's an error fetching charge sites.
   */
  const handleRetry = useCallback(async () => {
    await fetchChargeSites();
  }, [fetchChargeSites]);

  return (
    <Layout>
      <div className="map-page-container">
        <MapComponent
          isDisabled={Boolean(error || navigation.showNavigationPopup)}
        />
        <Overlay isVisible={Boolean(error || navigation.showNavigationPopup)} />
        {error && (
          <ErrorAlert
            title="Error Fetching Charge Sites"
            description={error}
            onRetry={handleRetry}
          />
        )}
      </div>
    </Layout>
  );
};

export default MapPage;

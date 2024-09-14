/**
 * Main application component that sets up routing.
 * @module App
 */
import React from "react";
import { Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage";

/**
 * The root component of the application.
 * It sets up the main routing structure using React Router.
 *
 * @returns {JSX.Element} The rendered application with routing.
 */
export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MapPage />} />
    </Routes>
  );
};

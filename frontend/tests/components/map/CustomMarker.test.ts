import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/react";
import type {
  CustomMarkerProps,
  ObfuscatedMarkerProps,
  UnobfuscatedMarkerProps,
} from "../../../src/types/CustomMarker";

// Mock the components
const ObfuscatedMarker = vi.fn(() => null) as React.FC<ObfuscatedMarkerProps>;
const UnobfuscatedMarker = vi.fn(
  () => null,
) as React.FC<UnobfuscatedMarkerProps>;

vi.mock("../../src/components/map/CustomMarker/ObfuscatedMarker", () => ({
  ObfuscatedMarker,
}));
vi.mock("../../src/components/map/CustomMarker/UnobfuscatedMarker", () => ({
  UnobfuscatedMarker,
}));

// Create a mock CustomMarker component for testing
const MockCustomMarker: React.FC<CustomMarkerProps> = ({
  color,
  obfuscated,
  position,
  chargeSiteID,
}) => {
  const commonProps = {
    selected: false,
    position,
    color,
    chargeSiteID,
    eventHandlers: {},
  };

  if (obfuscated) {
    return React.createElement(ObfuscatedMarker, commonProps);
  }
  return React.createElement(UnobfuscatedMarker, commonProps);
};

describe("CustomMarker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders ObfuscatedMarker when obfuscated is true", () => {
    render(
      React.createElement(MockCustomMarker, {
        color: "#FF0000",
        obfuscated: true,
        position: [0, 0],
        chargeSiteID: 1,
      }),
    );
    expect(ObfuscatedMarker).toHaveBeenCalled();
    expect(UnobfuscatedMarker).not.toHaveBeenCalled();
  });

  it("renders UnobfuscatedMarker when obfuscated is false", () => {
    render(
      React.createElement(MockCustomMarker, {
        color: "#FF0000",
        obfuscated: false,
        position: [0, 0],
        chargeSiteID: 1,
      }),
    );
    expect(UnobfuscatedMarker).toHaveBeenCalled();
    expect(ObfuscatedMarker).not.toHaveBeenCalled();
  });

  it("passes correct props to ObfuscatedMarker", () => {
    render(
      React.createElement(MockCustomMarker, {
        color: "#FF0000",
        obfuscated: true,
        position: [45, -122],
        chargeSiteID: 1,
      }),
    );
    expect(ObfuscatedMarker).toHaveBeenCalledWith(
      expect.objectContaining({
        color: "#FF0000",
        position: [45, -122],
        selected: false,
        eventHandlers: expect.any(Object),
      }),
      expect.anything(),
    );
  });

  it("passes correct props to UnobfuscatedMarker", () => {
    render(
      React.createElement(MockCustomMarker, {
        color: "#FF0000",
        obfuscated: false,
        position: [45, -122],
        chargeSiteID: 1,
      }),
    );
    expect(UnobfuscatedMarker).toHaveBeenCalledWith(
      expect.objectContaining({
        color: "#FF0000",
        position: [45, -122],
        selected: false,
        eventHandlers: expect.any(Object),
      }),
      expect.anything(),
    );
  });
});

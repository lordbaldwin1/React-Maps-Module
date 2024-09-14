import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchChargeSites } from "../../src/services/chargeSiteService";
import * as fetchWithTimeoutModule from "../../src/utils/fetchWithTimeout";

vi.mock("../../src/utils/fetchWithTimeout", () => ({
  fetchWithTimeout: vi.fn(),
}));

describe("chargeSiteService", () => {
  const mockRegion = {
    latitude: 45.54698979840522,
    longitude: -122.66310214492715,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const mockFilter = {
    obfuscatedFilter: false,
    reservedFilter: false,
    privateFilter: false,
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch charge sites successfully", async () => {
    const mockChargeSites = [{ id: 1, latitude: 45.5, longitude: -122.6 }];
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockChargeSites),
    } as unknown as Response;

    vi.mocked(fetchWithTimeoutModule.fetchWithTimeout).mockResolvedValue(
      mockResponse,
    );

    const result = await fetchChargeSites({
      region: mockRegion,
      filters: mockFilter,
    });

    expect(result).toEqual(mockChargeSites);
    expect(fetchWithTimeoutModule.fetchWithTimeout).toHaveBeenCalledWith(
      expect.stringMatching(
        new RegExp(`http://.*/api/chargesites\\?lat=.*&lon=.*&latd=.*&lond=.*`),
      ),
    );
  });

  it("should handle API errors correctly", async () => {
    const mockErrorResponse = {
      ok: false,
      statusText: "Not Found",
    } as Response;

    vi.mocked(fetchWithTimeoutModule.fetchWithTimeout).mockResolvedValue(
      mockErrorResponse,
    );

    await expect(
      fetchChargeSites({ region: mockRegion, filters: mockFilter }),
    ).rejects.toThrow("Network response was not ok: Not Found");
  });

  it("should construct the correct URL with query parameters", async () => {
    vi.mocked(fetchWithTimeoutModule.fetchWithTimeout).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([]),
    } as unknown as Response);

    await fetchChargeSites({ region: mockRegion, filters: mockFilter });

    const expectedUrlPattern = new RegExp(
      `http://.*/api/chargesites\\?` +
        `lat=${mockRegion.latitude}&` +
        `lon=${mockRegion.longitude}&` +
        `latd=${mockRegion.latitudeDelta}&` +
        `lond=${mockRegion.longitudeDelta}`,
    );

    expect(fetchWithTimeoutModule.fetchWithTimeout).toHaveBeenCalledWith(
      expect.stringMatching(expectedUrlPattern),
    );
  });

  it("should fetch charge sites with all filters enabled", async () => {
    const allFiltersEnabled = {
      obfuscatedFilter: true,
      reservedFilter: true,
      privateFilter: true,
    };

    const mockChargeSites = [{ id: 2, latitude: 45.6, longitude: -122.7 }];
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockChargeSites),
    } as unknown as Response;

    vi.mocked(fetchWithTimeoutModule.fetchWithTimeout).mockResolvedValue(
      mockResponse,
    );

    const result = await fetchChargeSites({
      region: mockRegion,
      filters: allFiltersEnabled,
    });

    expect(result).toEqual(mockChargeSites);
    expect(fetchWithTimeoutModule.fetchWithTimeout).toHaveBeenCalledWith(
      expect.stringMatching(
        new RegExp(
          `http://.*/api/chargesites\\?lat=.*&lon=.*&latd=.*&lond=.*&obf=true&res=true&pri=true`,
        ),
      ),
    );
  });

  it("should fetch charge sites with only reserved filter enabled", async () => {
    const reservedFilterOnly = {
      obfuscatedFilter: false,
      reservedFilter: true,
      privateFilter: false,
    };

    const mockChargeSites = [{ id: 3, latitude: 45.7, longitude: -122.8 }];
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockChargeSites),
    } as unknown as Response;

    vi.mocked(fetchWithTimeoutModule.fetchWithTimeout).mockResolvedValue(
      mockResponse,
    );

    const result = await fetchChargeSites({
      region: mockRegion,
      filters: reservedFilterOnly,
    });

    expect(result).toEqual(mockChargeSites);
    expect(fetchWithTimeoutModule.fetchWithTimeout).toHaveBeenCalledWith(
      expect.stringMatching(
        new RegExp(
          `http://.*/api/chargesites\\?lat=.*&lon=.*&latd=.*&lond=.*&res=true`,
        ),
      ),
    );
  });

  it("should fetch charge sites with all filters in their false state", async () => {
    const allFalseFilters = {
      obfuscatedFilter: false,
      reservedFilter: false,
      privateFilter: false,
    };

    const mockChargeSites = [{ id: 6, latitude: 45.9, longitude: -122.1 }];
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockChargeSites),
    } as unknown as Response;

    vi.mocked(fetchWithTimeoutModule.fetchWithTimeout).mockResolvedValue(
      mockResponse,
    );

    const result = await fetchChargeSites({
      region: mockRegion,
      filters: allFalseFilters,
    });

    expect(result).toEqual(mockChargeSites);
    expect(fetchWithTimeoutModule.fetchWithTimeout).toHaveBeenCalledWith(
      expect.stringMatching(
        new RegExp(
          `http://.*/api/chargesites\\?lat=.*&lon=.*&latd=.*&lond=.*&obf=false&res=false&pri=false`,
        ),
      ),
    );
  });
});

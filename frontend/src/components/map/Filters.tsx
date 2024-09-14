/**
 * Filters component for selecting map display filters.
 * @module
 */

import Select, { MultiValue } from "react-select";
import { useAppDispatch } from "../../store/hooks";
import { updateFilters } from "../../store/slices/chargeSiteParamSlice";
import { Filters } from "../../types/Filters";
import "../../styles/Filters.css";
import { unselectChargeSite } from "../../store/slices/selectedChargeSiteSlice";

/**
 * Interface defining the structure of a filter option.
 */
interface FilterOption {
  /** The boolean value to set for the filter when selected */
  filterValue: boolean;
  /** The key of the filter in the Filters type */
  value: keyof Filters;
  /** The human-readable label for the filter option */
  label: string;
}

/**
 * Options for the filter select component.
 */
const filterOptions: FilterOption[] = [
  { filterValue: false, value: "obfuscatedFilter", label: "Unobfuscated" },
  { filterValue: true, value: "obfuscatedFilter", label: "Obfuscated" },
  { filterValue: false, value: "reservedFilter", label: "Available" },
  { filterValue: true, value: "reservedFilter", label: "Reserved" },
  { filterValue: false, value: "privateFilter", label: "Public" },
  { filterValue: true, value: "privateFilter", label: "Private" },
];

const FiltersSelect = () => {
  const dispatch = useAppDispatch();

  const handleFilterChange = (newOptions: MultiValue<FilterOption>) => {
    // Convert filter options to filter values.
    const newFilters: Filters = {
      obfuscatedFilter: null,
      reservedFilter: null,
      privateFilter: null,
    };

    for (const option of newOptions) {
      newFilters[option.value as keyof typeof newFilters] = option.filterValue;
    }

    // Store updated filter state.
    dispatch(updateFilters(newFilters));
  };

  // Function to close the popup
  const handleClosePopup = () => {
    dispatch(unselectChargeSite());
  };

  return (
    <div className="leaflet-bottom leaflet-left filter-outer">
      <div className="leaflet-control leaflet-bar">
        <Select
          className="filter-select"
          classNamePrefix="filter-select"
          isMulti
          menuPlacement="top"
          placeholder="Filters..."
          options={filterOptions}
          onChange={handleFilterChange}
          onFocus={handleClosePopup}
        />
      </div>
    </div>
  );
};

export default FiltersSelect;

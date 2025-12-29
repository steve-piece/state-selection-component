"use client";

import { US_STATES_ARRAY } from "@/lib/seed-data";
import { CustomSelect } from "./custom-select";

export interface StateSelectorProps {
  selectedState: string;
  onStateChange: (state: string) => void;
  disabled?: boolean;
}

/**
 * State Selector Dropdown
 *
 * Generic selector for choosing which state to view.
 */
export function StateSelector({
  selectedState,
  onStateChange,
  disabled = false,
}: StateSelectorProps) {
  const options = US_STATES_ARRAY.map((state) => ({
    value: state.code,
    label: state.name,
  }));

  return (
    <CustomSelect
      options={options}
      value={selectedState}
      onChange={onStateChange}
      placeholder="Select a state..."
      disabled={disabled}
    />
  );
}

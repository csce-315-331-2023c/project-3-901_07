import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

/**
 * MaterialUIPicker component creates a Date Picker using Material-UI components.
 * @param {Object} props - Props object for MaterialUIPicker component.
 * @param {string} props.picker_label - Label for the date picker.
 * @param {Date} props.value - Selected date value.
 * @param {Function} props.onChange - Function triggered on date selection change.
 * @returns {JSX.Element} MaterialUIPicker component JSX.
 */
export default function MaterialUIPicker({ picker_label, value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label={picker_label}
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

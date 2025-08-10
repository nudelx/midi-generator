import React from "react";
import PropTypes from "prop-types";
import { rhythms } from "../constants/musicConstants";

const RhythmSelector = ({ rhythm, onRhythmChange }) => {
  return (
    <div className="form-group mb-3">
      <label className="form-label">Rhythm</label>
      <select
        className="form-select"
        value={rhythm}
        onChange={(e) => onRhythmChange(e.target.value)}
      >
        {rhythms.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>
    </div>
  );
};

RhythmSelector.propTypes = {
  rhythm: PropTypes.string.isRequired,
  onRhythmChange: PropTypes.func.isRequired,
};

export { RhythmSelector };

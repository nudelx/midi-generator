import React from "react";
import PropTypes from "prop-types";
import { patterns } from "../constants/musicConstants";

const PatternSelector = ({ pattern, onPatternChange }) => {
  return (
    <div className="form-group mb-3">
      <label className="form-label">Pattern</label>
      <select
        className="form-select"
        value={pattern}
        onChange={(e) => onPatternChange(e.target.value)}
      >
        {patterns.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
    </div>
  );
};

PatternSelector.propTypes = {
  pattern: PropTypes.string.isRequired,
  onPatternChange: PropTypes.func.isRequired,
};

export { PatternSelector };

import React from "react";
import PropTypes from "prop-types";
import { scales } from "../constants/musicConstants";

const ScaleSelector = ({ scale, onScaleChange }) => {
  return (
    <div className="form-group mb-3">
      <label className="form-label">Scale</label>
      <select
        className="form-select"
        value={scale}
        onChange={(e) => onScaleChange(e.target.value)}
      >
        {Object.keys(scales).map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
};

ScaleSelector.propTypes = {
  scale: PropTypes.string.isRequired,
  onScaleChange: PropTypes.func.isRequired,
};

export { ScaleSelector };

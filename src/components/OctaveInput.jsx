import React from "react";
import PropTypes from "prop-types";
import { VALIDATION_RULES } from "../constants/musicConstants";

const OctaveInput = ({ octave, onOctaveChange }) => {
  const handleChange = (e) => {
    const value = parseInt(e.target.value) || 4;
    onOctaveChange(value);
  };

  return (
    <div className="form-group mb-3">
      <label className="form-label">Octave</label>
      <input
        type="number"
        className="form-control"
        value={octave}
        min={VALIDATION_RULES.OCTAVE.min}
        max={VALIDATION_RULES.OCTAVE.max}
        onChange={handleChange}
      />
      <small className="form-text text-muted">
        Valid range: {VALIDATION_RULES.OCTAVE.min}-{VALIDATION_RULES.OCTAVE.max}
      </small>
    </div>
  );
};

OctaveInput.propTypes = {
  octave: PropTypes.number.isRequired,
  onOctaveChange: PropTypes.func.isRequired,
};

export default OctaveInput;

import React from "react";
import PropTypes from "prop-types";
import { VALIDATION_RULES } from "../constants/musicConstants";

const TempoInput = ({ tempo, onTempoChange }) => {
  const handleChange = (e) => {
    const value = parseInt(e.target.value) || 120;
    onTempoChange(value);
  };

  return (
    <div className="form-group mb-3">
      <label className="form-label">Tempo (BPM)</label>
      <input
        type="number"
        className="form-control"
        value={tempo}
        min={VALIDATION_RULES.TEMPO.min}
        max={VALIDATION_RULES.TEMPO.max}
        onChange={handleChange}
      />
      <small className="form-text text-muted">
        Valid range: {VALIDATION_RULES.TEMPO.min}-{VALIDATION_RULES.TEMPO.max}{" "}
        BPM
      </small>
    </div>
  );
};

TempoInput.propTypes = {
  tempo: PropTypes.number.isRequired,
  onTempoChange: PropTypes.func.isRequired,
};

export default TempoInput;

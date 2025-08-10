import React from "react";
import PropTypes from "prop-types";

const GenerateButton = ({ onClick, disabled = false }) => {
  return (
    <div className="d-grid">
      <button
        className="btn btn-primary btn-lg mt-4"
        onClick={onClick}
        disabled={disabled}
      >
        🎵 Generate MIDI
      </button>
    </div>
  );
};

GenerateButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default GenerateButton;

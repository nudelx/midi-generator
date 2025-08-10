import React from "react";
import PropTypes from "prop-types";

const SuccessMessage = ({ scale, rootNote, pattern }) => {
  return (
    <div className="alert alert-success">
      <strong>🎵 MIDI Generated Successfully!</strong>
      <br />
      <small>
        Scale: {scale} | Root: {rootNote} | Pattern: {pattern}
      </small>
    </div>
  );
};

SuccessMessage.propTypes = {
  scale: PropTypes.string.isRequired,
  rootNote: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired,
};

export default SuccessMessage;

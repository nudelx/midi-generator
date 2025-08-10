import React from "react";
import PropTypes from "prop-types";
import { VALIDATION_RULES } from "../constants/musicConstants";

const NoteCountInput = ({ noteCount, onNoteCountChange }) => {
  const handleChange = (e) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    onNoteCountChange(value);
  };

  return (
    <div className="form-group mb-3">
      <label className="form-label">Note Limit (optional)</label>
      <input
        type="number"
        className="form-control"
        value={noteCount || ""}
        min={VALIDATION_RULES.NOTE_COUNT.min}
        max={VALIDATION_RULES.NOTE_COUNT.max}
        placeholder="Leave empty for full scale"
        onChange={handleChange}
      />
      <small className="form-text text-muted">
        Limit number of notes played
      </small>
    </div>
  );
};

NoteCountInput.propTypes = {
  noteCount: PropTypes.number,
  onNoteCountChange: PropTypes.func.isRequired,
};

export default NoteCountInput;

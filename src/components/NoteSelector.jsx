import React from "react";
import PropTypes from "prop-types";
import { rootNotes } from "../constants/musicConstants";

const NoteSelector = ({ rootNote, onRootNoteChange }) => {
  return (
    <div className="form-group mb-3">
      <label className="form-label">Root Note</label>
      <select
        className="form-select"
        value={rootNote}
        onChange={(e) => onRootNoteChange(e.target.value)}
      >
        {rootNotes.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>
  );
};

NoteSelector.propTypes = {
  rootNote: PropTypes.string.isRequired,
  onRootNoteChange: PropTypes.func.isRequired,
};

export { NoteSelector };

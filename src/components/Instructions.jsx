import React from "react";

const Instructions = () => {
  return (
    <div className="alert alert-info">
      <h6>💡 How to use in Ableton Live:</h6>
      <ol className="mb-0">
        <li>Download the MIDI file using the button above</li>
        <li>Open Ableton Live</li>
        <li>Create a new MIDI track</li>
        <li>
          Drag the downloaded .mid file from your computer into the MIDI track
        </li>
        <li>
          Or try dragging the area above directly (works in some browsers)
        </li>
      </ol>
    </div>
  );
};

export default Instructions;

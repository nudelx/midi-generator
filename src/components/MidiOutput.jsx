import React from "react";
import PropTypes from "prop-types";
import SuccessMessage from "./SuccessMessage";
import MidiDownloader from "./MidiDownloader";
import DragDropArea from "./DragDropArea";
import Instructions from "./Instructions";

const MidiOutput = ({
  midi,
  midiBlob,
  isDragging,
  scale,
  rootNote,
  octave,
  pattern,
  onDragStart,
  onDragEnd,
  onDragOver,
}) => {
  if (!midi) return null;

  return (
    <div className="mt-4">
      <SuccessMessage scale={scale} rootNote={rootNote} pattern={pattern} />

      <div className="row">
        <div className="col-md-6">
          <MidiDownloader
            midiDataUri={midi}
            scale={scale}
            rootNote={rootNote}
            octave={octave}
          />
        </div>
        <div className="col-md-6">
          <DragDropArea
            midiBlob={midiBlob}
            isDragging={isDragging}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
          />
        </div>
      </div>

      <div className="mt-4">
        <Instructions />
      </div>
    </div>
  );
};

MidiOutput.propTypes = {
  midi: PropTypes.string,
  midiBlob: PropTypes.object,
  isDragging: PropTypes.bool.isRequired,
  scale: PropTypes.string.isRequired,
  rootNote: PropTypes.string.isRequired,
  octave: PropTypes.number.isRequired,
  pattern: PropTypes.string.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
};

export default MidiOutput;

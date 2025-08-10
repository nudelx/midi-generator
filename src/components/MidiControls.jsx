import React from "react";
import PropTypes from "prop-types";
import { ScaleSelector } from "./ScaleSelector";
import { NoteSelector } from "./NoteSelector";
import OctaveInput from "./OctaveInput";
import TempoInput from "./TempoInput";
import NoteCountInput from "./NoteCountInput";
import { PatternSelector } from "./PatternSelector";
import { RhythmSelector } from "./RhythmSelector";

const MidiControls = ({
  scale,
  onScaleChange,
  rootNote,
  onRootNoteChange,
  octave,
  onOctaveChange,
  tempo,
  onTempoChange,
  noteCount,
  onNoteCountChange,
  pattern,
  onPatternChange,
  rhythm,
  onRhythmChange,
}) => {
  return (
    <>
      <ScaleSelector scale={scale} onScaleChange={onScaleChange} />
      <NoteSelector rootNote={rootNote} onRootNoteChange={onRootNoteChange} />
      <OctaveInput octave={octave} onOctaveChange={onOctaveChange} />
      <TempoInput tempo={tempo} onTempoChange={onTempoChange} />
      <NoteCountInput
        noteCount={noteCount}
        onNoteCountChange={onNoteCountChange}
      />
      <PatternSelector pattern={pattern} onPatternChange={onPatternChange} />
      <RhythmSelector rhythm={rhythm} onRhythmChange={onRhythmChange} />
    </>
  );
};

MidiControls.propTypes = {
  scale: PropTypes.string.isRequired,
  onScaleChange: PropTypes.func.isRequired,
  rootNote: PropTypes.string.isRequired,
  onRootNoteChange: PropTypes.func.isRequired,
  octave: PropTypes.number.isRequired,
  onOctaveChange: PropTypes.func.isRequired,
  tempo: PropTypes.number.isRequired,
  onTempoChange: PropTypes.func.isRequired,
  noteCount: PropTypes.number,
  onNoteCountChange: PropTypes.func.isRequired,
  pattern: PropTypes.string.isRequired,
  onPatternChange: PropTypes.func.isRequired,
  rhythm: PropTypes.string.isRequired,
  onRhythmChange: PropTypes.func.isRequired,
};

export default MidiControls;

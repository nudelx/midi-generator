import React from "react";
import PropTypes from "prop-types";
import MidiGeneratorService from "./MidiGenerator";

const MidiDownloader = ({
  midiDataUri,
  scale,
  rootNote,
  octave,
  onDownload,
}) => {
  const handleDownload = () => {
    if (midiDataUri) {
      const a = document.createElement("a");
      a.href = midiDataUri;
      a.download = MidiGeneratorService.createFileName(scale, rootNote, octave);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      onDownload?.();
    }
  };

  return (
    <button className="btn btn-success btn-block" onClick={handleDownload}>
      📥 Download MIDI File
    </button>
  );
};

MidiDownloader.propTypes = {
  midiDataUri: PropTypes.string,
  scale: PropTypes.string.isRequired,
  rootNote: PropTypes.string.isRequired,
  octave: PropTypes.number.isRequired,
  onDownload: PropTypes.func,
};

export default MidiDownloader;

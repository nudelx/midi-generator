import React from "react";
import MidiControls from "./components/MidiControls";
import GenerateButton from "./components/GenerateButton";
import MidiOutput from "./components/MidiOutput";
import { useMidiGeneration } from "./hooks/useMidiGeneration";

function App() {
  const {
    // State
    scale,
    rootNote,
    octave,
    tempo,
    noteCount,
    pattern,
    rhythm,
    midi,
    midiBlob,
    isDragging,

    // Setters
    setScale,
    setRootNote,
    setOctave,
    setTempo,
    setNoteCount,
    setPattern,
    setRhythm,

    // Actions
    generateMidi,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  } = useMidiGeneration();

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">
                MIDI Arpeggio Generator
              </h1>

              <MidiControls
                scale={scale}
                onScaleChange={setScale}
                rootNote={rootNote}
                onRootNoteChange={setRootNote}
                octave={octave}
                onOctaveChange={setOctave}
                tempo={tempo}
                onTempoChange={setTempo}
                noteCount={noteCount}
                onNoteCountChange={setNoteCount}
                pattern={pattern}
                onPatternChange={setPattern}
                rhythm={rhythm}
                onRhythmChange={setRhythm}
              />

              <GenerateButton onClick={generateMidi} />

              <MidiOutput
                midi={midi}
                midiBlob={midiBlob}
                isDragging={isDragging}
                scale={scale}
                rootNote={rootNote}
                octave={octave}
                pattern={pattern}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

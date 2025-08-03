import React, { useState, useRef } from "react";
import MidiWriter from "midi-writer-js";

const scales = {
  Major: [0, 2, 4, 5, 7, 9, 11],
  "Natural Minor": [0, 2, 3, 5, 7, 8, 10],
  "Harmonic Minor": [0, 2, 3, 5, 7, 8, 11],
  "Melodic Minor": [0, 2, 3, 5, 7, 9, 11],
  Dorian: [0, 2, 3, 5, 7, 9, 10],
  Phrygian: [0, 1, 3, 5, 7, 8, 10],
  Lydian: [0, 2, 4, 6, 7, 9, 11],
  Mixolydian: [0, 2, 4, 5, 7, 9, 10],
  Locrian: [0, 1, 3, 5, 6, 8, 10],
  "Major Pentatonic": [0, 2, 4, 7, 9],
  "Minor Pentatonic": [0, 3, 5, 7, 10],
  "Blues Scale": [0, 3, 5, 6, 7, 10],
  "Chromatic": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
};

const rootNotes = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

function App() {
  const [scale, setScale] = useState("Major");
  const [rootNote, setRootNote] = useState("C");
  const [octave, setOctave] = useState(4);
  const [tempo, setTempo] = useState(120);
  const [noteCount, setNoteCount] = useState(null);
  const [pattern, setPattern] = useState("Up");
  const [rhythm, setRhythm] = useState("8");
  const [midi, setMidi] = useState(null);
  const [midiBlob, setMidiBlob] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);

  const generateMidi = () => {
    try {
      if (octave < 0 || octave > 8) {
        alert("Octave must be between 0 and 8");
        return;
      }

      const track = new MidiWriter.Track();
      
      // Set tempo
      track.addEvent(new MidiWriter.MetaEvent({
        type: 'setTempo',
        data: [Math.round(60000000 / tempo)]
      }));
      
      const scaleIntervals = scales[scale];
      const rootNoteIndex = rootNotes.indexOf(rootNote);

      let notes = [];
      for (let i = 0; i < scaleIntervals.length; i++) {
        const midiNote = rootNoteIndex + scaleIntervals[i] + octave * 12;
        if (midiNote >= 0 && midiNote <= 127) {
          notes.push(midiNote);
        }
      }

      if (notes.length === 0) {
        alert("No valid MIDI notes generated. Try a different octave.");
        return;
      }

      if (pattern === "Up-Down") {
        notes = [...notes, ...notes.slice(0, -1).reverse()];
      } else if (pattern === "Down") {
        notes.reverse();
      }

      // Limit note count if specified
      if (noteCount && noteCount > 0) {
        notes = notes.slice(0, noteCount);
      }

      notes.forEach((note, index) => {
        track.addEvent(
          new MidiWriter.NoteEvent({
            pitch: [note],
            duration: rhythm,
            wait: index === 0 ? "0" : "0",
          })
        );
      });

      const write = new MidiWriter.Writer([track]);
      const dataUri = write.dataUri();
      setMidi(dataUri);

      fetch(dataUri)
        .then((res) => res.blob())
        .then((blob) => {
          const fileName = `${scale.toLowerCase().replace(/\s+/g, '-')}-${rootNote.toLowerCase()}-${octave}.mid`;
          const file = new File([blob], fileName, { type: "audio/midi" });
          setMidiBlob(file);

          const url = URL.createObjectURL(blob);
          setDownloadUrl(url);
        })
        .catch((error) => {
          console.error("Error creating MIDI file:", error);
          alert("Error creating MIDI file. Please try again.");
        });
    } catch (error) {
      console.error("Error generating MIDI:", error);
      alert("Error generating MIDI. Please check your settings and try again.");
    }
  };

  const handleDragStart = (e) => {
    if (midiBlob) {
      try {
        // Set the file for drag and drop
        e.dataTransfer.setData("text/plain", ""); // Required for Firefox
        e.dataTransfer.effectAllowed = "copy";

        // Add the file to the drag operation
        if (e.dataTransfer.items) {
          e.dataTransfer.items.add(midiBlob);
        }

        setIsDragging(true);
      } catch (error) {
        console.log("Drag and drop not supported, use download instead");
      }
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "arpeggio.mid";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  // Cleanup download URL when component unmounts
  React.useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">
                MIDI Arpeggio Generator
              </h1>

              <div className="form-group mb-3">
                <label className="form-label">Scale</label>
                <select
                  className="form-select"
                  value={scale}
                  onChange={(e) => setScale(e.target.value)}
                >
                  {Object.keys(scales).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Root Note</label>
                <select
                  className="form-select"
                  value={rootNote}
                  onChange={(e) => setRootNote(e.target.value)}
                >
                  {rootNotes.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Octave</label>
                <input
                  type="number"
                  className="form-control"
                  value={octave}
                  min="0"
                  max="8"
                  onChange={(e) => setOctave(parseInt(e.target.value) || 4)}
                />
                <small className="form-text text-muted">Valid range: 0-8</small>
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Tempo (BPM)</label>
                <input
                  type="number"
                  className="form-control"
                  value={tempo}
                  min="60"
                  max="200"
                  onChange={(e) => setTempo(parseInt(e.target.value) || 120)}
                />
                <small className="form-text text-muted">Valid range: 60-200 BPM</small>
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Note Limit (optional)</label>
                <input
                  type="number"
                  className="form-control"
                  value={noteCount || ''}
                  min="1"
                  max="50"
                  placeholder="Leave empty for full scale"
                  onChange={(e) => setNoteCount(e.target.value ? parseInt(e.target.value) : null)}
                />
                <small className="form-text text-muted">Limit number of notes played</small>
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Pattern</label>
                <select
                  className="form-select"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                >
                  <option value="Up">Up</option>
                  <option value="Down">Down</option>
                  <option value="Up-Down">Up-Down</option>
                </select>
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Rhythm</label>
                <select
                  className="form-select"
                  value={rhythm}
                  onChange={(e) => setRhythm(e.target.value)}
                >
                  <option value="1">Whole Note</option>
                  <option value="2">Half Note</option>
                  <option value="4">Quarter Note</option>
                  <option value="8">Eighth Note</option>
                  <option value="16">Sixteenth Note</option>
                </select>
              </div>

              <div className="d-grid">
                <button
                  className="btn btn-primary btn-lg mt-4"
                  onClick={generateMidi}
                >
                  🎵 Generate MIDI
                </button>
              </div>

              {midi && (
                <div className="mt-4">
                  <div className="alert alert-success">
                    <strong>🎵 MIDI Generated Successfully!</strong>
                    <br />
                    <small>Scale: {scale} | Root: {rootNote} | Pattern: {pattern}</small>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <button
                        className="btn btn-success btn-block"
                        onClick={handleDownload}
                      >
                        📥 Download MIDI File
                      </button>
                    </div>
                    <div className="col-md-6">
                      <div
                        ref={dragRef}
                        className={`p-3 text-center border-2 border-dashed rounded ${
                          isDragging
                            ? "border-primary bg-primary bg-opacity-10"
                            : "border-secondary"
                        }`}
                        draggable={!!midiBlob}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                        style={{ cursor: midiBlob ? "grab" : "default" }}
                      >
                        {isDragging ? (
                          <div className="text-primary">
                            <h6>🎵 Dragging...</h6>
                          </div>
                        ) : (
                          <div>
                            <h6>🎹 Try Drag to DAW</h6>
                            <small className="text-muted">
                              (May not work in all browsers)
                            </small>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="alert alert-info">
                      <h6>💡 How to use in Ableton Live:</h6>
                      <ol className="mb-0">
                        <li>Download the MIDI file using the button above</li>
                        <li>Open Ableton Live</li>
                        <li>Create a new MIDI track</li>
                        <li>
                          Drag the downloaded .mid file from your computer into
                          the MIDI track
                        </li>
                        <li>
                          Or try dragging the area above directly (works in some
                          browsers)
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

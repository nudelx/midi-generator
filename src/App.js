import React, { useState } from 'react';
import MidiWriter from 'midi-writer-js';

const scales = {
  'Major': [0, 2, 4, 5, 7, 9, 11],
  'Natural Minor': [0, 2, 3, 5, 7, 8, 10],
  'Harmonic Minor': [0, 2, 3, 5, 7, 8, 11],
  'Major Pentatonic': [0, 2, 4, 7, 9],
};

const rootNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function App() {
  const [scale, setScale] = useState('Major');
  const [rootNote, setRootNote] = useState('C');
  const [octave, setOctave] = useState(4);
  const [pattern, setPattern] = useState('Up');
  const [rhythm, setRhythm] = useState('8');
  const [midi, setMidi] = useState(null);

  const generateMidi = () => {
    const track = new MidiWriter.Track();
    const scaleIntervals = scales[scale];
    const rootNoteIndex = rootNotes.indexOf(rootNote);

    let notes = [];
    for (let i = 0; i < scaleIntervals.length; i++) {
      notes.push(rootNoteIndex + scaleIntervals[i] + (octave * 12));
    }

    if (pattern === 'Up-Down') {
      notes = [...notes, ...notes.slice(0, -1).reverse()];
    } else if (pattern === 'Down') {
      notes.reverse();
    }

    track.addEvent(new MidiWriter.NoteEvent({ pitch: notes, duration: rhythm }));

    const write = new MidiWriter.Writer([track]);
    setMidi(write.dataUri());
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">MIDI Arpeggio Generator</h1>

              <div className="form-group">
                <label>Scale</label>
                <select className="form-control" value={scale} onChange={(e) => setScale(e.target.value)}>
                  {Object.keys(scales).map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Root Note</label>
                <select className="form-control" value={rootNote} onChange={(e) => setRootNote(e.target.value)}>
                  {rootNotes.map(n => <option key={n}>{n}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Octave</label>
                <input type="number" className="form-control" value={octave} onChange={(e) => setOctave(parseInt(e.target.value))} />
              </div>

              <div className="form-group">
                <label>Pattern</label>
                <select className="form-control" value={pattern} onChange={(e) => setPattern(e.target.value)}>
                  <option>Up</option>
                  <option>Down</option>
                  <option>Up-Down</option>
                </select>
              </div>

              <div className="form-group">
                <label>Rhythm</label>
                <select className="form-control" value={rhythm} onChange={(e) => setRhythm(e.target.value)}>
                  <option value="1">Whole Note</option>
                  <option value="2">Half Note</option>
                  <option value="4">Quarter Note</option>
                  <option value="8">Eighth Note</option>
                  <option value="16">Sixteenth Note</option>
                </select>
              </div>

              <button className="btn btn-primary btn-block mt-4" onClick={generateMidi}>Generate MIDI</button>

              {midi && (
                <a href={midi} download="arpeggio.mid" className="btn btn-success btn-block mt-2">
                  Download MIDI
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
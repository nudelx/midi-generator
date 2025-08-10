import MidiWriter from "midi-writer-js";
import {
  scales,
  rootNotes,
  VALIDATION_RULES,
} from "../constants/musicConstants";

class MidiGeneratorService {
  static generateMidi(params) {
    const { scale, rootNote, octave, tempo, noteCount, pattern, rhythm } =
      params;

    if (
      octave < VALIDATION_RULES.OCTAVE.min ||
      octave > VALIDATION_RULES.OCTAVE.max
    ) {
      throw new Error(
        `Octave must be between ${VALIDATION_RULES.OCTAVE.min} and ${VALIDATION_RULES.OCTAVE.max}`
      );
    }

    const track = new MidiWriter.Track();
    track.setTempo(tempo);

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
      throw new Error("No valid MIDI notes generated. Try a different octave.");
    }

    if (pattern === "Up-Down") {
      notes = [...notes, ...notes.slice(0, -1).reverse()];
    } else if (pattern === "Down") {
      notes.reverse();
    }

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
    return write.dataUri();
  }

  static createFileName(scale, rootNote, octave) {
    return `${scale
      .toLowerCase()
      .replace(/\s+/g, "-")}-${rootNote.toLowerCase()}-${octave}.mid`;
  }
}

export default MidiGeneratorService;

export const scales = {
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
  Chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
};

export const rootNotes = [
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

export const patterns = [
  { value: "Up", label: "Up" },
  { value: "Down", label: "Down" },
  { value: "Up-Down", label: "Up-Down" },
];

export const rhythms = [
  { value: "1", label: "Whole Note" },
  { value: "2", label: "Half Note" },
  { value: "4", label: "Quarter Note" },
  { value: "8", label: "Eighth Note" },
  { value: "16", label: "Sixteenth Note" },
];

export const VALIDATION_RULES = {
  OCTAVE: { min: 0, max: 8 },
  TEMPO: { min: 60, max: 200 },
  NOTE_COUNT: { min: 1, max: 50 },
};

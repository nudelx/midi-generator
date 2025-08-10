import { useState, useEffect } from "react";
import MidiGeneratorService from "../components/MidiGenerator";

export const useMidiGeneration = () => {
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

  const generateMidi = () => {
    try {
      const params = {
        scale,
        rootNote,
        octave,
        tempo,
        noteCount,
        pattern,
        rhythm,
      };
      const dataUri = MidiGeneratorService.generateMidi(params);
      setMidi(dataUri);

      fetch(dataUri)
        .then((res) => res.blob())
        .then((blob) => {
          const fileName = MidiGeneratorService.createFileName(
            scale,
            rootNote,
            octave
          );
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
      alert(
        error.message ||
          "Error generating MIDI. Please check your settings and try again."
      );
    }
  };

  const handleDragStart = (e) => {
    if (midiBlob) {
      try {
        e.dataTransfer.setData("text/plain", "");
        e.dataTransfer.effectAllowed = "copy";

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

  // Cleanup download URL when component unmounts
  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  return {
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
  };
};

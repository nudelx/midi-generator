# MIDI Generator Component Architecture

This document outlines the refactored component architecture following SOLID principles.

## 🏗️ Architecture Overview

The application has been split into reusable, focused components with clear responsibilities:

### 📁 Directory Structure

```
src/
├── components/
│   ├── index.js                 # Component exports
│   ├── ScaleSelector.jsx        # Scale selection
│   ├── NoteSelector.jsx         # Root note selection
│   ├── OctaveInput.jsx          # Octave input with validation
│   ├── TempoInput.jsx           # Tempo input with validation
│   ├── NoteCountInput.jsx       # Optional note count input
│   ├── PatternSelector.jsx      # Pattern selection
│   ├── RhythmSelector.jsx       # Rhythm selection
│   ├── MidiControls.jsx         # Composite form controls
│   ├── GenerateButton.jsx       # MIDI generation trigger
│   ├── MidiOutput.jsx           # Composite output display
│   ├── MidiDownloader.jsx       # Download functionality
│   ├── DragDropArea.jsx         # Drag & drop functionality
│   ├── SuccessMessage.jsx       # Success feedback
│   ├── Instructions.jsx         # Usage instructions
│   └── MidiGenerator.jsx        # MIDI generation service
├── hooks/
│   └── useMidiGeneration.js     # Custom hook for state management
├── constants/
│   └── musicConstants.js        # Centralized music data
└── App.jsx                      # Main application component
```

## 🎯 SOLID Principles Implementation

### 1. **Single Responsibility Principle (SRP)**

Each component has one clear responsibility:

- **ScaleSelector**: Handles scale selection only
- **NoteSelector**: Handles root note selection only
- **OctaveInput**: Handles octave input with validation only
- **MidiGenerator**: Handles MIDI generation logic only
- **MidiDownloader**: Handles file download only

### 2. **Open/Closed Principle (OCP)**

Components are open for extension but closed for modification:

- New scales can be added to `musicConstants.js` without modifying components
- New patterns can be added without changing existing code
- Validation rules are centralized and easily extensible

### 3. **Liskov Substitution Principle (LSP)**

Components can be substituted with similar components:

- All input components follow the same prop interface pattern
- All selector components use consistent onChange handlers

### 4. **Interface Segregation Principle (ISP)**

Components only depend on the interfaces they use:

- Form components only receive the props they need
- Composite components aggregate smaller components without tight coupling

### 5. **Dependency Inversion Principle (DIP)**

High-level modules don't depend on low-level modules:

- `App.jsx` depends on abstractions (hooks, composite components)
- Business logic is separated into services and hooks
- Data is centralized in constants

## 🔧 Component Categories

### **Form Controls** (Atomic Components)

- `ScaleSelector` - Scale selection dropdown
- `NoteSelector` - Root note selection dropdown
- `OctaveInput` - Octave number input with validation
- `TempoInput` - Tempo input with validation
- `NoteCountInput` - Optional note count input
- `PatternSelector` - Pattern selection dropdown
- `RhythmSelector` - Rhythm selection dropdown

### **Composite Components**

- `MidiControls` - Groups all form controls
- `MidiOutput` - Groups all output-related components

### **Action Components**

- `GenerateButton` - Triggers MIDI generation
- `MidiDownloader` - Handles file download

### **Display Components**

- `SuccessMessage` - Shows success feedback
- `Instructions` - Shows usage instructions
- `DragDropArea` - Handles drag & drop interface

### **Services**

- `MidiGeneratorService` - Pure business logic for MIDI generation

## 🎣 Custom Hooks

### `useMidiGeneration`

Encapsulates all MIDI generation state and logic:

- Manages all form state
- Handles MIDI generation
- Manages drag & drop state
- Handles cleanup

## 📊 Data Management

### Constants (`musicConstants.js`)

Centralized data that can be easily modified:

- Musical scales and intervals
- Root notes
- Patterns and rhythms
- Validation rules

## 🔄 State Flow

1. **User Input** → Form components update state via props
2. **State Changes** → Custom hook manages state updates
3. **Generate Action** → Service generates MIDI data
4. **Output Display** → Composite components render results

## 🚀 Benefits of This Architecture

1. **Maintainability**: Each component has a single, clear purpose
2. **Reusability**: Components can be easily reused in other parts of the app
3. **Testability**: Small, focused components are easier to test
4. **Scalability**: New features can be added without modifying existing code
5. **Readability**: Clear separation of concerns makes code easier to understand

## 🔧 Usage Examples

### Using Individual Components

```jsx
import { ScaleSelector, NoteSelector } from './components';

<ScaleSelector scale={scale} onScaleChange={setScale} />
<NoteSelector rootNote={rootNote} onRootNoteChange={setRootNote} />
```

### Using Composite Components

```jsx
import { MidiControls, MidiOutput } from "./components";

<MidiControls
  scale={scale}
  onScaleChange={setScale}
  // ... other props
/>;
```

### Using Custom Hook

```jsx
import { useMidiGeneration } from "./hooks/useMidiGeneration";

const {
  scale,
  setScale,
  generateMidi,
  // ... other state and actions
} = useMidiGeneration();
```

This architecture ensures the codebase is maintainable, scalable, and follows React best practices while adhering to SOLID principles.

import React, { useRef } from "react";
import PropTypes from "prop-types";

const DragDropArea = ({
  midiBlob,
  isDragging,
  onDragStart,
  onDragEnd,
  onDragOver,
}) => {
  const dragRef = useRef(null);

  return (
    <div
      ref={dragRef}
      className={`p-3 text-center border-2 border-dashed rounded ${
        isDragging
          ? "border-primary bg-primary bg-opacity-10"
          : "border-secondary"
      }`}
      draggable={!!midiBlob}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      style={{ cursor: midiBlob ? "grab" : "default" }}
    >
      {isDragging ? (
        <div className="text-primary">
          <h6>🎵 Dragging...</h6>
        </div>
      ) : (
        <div>
          <h6>🎹 Try Drag to DAW</h6>
          <small className="text-muted">(May not work in all browsers)</small>
        </div>
      )}
    </div>
  );
};

DragDropArea.propTypes = {
  midiBlob: PropTypes.object,
  isDragging: PropTypes.bool.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
};

export default DragDropArea;

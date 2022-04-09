import React from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import StyledButton from './UI/Button/StyledButton';

const Canvas = ({ canvasRef, isDrawing }) => {
  const clearCanvasHandler = () => {
    canvasRef.current.clearCanvas();
  };

  return (
    <>
      <ReactSketchCanvas
        strokeWidth={2}
        strokeColor='black'
        ref={canvasRef}
        style={{
          border: '1px solid #000000',
          margin: '5px auto',
        }}
      />
      {isDrawing && (
        <StyledButton
          style={{
            margin: '0 15px 0 0',
          }}
          onClick={clearCanvasHandler}
        >
          Clear Canvas
        </StyledButton>
      )}
    </>
  );
};

export default Canvas;

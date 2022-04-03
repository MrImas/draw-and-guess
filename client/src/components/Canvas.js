import React, { useRef, useEffect, useState } from 'react';
import classes from './Canvas.module.css';

const Canvas = ({ canvasRef }) => {
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.style.width = window.innerWidth;
    canvas.style.height = window.innerHeight / 2;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctxRef.current = ctx;
  }, []);

  const getMousePosRelativeForCanvas = (eventX, eventY) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = eventX - rect.left;
    const y = eventY - rect.top;
    return { x, y };
  };

  const startDrawing = (event) => {
    ctxRef.current.beginPath();
    const { x, y } = getMousePosRelativeForCanvas(event.pageX, event.pageY);
    ctxRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const { x, y } = getMousePosRelativeForCanvas(event.pageX, event.pageY);
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };

  return (
    <canvas
      className={classes.canvas}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      style={{ border: '1px solid #000000' }}
    />
  );
};

export default Canvas;

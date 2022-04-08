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
    ctx.lineWidth = 2;
    ctxRef.current = ctx;
  }, [canvasRef]);

  const getMousePosRelativeForCanvas = (eventX, eventY) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = eventX - rect.left;
    const y = eventY - rect.top;
    return [x, y];
  };

  const startDrawing = (event) => {
    ctxRef.current.beginPath();
    let x, y;
    if (event.type.includes('mouse')) {
      [x, y] = getMousePosRelativeForCanvas(event.clientX, event.clientY);
    } else {
      const touch = event.touches[0];
      [x, y] = getMousePosRelativeForCanvas(touch.clientX, touch.clientY);
      console.log(`pos relative to canvas: x= ${x}, y=${y}`);
    }
    console.log(`x= ${x}, y= ${y}`);
    ctxRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    let x, y;
    if (event.type.includes('mouse')) {
      [x, y] = getMousePosRelativeForCanvas(event.pageX, event.pageY);
    } else {
      const touch = event.touches[0];
      [x, y] = getMousePosRelativeForCanvas(touch.clientX, touch.clientY);
    }
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };

  return (
    <canvas
      className={classes.canvas}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      onTouchStart={startDrawing}
      onTouchEnd={finishDrawing}
      onTouchMove={draw}
      ref={canvasRef}
      style={{ border: '1px solid #000000' }}
    />
  );
};

export default Canvas;

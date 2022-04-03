import React, { useRef } from 'react';

import Canvas from '../components/Canvas';

const Drawing = ({ socket, room, onFinishDrawing }) => {
  const canvasRef = useRef(null);

  const sendDrawingToOtherPlayer = () => {
    const data = { canvasData: canvasRef.current.toDataURL(), room };
    socket.emit('finished_drawing', data);
    onFinishDrawing();
  };

  return (
    <div>
      <Canvas canvasRef={canvasRef} />
      <button onClick={sendDrawingToOtherPlayer}>Send Your Drawing</button>
    </div>
  );
};

export default Drawing;

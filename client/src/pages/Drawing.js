import React, { useRef, useState } from 'react';

import Canvas from '../components/Canvas';
import StyledButton from '../components/UI/Button/StyledButton';
import StyledLoadingSpinner from '../components/UI/LoadingSpinner/StyledLoadingSpinner';
import StyledTypography from '../components/UI/Typography/StyledTypography';

const Drawing = ({ socket, room, onFinishDrawing, chosenWord }) => {
  const canvasRef = useRef(null);
  const [finishedDrawing, setFinishedDrawing] = useState(false);

  const sendDrawingToOtherPlayer = async () => {
    const canvasData = await canvasRef.current.exportImage('png');
    const data = { canvasData, room };
    socket.emit('finished_drawing', data);
    setFinishedDrawing(true);
    onFinishDrawing();
  };

  return (
    <div>
      <StyledTypography style={{ variant: 'h5' }}>
        Your word to draw is: {chosenWord}
      </StyledTypography>
      <Canvas canvasRef={canvasRef} isDrawing={!finishedDrawing} />
      {finishedDrawing ? (
        <StyledLoadingSpinner message='Waiting to your opponent to guess the word...' />
      ) : (
        <StyledButton style={{}} onClick={sendDrawingToOtherPlayer}>
          Send Your Drawing
        </StyledButton>
      )}
    </div>
  );
};

export default Drawing;

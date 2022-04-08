import React, { useRef } from 'react';

import Canvas from '../components/Canvas';
import StyledButton from '../components/UI/Button/StyledButton';
import StyledTypography from '../components/UI/Typography/StyledTypography';

const Drawing = ({ socket, room, onFinishDrawing, chosenWord }) => {
  const canvasRef = useRef(null);

  const sendDrawingToOtherPlayer = () => {
    const data = { canvasData: canvasRef.current.toDataURL(), room };
    socket.emit('finished_drawing', data);
    onFinishDrawing();
  };

  return (
    <div>
      <StyledTypography style={{ variant: 'h5' }}>
        Your word to draw is: {chosenWord}
      </StyledTypography>
      <Canvas canvasRef={canvasRef} />
      <StyledButton style={{}} onClick={sendDrawingToOtherPlayer}>
        Send Your Drawing
      </StyledButton>
    </div>
  );
};

export default Drawing;

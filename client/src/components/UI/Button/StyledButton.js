import React from 'react';
import Button from '@mui/material/Button';

const StyledButton = ({ style, onClick, children }) => {
  return (
    <Button
      variant={style.variant || 'contained'}
      onClick={onClick}
      disabled={style.disabled || false}
      size={style.size || 'small'}
    >
      {children}
    </Button>
  );
};

export default StyledButton;

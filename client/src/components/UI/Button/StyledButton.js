import React from 'react';
import Button from '@mui/material/Button';

const StyledButton = ({ style, onClick, children }) => {
  return (
    <Button
      onClick={onClick}
      variant={style.variant || 'contained'}
      disabled={style.disabled || false}
      size={style.size || 'small'}
      value={style.value || null}
      sx={{ margin: style.margin || 0 }}
      type={style.type || 'button'}
    >
      {children || style.value || ''}
    </Button>
  );
};

export default StyledButton;

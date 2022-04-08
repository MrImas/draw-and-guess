import React from 'react';
import TextField from '@mui/material/TextField';

const StyledTextField = ({ style, onChange }) => {
  return (
    <TextField
      required
      id={style.id || ''}
      label={style.label || ''}
      placeholder={style.placeholder || ''}
      onChange={(event) => onChange(event.target.value)}
      type={style.type || 'text'}
      size={style.size || 'small'}
      sx={style.sx || { margin: 2 }}
    />
  );
};

export default StyledTextField;

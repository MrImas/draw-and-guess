import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LoadingSpinner = ({ message, spinnerProps }) => {
  return (
    <Box sx={{ display: 'flex-column' }}>
      <Typography component='h1' variant='h5'>
        {message}
      </Typography>
      <CircularProgress {...spinnerProps} />
    </Box>
  );
};

export default LoadingSpinner;

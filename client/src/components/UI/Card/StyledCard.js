import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/system';

const CardStyled = styled(Card)(({ theme }) => ({
  border: `2px dotted ${theme.palette.primary.light}`,
  maxWidth: '90vw',
  margin: '7px auto',
}));

const StyledCard = ({ style, children }) => {
  return (
    <CardStyled sx={{ ...style }}>
      <CardContent>{children}</CardContent>
    </CardStyled>
  );
};

export default StyledCard;

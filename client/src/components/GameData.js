import React from 'react';
import StyledTypography from './UI/Typography/StyledTypography';
import StyledCard from './UI/Card/StyledCard';
import StyledLoadingSpinner from './UI/LoadingSpinner/StyledLoadingSpinner';

const GameData = ({ userName, room, points, opponentName }) => {
  return (
    <StyledCard>
      <StyledTypography style={{ variant: 'h5' }}>
        Hey {userName}! You are playing in room named: {room}
      </StyledTypography>
      <StyledTypography style={{ variant: 'h6' }}>
        You have {points} points in total!
      </StyledTypography>
      {opponentName ? (
        <StyledTypography style={{ variant: 'body1' }}>
          You are Playing against {opponentName}
        </StyledTypography>
      ) : (
        <StyledLoadingSpinner
          message='waiting for another player to join room...'
          spinnerProps={{ size: 50 }}
        />
      )}
    </StyledCard>
  );
};

export default GameData;

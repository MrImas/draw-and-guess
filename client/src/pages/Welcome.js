import React from 'react';

import BestScoresTable from '../components/BestScoresTable';
import classes from './Welcome.module.css';
import StyledButton from '../components/UI/Button/StyledButton';
import StyledTextField from '../components/UI/TextField/StyledTextField';
import StyledTypography from '../components/UI/Typography/StyledTypography';

const Welcome = ({
  onJoin,
  chooseRoom,
  chooseUserName,
  isRoomChosen,
  isUserNameChosen,
}) => {
  return (
    <div className={classes.welcomeContainer}>
      <div className={classes.formContainer}>
        <StyledTypography style={{ variant: 'h4' }}>
          Welcome to Draw &amp; Guess
        </StyledTypography>
        <StyledTextField
          style={{
            id: 'userName',
            label: 'User Name',
            placeholder: 'user name...',
          }}
          onChange={chooseUserName}
        />
        <StyledTextField
          style={{
            id: 'room',
            label: 'Room',
            placeholder: 'name of room...',
          }}
          onChange={chooseRoom}
        />
        <StyledButton
          style={{
            disabled: !isRoomChosen || !isUserNameChosen,
          }}
          onClick={onJoin}
        >
          Join Game
        </StyledButton>
      </div>
      <BestScoresTable />
    </div>
  );
};

export default Welcome;

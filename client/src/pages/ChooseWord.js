import React from 'react';
import StyledCard from '../components/UI/Card/StyledCard';
import StyledTypography from '../components/UI/Typography/StyledTypography';
import StyledButton from './../components/UI/Button/StyledButton';

const ChooseWord = ({ chooseLevel, canChangeWord }) => {
  const chooseLevelHandler = (event) => {
    chooseLevel(event.target.value);
  };

  return (
    <StyledCard
      style={{
        minWidth: '50vw',
      }}
    >
      <StyledTypography>Choose Level</StyledTypography>
      <StyledButton
        style={{
          value: 'Easy',
          margin: '3px',
          disabled: !canChangeWord,
        }}
        onClick={chooseLevelHandler}
      />
      <StyledButton
        style={{
          value: 'Medium',
          margin: '3px',
          disabled: !canChangeWord,
        }}
        onClick={chooseLevelHandler}
      />
      <StyledButton
        style={{
          value: 'Hard',
          margin: '3px',
          disabled: !canChangeWord,
        }}
        onClick={chooseLevelHandler}
      />
    </StyledCard>
  );
};

export default ChooseWord;

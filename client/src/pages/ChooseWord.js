import React from 'react';
import StyledCard from '../components/UI/Card/StyledCard';
import StyledButton from './../components/UI/Button/StyledButton';

const ChooseWord = ({ chooseLevel }) => {
  const chooseLevelHandler = (event) => {
    chooseLevel(event.target.value);
  };

  return (
    <StyledCard
      style={{
        minWidth: '50vw',
      }}
    >
      <StyledButton
        style={{
          value: 'Easy',
          margin: '3px',
        }}
        onClick={chooseLevelHandler}
      />
      <StyledButton
        style={{
          value: 'Medium',
          margin: '3px',
        }}
        onClick={chooseLevelHandler}
      />
      <StyledButton
        style={{
          value: 'Hard',
          margin: '3px',
        }}
        onClick={chooseLevelHandler}
      />
    </StyledCard>
  );
};

export default ChooseWord;

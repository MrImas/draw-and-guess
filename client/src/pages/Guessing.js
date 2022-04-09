import React from 'react';
import StyledButton from '../components/UI/Button/StyledButton';
import StyledCard from '../components/UI/Card/StyledCard';
import StyledTextField from '../components/UI/TextField/StyledTextField';

const Guessing = ({ drawToGuess, onSubmitGuess, onChangeGuess }) => {
  return (
    <StyledCard>
      <img src={drawToGuess} alt='guess drawing' />
      <form onSubmit={onSubmitGuess}>
        <StyledTextField
          onChange={onChangeGuess}
          style={{
            type: 'text',
            id: 'guessInput',
            label: `what's your guess?`,
            placeholder: 'your guess...',
            size: 'large',
          }}
        />
        <StyledButton
          style={{
            type: 'submit',
          }}
        >
          Send Your Guess
        </StyledButton>
      </form>
    </StyledCard>
  );
};

export default Guessing;

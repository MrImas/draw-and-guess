import React from 'react';
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
            label: 'guess',
            placeHolder: 'your guess...',
            size: 'large',
          }}
        />
        <label htmlFor='guessInput'>What's your guess??</label>
        <input type='submit' />
      </form>
    </StyledCard>
  );
};

export default Guessing;

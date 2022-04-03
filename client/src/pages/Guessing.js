import React from 'react';

const Guessing = ({ drawToGuess, onSubmitGuess, onChangeGuess }) => {
  return (
    <div>
      <img src={drawToGuess} alt='guess drawing' />
      <form onSubmit={onSubmitGuess}>
        <input onChange={onChangeGuess} type='text' id='guessInput' />
        <label htmlFor='guessInput'>What's your guess??</label>
        <input type='submit' />
      </form>
    </div>
  );
};

export default Guessing;

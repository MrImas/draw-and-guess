import React from 'react';

const ChooseWord = ({ chooseLevel }) => {
  const chooseLevelHandler = (event) => {
    chooseLevel(event.target.value);
  };

  return (
    <div>
      <input value='Easy' type='button' onClick={chooseLevelHandler} />
      <input value='Medium' type='button' onClick={chooseLevelHandler} />
      <input value='Hard' type='button' onClick={chooseLevelHandler} />
    </div>
  );
};

export default ChooseWord;

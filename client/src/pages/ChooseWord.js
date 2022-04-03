import React from 'react';
import randomWords from 'random-words';

const ChooseWord = ({ setChosenWord, setLevelPoints }) => {
  const chooseDifficulty = (event) => {
    switch (event.target.value) {
      case 'Easy':
        setChosenWord(
          randomWords({ exactly: 1, minLength: 3, maxLength: 4 })[0]
        );
        setLevelPoints(1);
        return;
      case 'Medium':
        setChosenWord(
          randomWords({ exactly: 1, minLength: 5, maxLength: 5 })[0]
        );
        setLevelPoints(3);

        return;
      case 'Hard':
        setChosenWord(randomWords({ exactly: 1, minLength: 6 })[0]);
        setLevelPoints(5);
        return;
      default:
        return;
    }
  };

  return (
    <div>
      <input value='Easy' type='button' onClick={chooseDifficulty} />
      <input value='Medium' type='button' onClick={chooseDifficulty} />
      <input value='Hard' type='button' onClick={chooseDifficulty} />
    </div>
  );
};

export default ChooseWord;

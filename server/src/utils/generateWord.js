import randomWords from 'random-words';
import { LEVELS } from './constants.js';
export const generateWordByLevel = (level) => {
  let maxLength = 4;
  let minLength = 3;
  switch (level) {
    case LEVELS.medium:
      maxLength = 5;
      minLength = 5;
      break;
    case LEVELS.hard:
      maxLength = -1;
      minLength = 6;
      break;
    default:
      break;
  }
  let wordGenerated;
  while (1) {
    wordGenerated = randomWords({ exactly: 1, maxLength })[0];
    if (wordGenerated.length >= minLength) {
      return wordGenerated.toLowerCase();
    }
  }
};

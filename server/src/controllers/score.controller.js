import { scoreModel } from '../models/Score.model.js';

export const getBestScores = async (req, res) => {
  const scores = await scoreModel.find({}).sort({ score: -1 }).exec();
  const sortedScores = sortScores(scores);
  res.json({
    scores: sortedScores.slice(-5).map((s) => s.toObject({ getters: true })),
  });
};

//return highest score to minimum time rate first
const sortScores = (scores) => {
  scores.sort((a, b) => {
    const scoreA = a.score / a.timeGuessingInSeconds;
    const scoreB = b.score / b.timeGuessingInSeconds;
    if (scoreA < scoreB) {
      return 1;
    } else if (scoreA > scoreB) {
      return -1;
    } else {
      return 0;
    }
  });
  return scores;
};

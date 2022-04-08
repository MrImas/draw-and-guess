import React, { useEffect, useState } from 'react';

import StyledTable from './UI/Table/StyledTable';

const BestScoresTable = () => {
  const [bestScores, setBestScores] = useState([]);

  useEffect(() => {
    const fetchBestScores = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/scores`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const scores = await response.json();
      setBestScores(scores.scores);
    };
    fetchBestScores();
  }, []);
  return (
    <>
      {bestScores.length && (
        <StyledTable
          rowsData={bestScores.map((score) => {
            return {
              userName: score.userName,
              timeGuessingInSeconds: score.timeGuessingInSeconds,
              score: score.score,
              id: score.id,
            };
          })}
          title='Top 5 best scores (score/time)'
          tableLabel='top 5 best scores'
          headerRow={['User Name', 'Time Guessing', 'Score']}
        />
      )}
    </>
  );
};

export default BestScoresTable;

import React from 'react';

const Welcome = ({ onJoin, chooseRoom, chooseUserName, isRoomChosen }) => {
  return (
    <div>
      <h1>Welcome to Draw &amp; Guess</h1>
      <input
        placeholder='user name...'
        type='text'
        onChange={(event) => chooseUserName(event.target.value)}
      />
      <input
        placeholder='name of room...'
        type='text'
        onChange={(event) => chooseRoom(event.target.value)}
      />
      <button onClick={onJoin} disabled={!isRoomChosen}>
        Join Game
      </button>
    </div>
  );
};

export default Welcome;

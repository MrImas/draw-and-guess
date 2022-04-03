import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Welcome from './pages/Welcome';
import ChooseWord from './ChooseWord';
import Drawing from './pages/Drawing';
import Guessing from './pages/Guessing';

import './App.css';
import LoadingSpinner from './components/LoadingSpinner';

const socket = io('http://localhost:3001');

function App() {
  const [joinedGame, setJoinedGame] = useState(false);
  const [room, setRoom] = useState('');
  const [userName, setUserName] = useState('');
  const [isYourTurn, setIsYourTurn] = useState(false);
  const [chosenWord, setChosenWord] = useState('');
  const [levelPoints, setLevelPoints] = useState(1);
  const [finishedDrawing, setFinishedDrawing] = useState(false);
  const [imageToGuess, setImageToGuess] = useState('');
  const [guess, setGuess] = useState('');
  const [points, setPoints] = useState(0);
  const [finishedGame, setFinishedGame] = useState(false);

  useEffect(() => {
    socket.on('your_turn', (data) => {
      setIsYourTurn(data);
    });

    socket.on('draw_image', (data) => {
      setImageToGuess(data.canvasData);
      setFinishedDrawing(true);
    });

    socket.on('game_finished', (data) => {
      if (data.finished) {
        setFinishedGame(true);
        setLevelPoints(data.levelPoints);
      }
    });
  }, []);

  useEffect(() => {
    if (finishedGame) {
      if (!isYourTurn) {
        setPoints((prevPts) => prevPts + levelPoints);
        alert('You guessed it champ!!!!!');
      }
      setFinishedGame(false);
      setIsYourTurn((prevTurn) => !prevTurn);
      setChosenWord('');
      // setLevelPoints(1);
      setFinishedDrawing(false);
      setImageToGuess('');
      setGuess('');
    }
  }, [finishedGame]);

  // useEffect(() => {
  //   if (finishedGame) {
  //     setIsYourTurn((prevTurn) => !prevTurn);
  //     setChosenWord('');
  //     setLevelPoints(1);
  //     setFinishedDrawing(false);
  //     setImageToGuess('');
  //     setGuess('');
  //   }
  // }, [finishedGame]);

  const joinGame = () => {
    if (room !== '' && userName !== '') socket.emit('join_room', { room });
    setJoinedGame(true);
  };

  const chooseRoom = (roomName) => {
    setRoom(roomName);
  };

  const chooseUserName = (userNameChosen) => {
    setUserName(userNameChosen);
  };

  const chooseWord = (word) => {
    setChosenWord(word);
    socket.emit('chose_word', { word, room });
  };

  const chooseLevelPoints = (levelPoints) => {
    setLevelPoints(levelPoints);
    socket.emit('level_points', { levelPoints });
  };

  const finishDrawing = () => {
    setFinishedDrawing(true);
  };

  const guessWord = (event) => {
    event.preventDefault();

    socket.emit('guess', { guess, room });
  };

  const guessHandler = (event) => {
    setGuess(event.target.value);
  };

  return (
    <div className='App'>
      {!joinedGame && (
        <Welcome
          onJoin={joinGame}
          chooseRoom={chooseRoom}
          chooseUserName={chooseUserName}
          isRoomChosen={room.length > 0}
        />
      )}
      {joinedGame && userName && room && (
        <>
          <h2>
            Hey {userName}! You are playing in room named: {room}
          </h2>
          <h3>You have {points} points in total!</h3>
        </>
      )}
      {joinedGame && isYourTurn && (
        <ChooseWord
          setChosenWord={chooseWord}
          setLevelPoints={chooseLevelPoints}
        />
      )}
      {joinedGame && !isYourTurn && !finishedDrawing && (
        <LoadingSpinner
          message='wait until your opponent finish drawing...'
          spinnerProps={{ size: 50 }}
        />
      )}
      {chosenWord && isYourTurn && (
        <>
          <h1>Your word to draw is: {chosenWord}</h1>
          <Drawing
            socket={socket}
            room={room}
            onFinishDrawing={finishDrawing}
          />
        </>
      )}
      {finishedDrawing && imageToGuess && !isYourTurn && (
        <Guessing
          drawToGuess={imageToGuess}
          onSubmitGuess={guessWord}
          onChangeGuess={guessHandler}
        />
      )}
      {/* {joinedGame && !isYourTurn && finishedGame && (
        <h1>You guessed it champ!!!!!</h1>
      )} */}
    </div>
  );
}

export default App;

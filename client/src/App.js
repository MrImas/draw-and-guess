import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Welcome from './pages/Welcome';
import ChooseWord from './pages/ChooseWord';
import Drawing from './pages/Drawing';
import Guessing from './pages/Guessing';

import './App.css';
import LoadingSpinner from './components/LoadingSpinner';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

const socket = io(process.env.REACT_APP_BACKEND_URL, {
  transports: ['websocket'],
});

function App() {
  const [joinedGame, setJoinedGame] = useState(false);
  const [room, setRoom] = useState('');
  const [userName, setUserName] = useState('');
  const [startGame, setStartGame] = useState(false);
  const [isYourTurn, setIsYourTurn] = useState(false);
  const [level, setLevel] = useState('');
  const [chosenWord, setChosenWord] = useState('');
  const [levelPoints, setLevelPoints] = useState(1);
  const [finishedDrawing, setFinishedDrawing] = useState(false);
  const [imageToGuess, setImageToGuess] = useState('');
  const [guess, setGuess] = useState('');
  const [points, setPoints] = useState(0);
  const [finishedGame, setFinishedGame] = useState(false);

  useEffect(() => {
    socket.on('start_game', (data) => {
      setStartGame(true);
      setIsYourTurn(data.yourTurn);
    });

    socket.on('word_to_draw', (data) => {
      setChosenWord(data.word);
    });

    socket.on('start_guessing', (data) => {
      setImageToGuess(data.canvasData);
      setFinishedDrawing(true);
    });

    socket.on('finished_game', () => {
      setFinishedGame(true);
    });

    socket.on('earned_points', (data) => {
      setLevelPoints(data.points);
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
      setFinishedDrawing(false);
      setImageToGuess('');
      setGuess('');
    }
  }, [finishedGame]);

  const joinGame = () => {
    if (room !== '' && userName !== '') {
      socket.emit('join_room', { room, userName });
      setJoinedGame(true);
    }
  };

  const chooseRoom = (roomName) => {
    setRoom(roomName);
  };

  const chooseUserName = (userNameChosen) => {
    setUserName(userNameChosen);
  };

  const chooseLevel = (level) => {
    socket.emit('chosen_level', { level, room });
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
    <ThemeProvider theme={theme}>
      <div className='App'>
        {!joinedGame && (
          <Welcome
            onJoin={joinGame}
            chooseRoom={chooseRoom}
            chooseUserName={chooseUserName}
            isRoomChosen={room.length > 0}
            isUserNameChosen={userName.length > 0}
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
        {joinedGame && !startGame && (
          <LoadingSpinner
            message='waiting for another player to join room...'
            spinnerProps={{ size: 50 }}
          />
        )}
        {startGame && isYourTurn && <ChooseWord chooseLevel={chooseLevel} />}
        {startGame && !isYourTurn && !finishedDrawing && (
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
    </ThemeProvider>
  );
}

export default App;

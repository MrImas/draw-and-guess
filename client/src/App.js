import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Welcome from './pages/Welcome';
import ChooseWord from './pages/ChooseWord';
import Drawing from './pages/Drawing';
import Guessing from './pages/Guessing';

import './App.css';
import GameData from './components/GameData';
import StyledLoadingSpinner from './components/UI/LoadingSpinner/StyledLoadingSpinner';
import { Container } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
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
  const [opponentName, setOpponentName] = useState('');
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
      setOpponentName(data.opponentName);
    });

    socket.on('word_to_draw', (data) => {
      setChosenWord(data.word);
    });

    socket.on('start_guessing', (data) => {
      setImageToGuess(data.canvasData);
      setFinishedDrawing(true);
    });

    socket.on('wrong_guess', (data) => {
      alert(data.message);
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
      } else {
        alert('Your opponent guessed the word correctly.');
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

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='sm'>
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
            <GameData
              userName={userName}
              room={room}
              points={points}
              opponentName={opponentName}
            />
          )}
          {startGame && isYourTurn && (
            <ChooseWord
              canChangeWord={!finishedDrawing}
              chooseLevel={chooseLevel}
            />
          )}
          {startGame && !isYourTurn && !finishedDrawing && (
            <StyledLoadingSpinner
              message='wait until your opponent finish drawing...'
              spinnerProps={{ size: 50 }}
            />
          )}
          {chosenWord && isYourTurn && (
            <>
              <Drawing
                socket={socket}
                room={room}
                chosenWord={chosenWord}
                onFinishDrawing={finishDrawing}
              />
            </>
          )}
          {finishedDrawing && imageToGuess && !isYourTurn && (
            <Guessing
              drawToGuess={imageToGuess}
              onSubmitGuess={guessWord}
              onChangeGuess={setGuess}
            />
          )}
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;

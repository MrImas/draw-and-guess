import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import path from 'path';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import router from './router.js';
import { Game } from './Game/Game.js';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  );
  next();
});
app.use(router);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, './public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

let games = {};

io.on('connection', (socket) => {
  socket.on('join_room', (data) => {
    socket.join(data.room);
    const numOfPlayersInRoom = io.sockets.adapter.rooms.get(data.room).size;
    if (numOfPlayersInRoom === 1) {
      games = {
        ...games,
        [data.room]: new Game(data.room, socket.id, data.userName),
      };
    }
    if (numOfPlayersInRoom === 2) {
      games[data.room].startGame(socket.id, data.userName);
    }
  });

  socket.on('chosen_level', (data) => {
    games[data.room].chosenLevel(data.level);
  });

  socket.on('finished_drawing', (data) => {
    games[data.room].finishedDrawing(data.canvasData);
  });

  socket.on('guess', async (data) => {
    games[data.room].guess(data.guess);
  });

  socket.on('disconnect', () => {});
});

mongoose
  .connect(
    `mongodb+srv://ofir:ehO3LLdVQjJrGTtD@draw-and-guess.r5ozk.mongodb.net/draw-and-guess?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    server.listen(PORT, () => {});
  });

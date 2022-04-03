import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

let firstPlayerId;
let secondPlayerId;
let word;
let levelPoints;

io.on('connection', (socket) => {
  socket.on('join_room', (data) => {
    socket.join(data.room);
    const numOfPlayersInRoom = io.sockets.adapter.rooms.get(data.room).size;
    if (numOfPlayersInRoom === 1) {
      io.to(socket.id).emit('your_turn', true);
      firstPlayerId = socket.id;
    } else {
      io.to(socket.id).emit('your_turn', false);
      secondPlayerId = socket.id;
    }
  });

  socket.on('chose_word', (data) => {
    word = data.word;
  });

  socket.on('level_points', (data) => {
    levelPoints = data.levelPoints;
  });

  socket.on('finished_drawing', (data) => {
    socket.to(data.room).emit('draw_image', {
      canvasData: data.canvasData,
    });
  });

  socket.on('guess', (data) => {
    if (data.guess === word) {
      io.to(data.room).emit('game_finished', { finished: true, levelPoints });
    } else {
      io.to(data.room).emit('game_finished', { finished: false });
    }
  });

  socket.on('disconnect', () => {});
});

server.listen(3001, () => {});

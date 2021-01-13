import express from 'express';
import path from 'path';
import http from 'http';
import socketio from 'socket.io';


const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = 6000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on port: ${PORT}`));
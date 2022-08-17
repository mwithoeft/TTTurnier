import express from 'express';
import helmet from "helmet";
import { createServer } from "http";
import { Server } from "socket.io";
import { EventManager } from './event-manager';


const app = express();
app.use(helmet());

const options = {};
const httpServer = createServer(options, app);


const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

const port = process.env.PORT || 3000;
app.set('port', port);
httpServer.listen(app.get('port'), function () {
  console.log('Running on: ', port);
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('getActiveEvents', () => {
        socket.emit('activeEvents', EventManager.getEvents());
    });
});


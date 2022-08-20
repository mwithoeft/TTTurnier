import express from 'express';
import helmet from "helmet";
import { createServer } from "http";
import { Server } from "socket.io";
import { EventManager } from './event-manager';
import { UserManager } from './user-manager';


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

UserManager.loadUsers();

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        UserManager.logout(socket.id);
        console.log('user disconnected');
    });

    socket.on('loginUser', ({ username, password }) => {
        const user = UserManager.login(username, password, socket.id);
        socket.emit('loginUser', { id: user?.id, username: user?.username });
    });

    socket.on('validateUser', ({ id, username, timestamp }) => {
        const success = UserManager.validateUser(id, username, timestamp, socket.id);
        socket.emit('validateUser', success);
    });

    socket.on('logoutUser', () => {
        const success = UserManager.logout(socket.id);
        console.log('logout', success);
        socket.emit('logoutUser', success);
    });

    socket.on('getActiveEvents', () => {
        socket.emit('getActiveEvents', EventManager.getEvents());
    });

    socket.on('registerUser', ({ username, password }) => {
        const success = UserManager.createUser(username, password);
        socket.emit('registerUser', success);
    });

    socket.on('changePassword', ({ userId, oldPassword, newPassword }) => {
        const success = UserManager.changePassword(userId, oldPassword, newPassword);
        socket.emit('changePassword', success);
    });

});


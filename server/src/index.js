import express from 'express';
import httpServer from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import forterData from './forter-data.json' assert { type: "json" };

const app = express();

app.use(cors());
const http =  httpServer.createServer(app);

http.listen(3000, () => {
    console.log('listening on *:3000');
});

const io = new Server(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.get('/data', (req, res) => {
    res.json(forterData);
});

app.get('/network-overview', (req, res) => {
    res.json(forterData.widgets[0]);
});

app.get('/customer-overview', (req, res) => {
    setTimeout(() => {
        res.json(forterData.widgets[1]);
    }, 5000);
});

io.on('connection', (socket) => {
    console.log('new connection');
    io.emit('new connection', 'new connection');
});

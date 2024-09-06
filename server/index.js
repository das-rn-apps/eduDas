import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import ApiRouter from './controllers/Routes.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8081',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

const PORT = process.env.PORT || 1000;

(async () => {
    try {
        await connectDB();
    } catch (err) {
        console.error('Database connection failed', err);
        process.exit(1);
    }

    // Middleware setup
    app.use(cors()); // Enable CORS
    app.use(express.json({ limit: '5mb' }));
    app.use(express.urlencoded({ limit: '5mb', extended: true }));

    // Routes setup
    app.use('/', ApiRouter);

    // Socket.IO setup
    io.on('connection', (socket) => {
        // console.log(socket.id, 'is online');

        socket.on('send_message', (message) => {
            // console.log(message);
            io.emit('receive_message', message);
        });

        socket.on('disconnect', () => {
            // console.log(socket.id, 'went offline');
        });
    });

    // Start server
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();

require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = http.createServer(app);
const wss = new WebSocket.Server({ server: httpServer });

const start = async () => {
    try {
        await mongoose
            .connect(process.env.DB_URL)
            .then(() => console.log(`Connected to MongoDB, cluster Chat01`))
            .catch((err) => console.log(err));

        httpServer.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}\nWebSocket Server listening on ws://localhost:${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();

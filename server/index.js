require('dotenv').config();
const express = require('express');
const http = require('http');

const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


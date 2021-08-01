const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

require('dotenv').config();

require('./config/environment');
require('./database');

const routes = require('./routes/index');
const configPassport = require('./passport/passport-config');

const assetFolder = path.resolve(__dirname, '../dist/');
const port = process.env.PORT;
const app = express();

const server = http.createServer(app);
const io = new Server(server);
require('./socket')(io);

app.use(express.static(assetFolder));
app.use(express.json());

configPassport(app, express);

app.use('/', routes);

server.listen(port, () => console.log(`Server is listening on port ${port}`));

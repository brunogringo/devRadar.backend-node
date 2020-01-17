const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');

const {setupWebSocket} = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://USUARIO:SENHA@cluster0-n3ju3.gcp.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//libera para acesso externo
app.use(cors());

// essa configuração é necessária para a aplicação entender o JSON
app.use(express.json());

// usar o arquivo de rotas
app.use(routes);

server.listen(3333);
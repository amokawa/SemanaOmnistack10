const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const routes = require('./routes');
const { setupWebSocket } = require('./websocket.js');
const cors = require('cors'); // >>> To avoid CORS issues when running or debugging locally

const app = express();

const server = http.Server(app);
setupWebSocket(server);

/**
 * Use the MongoDB Atlas to get a Free account and start up the server with MongoDB:
 * https://www.mongodb.com/cloud/atlas
 * 
 * [MongoDB Atlas] Additional information:
 * - Don't forget to setup the network access!
 */
const dbString = "MongoDB_Atlas_provided_connection_URL";

mongoose.connect(dbString,  {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true
    }).catch(
      error => console.log(
        `Check your MongoDB connection settings at src/index.js and restart the application >>> `, 
        error));

app.use(cors()); // >> To avoid CORS issues when running or debugging locally
app.use(express.json()); // >> To accept body with JSON
app.use('/api', routes);
server.listen(3333);
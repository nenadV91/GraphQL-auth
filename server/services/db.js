const mongoose = require('mongoose');

const {
  DB_HOST,
  DB_NAME
} = process.env;

const mongoURI = `mongodb://${DB_HOST}/${DB_NAME}`;
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.on('error', error => console.log(error));
mongoose.connection.once('open', () => console.log("Connected to mongo server."))
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Routes = require('./routes/v1');
const dotenv = require('dotenv');

dotenv.config();

//set up express  app
const app = express();

//connect to mongodb
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/books';

const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV !== 'test') {
  mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
  }); // local
  //, { useNewUrlParser: true }
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('connected to mongoo'); // we're connected!
  });
}

//body parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//initilize routes
Routes(app);

module.exports = {
  app
};

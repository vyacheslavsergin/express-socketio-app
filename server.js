const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');

const container = require('./container');

container.resolve(function (users) {

  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/footballkik', {
    // useMongoClient: true
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const app = setExpress();

  function setExpress() {
    const app = express();
    const server = http.createServer(app);

    server.listen(3000, function () {
      console.log('Listening on port 3000');
    });

    configureExpress(app);

    const router = require('express-promise-router')();

    users.setRouting(router);

    app.use(router);
  }

  function configureExpress(app) {
    require('./passport/passport-local');

    app.use(express.static('public'));
    app.use(cookieParser());
    app.set('view engine', 'ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(session({
      secret: 'thisissecretkey',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        mongooseConnection: mongoose.connection
      })
    }));

    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());
  }

});

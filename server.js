const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const socketIO = require('socket.io');
const { Users } = require('./helpers/UsersClass')

const container = require('./container');

container.resolve(function (users, _, admin, home, group) {

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
    // const io = socketIO('socket.io')(server);
    const io = socketIO(server);

    server.listen(3000,  () => {
      console.log('Listening on port 3000');
    });

    configureExpress(app, io);

    require('./socket/groupchat')(io, Users);

    const router = require('express-promise-router')();
    users.setRouting(router);
    admin.setRouting(router);
    home.setRouting(router);
    group.setRouting(router);

    app.use(router);
  }

  function configureExpress(app) {
    require('./passport/passport-local');

    app.use(express.static('public'));
    app.use(cookieParser());
    app.set('view engine', 'ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(validator());
    app.use(session({
      secret: 'thisissecretkey',
      // secret: '',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        mongooseConnection: mongoose.connection
      })
    }));

    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());

    app.locals._ = _;
  }

});

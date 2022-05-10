const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require("passport")
const LocalStrategy = require("passport-local")
const passportJWT = require("passport-jwt")
const session = require("express-session")
const mongoose = require("mongoose")
const User = require("./models/User")

const uri = "mongodb://localhost:27017/mongo-auth"

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongDB connected successfully.")
})

const FileStore = require("session-file-store")(session)

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const indexRouter = require('./routes/api');

const app = express();
app.use(session({
  store: new FileStore(),
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user))
})

passport.use(new LocalStrategy({
  usernameField: "email",
}, (email, password, done) => {
  User.findOne({username: email}).then((user) => {
    if(!user){
      done(null, false, {message: "Invalid username / password"})
    }
    user.comparePassword(password, (err, matched) => {
      if(err){
        throw err
      }
      if(matched) {
        done(null, user)
      } else {
        done(null, false, { message: "Invalid username / password" })
      }
    })
  })
}))

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "jwt_secret"
}, (jwt_paylod, done) => {
  User.findById(jwt_paylod.user._id, ( err, user ) => done(err, user))
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, "client/build")));

app.use('/api', indexRouter);

app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname + "/client/build/index.html"))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;

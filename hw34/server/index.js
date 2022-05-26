const express = require(`express`);
const path = require('path');
const session = require('express-session');

const router = require(`./router`);

const app = express();

app.use(session({
  secret: 'loftschool',
  key: 'key',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: null
  },
  saveUninitialized: false,
  resave: false
}));

app.all('/', function (req, res, next) {
  req.session.views = req.session.views === void 0
    ? 0
    : req.session.views;
  req.session.views++;
  next();
})

app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

app.use(express.static(`server/static`));

app.set('views', 'client/template/pages');
app.set('view engine', 'pug');

app.use(`/`, router);

app.get(`*`, (_, res) => {
  res.status(404);
  return res.render(`error`);
});

const HOSTNAME = process.env.SERVER_HOST || `localhost`;
const PORT = process.env.SERVER_PORT || 3000;
const SERVER_INFO_MESSAGE = `Server running at http://${HOSTNAME}:${PORT}/`;

module.exports = {
  run() {
    app.listen(PORT, HOSTNAME, () => {
      console.log(SERVER_INFO_MESSAGE);
    });
  },
  app
};
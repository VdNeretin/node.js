const { Router } = require(`express`);
const bodyParser = require(`body-parser`);
const fs = require('fs');
const db = require('../store')();

const pageController = require('../controllers/page');
const mailController = require('../controllers/mail');
const loginController = require('../controllers/login');
const adminController = require('../controllers/admin');
const productsController = require('../controllers/products');
const skillsController = require('../controllers/skills');

const router = new Router();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});

let icon, robot;

router.get('/favicon.ico', (req, res, next) => {
  if (!icon) icon = fs.readFileSync(process.cwd() + '/server/static/favicon.ico');
  res.type('image/x-icon');
  res.send(icon);
});

router.get('/robot.txt', (req, res, next) => {
  if (!robot) robot = fs.readFileSync(process.cwd() + '/server/static/robots.txt');
  res.type('text/plain');
  res.send(robot);
});

router.get(`/`, pageController);
router.post(`/mail`, jsonParser, urlencodedParser, mailController);
router.get(`/login`, loginController.get);
router.post(`/login`, jsonParser, urlencodedParser, loginController.post);
router.post(`/products`, productsController);
router.post(`/skills`, jsonParser, urlencodedParser, skillsController);
router.get(`/admin`, adminController);

module.exports = router;
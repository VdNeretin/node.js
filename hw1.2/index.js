const http = require('http');
require('dotenv').config();
const getCurrentDate = require('./time');

let id = 0;

http
  .createServer(function (res, req) {
    if (res.url !== '/') {
      return false;
    }

    id++;
    const intervalId = setInterval(() => {
      console.log(id, getCurrentDate());
    }, process.env.INTERVAL_TIME);

    setTimeout(() => {
      clearInterval(intervalId);
      req.end(getCurrentDate());
    }, process.env.STOP_TIMER_TIME);
  })
  .listen(process.env.SERVER_PORT);

console.log(`HTTP server running on port ${process.env.SERVER_PORT}`);

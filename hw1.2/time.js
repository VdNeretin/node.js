const moment = require('moment');

function getCurrentDate () {
  return moment().format('DD.MM.YYYY, HH:mm:ss');
}

module.exports = getCurrentDate;

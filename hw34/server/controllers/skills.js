const db = require('../store')();

const fildsName = ['age', 'concerts', 'cities', 'years'];

const controller = (req, res) => {
  const { age, concerts, cities, years } = req.body;
  const data = db.stores.skills.store;
  let isValid = true;

  [age, concerts, cities, years].forEach((item, i) => {
    const isNotNumber = parseInt(item, 10) === NaN;
    if (item < 0 || isNotNumber) {
      isValid = false;
      return;
    }
    db.stores.skills.store[i].number = item;
  });

  if (!isValid) {
    return res.redirect('/admin/?msgskill=некорректно');
  }

  db.save();
  return res.redirect('/admin/?msgskill=обновлено');
};

module.exports = controller;
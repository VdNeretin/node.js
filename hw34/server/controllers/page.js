const db = require('../store')();

const controller = (req, res) => {
  return res.render(`index`, {
    products: db.stores.products.store,
    skills: db.stores.skills.store,
    msgemail: req.query.msgemail
  });
}

module.exports = controller;
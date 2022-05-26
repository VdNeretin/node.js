const db = require('../store')();

const controller = (req, res, next) => {
  if (req.session.isAdmin) {
    return res.render('admin', {
      msgfile: req.query.msgfile,
      msgskill: req.query.msgskill,
      skills: db.stores.skills.store
    });
  }
  next();
};

module.exports = controller;
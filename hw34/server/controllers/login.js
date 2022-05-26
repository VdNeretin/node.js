const db = require('../store')();

const get = (req, res) => {
  if (req.session.isAdmin) {
    return res.redirect('/admin');
  }

  return res.render(`login`, {
    msgslogin: req.query.msgslogin
  });
}

const post = (req, res) => {
  const { email, password } = req.body;
  const data = db.stores.login.store;

  if (email === data.email && password === data.password) {
    req.session.isAdmin = true;
    return res.redirect('/admin');
  }

  return res.redirect('/login?msgslogin=неверный логин или пароль');
}

module.exports = {
  get, post
};

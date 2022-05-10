const express = require('express');
const passport = require("passport")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router();

router.post("/register", (req, res, next) => {
  const {username, password} = req.body;
  User.create({username, password}).then((user) => {
    req.login(user, (err) => {
      if(err) {
        next(err)
      }

      const body = { _id: user._id, username: user.username };
      const token = jwt.sign({user: body}, "jwt_secret")
      return res.json({ token })
    })
  }).catch((err) => {
    if(err.name == "ValidationError") {
      res.send("Sorry, that username is already taken")
    } else {
      next(err)
    }
  })

})

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if(err){
      return next(err)
    }
    if(!user){
      return res.send("Wrong email or password")
    }
    req.login(user, () => {
      const body = { _id: user.id, email: user.email }

      const token = jwt.sign({user: body}, "jwt_secret")

      return res.json({ token })
    })
  })(req, res, next)
})

router.get("/secret", passport.authenticate("jwt", { session: false }), (req, res) => {
  if(!req.user) {
    res.json({
      username: "nobody"
    })
  }
  res.json(req.user)
})

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/")
})

module.exports = router;

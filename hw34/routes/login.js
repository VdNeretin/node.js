const express = require('express')
const {authorization} = require("../service");
const router = express.Router()

router.get('/', (req, res, next) => {
    if (req.session.authorization) {
        return res.redirect('/admin')
    }
    res.render('pages/login', {title: 'SigIn page', msglogin: req.flash('login')[0]})
})

router.post('/', (req, res, next) => {
    try {
        authorization(req.body)
        req.session.authorization = true
        return res.redirect('/admin')
    } catch (e) {
        req.flash('login', e.message)
    }

    res.redirect('/login')

})

module.exports = router

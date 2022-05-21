const express = require('express')
const router = express.Router()
const {products, skills} = require('../data.json')
const {sendMail} = require("../service");

router.get('/', (req, res, next) => {
    res.render('pages/index', {title: 'Main page', products, skills, msgemail: req.flash('mail')[0]})
})

router.post('/', (req, res, next) => {
    // TODO: Реализовать функционал отправки письма.
    try {
        sendMail(req.body)
        req.flash('mail', 'Письмо успешно отправлено')
    } catch (error) {
        req.flash('mail', error.message)
    }

    res.redirect('/#mail')
})

module.exports = router

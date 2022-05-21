const bcrypt = require('bcrypt');
const db = require('../db')
const sendMail = (data) => {
    const {email, message, name} = data

    if (!email || !message || !name) {
        throw new Error('Validation failed');
    }

    console.log('Mail Send');
}


const reqistration = (data) => {
    try {
        const {email, password} = data;
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        db.get('users').push({
            email, hash
        }).write()


    } catch (e) {
        throw new Error(e.message);
    }
}


const authorization = (data) => {
    const {email, password} = data;
    const user = db.get('users').find({email}).value();

    if (!user){
        throw new Error('Неверное имя пользователя\\пароль');
    }

    if (!bcrypt.compareSync(password, user.hash)){
        throw new Error('Неверное имя пользователя\\пароль');
    }
}
module.exports = {
    sendMail,
    reqistration,
    authorization

}

const {reqistration} = require('./service')
const {email, password} = process.env

// Run example
// email=test1@test.ru password=123123 node reqUsers.js
try{
    reqistration({email, password})
    console.log('Done')
}catch (e) {
    console.log(e.message);
}

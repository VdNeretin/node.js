const low = require('lowdb')
const path = require('path')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(path.resolve(process.cwd(), 'data.json'))
const db = low(adapter)

db.defaults({users: []}).write()

module.exports = db 
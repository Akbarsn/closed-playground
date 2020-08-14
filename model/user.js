const mongoose = require('mongoose')
const schema = mongoose.Schema

const UserSchema = schema({
    username: String,
    password: String,
    email: String
})

module.exports = mongoose.model("User", UserSchema)
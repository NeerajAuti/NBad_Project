const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6,
    }
}, {collection: 'Users'})

module.exports = mongoose.model('Users',UsersSchema)
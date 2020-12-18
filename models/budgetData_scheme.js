const mongoose = require('mongoose')

const budgetDataSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
        maxlength: 7,
        unique: true,
    },
    username: {
        type: String,
        trim: true,
        required: true,
    },
    expense: {
        type: Number,
        trim: true,
        required: true,
    },
    month: {
        type: String,
        trim: true,
        required: true,
    }
}, {collection: 'budgetData'})

module.exports = mongoose.model('budgetData',budgetDataSchema)
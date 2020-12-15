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
    }
}, {collection: 'budgetData'})

module.exports = mongoose.model('budgetData',budgetDataSchema)
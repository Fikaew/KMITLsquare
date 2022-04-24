const mongoose = require('mongoose')
const testSchema = mongoose.Schema(
    {
        text: {
        type: String,
        required: [true, 'Please add text value']
        }   
    },
    {
        timestamps: true,
    })

module.exports = mongoose.model('Test', testSchema)
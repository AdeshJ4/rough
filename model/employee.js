const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 20,
        required: true
    },
    age: {
        type: Number,
        min: 10,
        max: 100,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Employee', employeeSchema);

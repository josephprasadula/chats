const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    sentMessages: {
        type: [String],
        required: false
    },
    receivedMessages: {
        type: [String],
        required: false
    }
})

module.exports = mongoose.model('Users',userSchema);
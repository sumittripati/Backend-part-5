let mongoose = require('mongoose');

let contactSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
    },
    message : {
        type: String,
        require: true,
    }
});

let Contact = new mongoose.model('Contact', contactSchema);
module.exports = Contact;

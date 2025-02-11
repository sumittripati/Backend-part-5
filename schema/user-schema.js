let mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone : {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

// hashing the password

 userSchema.pre('save', async function(next) {
    // console.log("this", this);
    let userData = this;

    if (!userData.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashedPassword;
    } catch (error) {
        // console.log("error in hashing password", error);
        return next(error);
        
    }
 }); // pre is a middleware which is used to perform some operation before saving the data in the database and next is used to move to the next middleware and is used to stop the execution of the code

let User = mongoose.model('User', userSchema);
module.exports = User;
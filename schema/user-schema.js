let mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

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
        return next(error);  // next is used to move to the next middleware
    }
 }); 

// generate token

userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign(
            {
                userID: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin 
            },
            process.env.SECRET_KEY,
            { 
                expiresIn: '20d' 
            }
        );
    } catch (error) {
        console.log("error in genrating token", error);     
    }
}

let User = mongoose.model('User', userSchema);
module.exports = User;
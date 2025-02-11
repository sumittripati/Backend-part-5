const User = require('../schema/user-schema');
// const bcrypt = require('bcryptjs');

let Home = async (req, res) => {
    try {
        res.send('Hello');
    } catch (error) {
        console.log( " controller side error", error);
    }
}

// register user

let register = async (req, res) => {
    try {
        const { username, email, phone, password, isAdmin } = req.body;

        let Existuser = await User.findOne({ email: email });
        if (Existuser) {
            return res.status(400).json({ msg: "User already exists" });   // return used to stop the execution of the code
        }

        // hashing the password

        let Newuser = await User.create({ username, email, phone, password, isAdmin });
        res.status(200).json({ msg: Newuser });
    } catch (error) {
        console.log( " controller side error", error);
    }
}

// login user

let login = async (req, res) => {
    try {
        res.send('login');
    } catch (error) {
        console.log( " controller side error", error);  
    }
}

// contact user

let contact = async (req, res) => {
    try {
        res.send('contact');
    } catch (error) {
        console.log( " controller side error", error);
    }
}

// logout user

let logout = async (req, res) => {
    try {
        res.send('logout');
    } catch (error) {
        console.log( " controller side error", error);
    }
}

module.exports = { Home, register, login, contact, logout };
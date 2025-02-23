const User = require('../schema/user-schema');
const contactMessage = require('../schema/contact-schema');
const bcrypt = require('bcryptjs');

let Home = async (req, res) => {
    try {
        // res.status(200).json({ msg: "Welcome to the home page" });
        res.send('Welcome to the home page');
    } catch (error) {
        console.log( " controller side error", error);
    }
}

// register user

// let register = async (req, res) => {
//     try {
//         const { username, email, phone, password, isAdmin } = req.body;

//         let Existuser = await User.findOne({ email: email });
//         if (Existuser) {
//             return res.status(400).json({ msg: "User already exists" });   // return used to stop the execution of the code
//         }

//         let Newuser = await User.create({ username, email, phone, password, isAdmin });
//         // add token
//         res.status(200).json({
//             msg: "Newser register successfully", 
//             token: await Newuser.generateToken(), 
//             userID : Newuser._id.toString()
//         })
//     } catch (error) {
//         console.log( " controller side error", error);
//     }
// }

let register = async (req, res) => {
    try {
        const { username, email, phone, password, isAdmin } = req.body;

        let Existuser = await User.findOne({ email: email });
        if (Existuser) {
            console.log("User already exists");
            return res.status(400).json({ msg: "User already exists" });
        }

        let Newuser = await User.create({ username, email, phone, password, isAdmin });
  
        if (Newuser) {
            console.log("Data stored in the database successfully.");
        } else {
            console.log("Data not stored in the database.");
        }
        // add token
        res.status(200).json({
            msg: "User registered successfully",
            token: await Newuser.generateToken(),
            userID: Newuser._id.toString()
        });
    } catch (error) {
        console.log("Controller side error:", error);
        console.log("Data not stored in the database.");
        res.status(500).json({ msg: "Internal server error" });
    }
};


// login user

let login = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const { email, password } = req.body;
        let Notregistered_user = await User.findOne({ email: email });
        console.log("Notregistered_user", Notregistered_user);
        if (!Notregistered_user) {
            return res.status(400).json({ msg: "User not found Please register first" });
        }
        const logonRegistered_user = await bcrypt.compare(password, Notregistered_user.password); 

        if (!logonRegistered_user) {
            return res.status(401).json({ msg: "Invalid email or password" });  // 401 for unauthorized access
        }

        if(logonRegistered_user) {
            return res.status(200).json({
                msg: "User login successfully", 
                token: await Notregistered_user.generateToken(),
                userID : Notregistered_user._id.toString()
            });
        }
        res.send('login');
    } catch (error) {
        console.log( " controller side error", error);  
        return res.status(500).json({ msg: "Internal server error" }); 
    }
}

// contact user

const contact = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const { message } = req.body;

        // req.user is available because of authenticateUser middleware
        const { username, email } = req.user; 

        // Save the message to the database
        await contactMessage.create({ username, email, message });

        return res.status(200).json({ msg: "Message sent successfully" });

    } catch (error) {
        console.log("Controller side error", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

// logout user

let logout = async (req, res) => {
    try {
        res
    } catch (error) {
        console.log( " controller side error", error);
    }
}

module.exports = { Home, register, login, contact, logout };
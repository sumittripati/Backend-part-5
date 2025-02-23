let User = require("../schema/user-schema")
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        console.log(users);
        if(!users || users.length === 0 ){
            return res.status(404).json({ message: "No users found" });
        }
       return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users in dashboard :", error);
    }
}

module.exports = getAllUsers ;
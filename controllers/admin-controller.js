let User = require("../schema/user-schema")
let Contact = require("../schema/contact-schema");
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

// single user logic

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 });
        return res.status(200).json(data);
    } catch (error) {
        next(error)
        console.error(" Error fetching user by id in dashboard :", error);
    }
}

// update user logic

const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateUserData = req.body;

        // Ensure that only allowed fields are updated
        const updatedData = await User.findByIdAndUpdate(
            id, 
            { $set: updateUserData }, // Properly use $set
            { new: true, runValidators: true } // Return updated user & validate fields
        );

        if (!updatedData) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User updated successfully", updatedData });
    } catch (error) {
        console.error("Error updating user in dashboard:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};


// user delete logic

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.deleteOne({ _id: id });
        return res.status(200).json(message = "User deleted successfully");
    } catch (error) {
        next(error)
        console.error("Error deleting user in dashboard :", error);
    }
}

// get all conttacts

const getAllContacts = async (req, res) => {
    try {
        let contacts = await Contact.find();
        console.log(contacts);
        if(!contacts || contacts.length === 0 ){
            return res.status(404).json({ message: "No contacts found" });
        }
        return res.status(200).json(contacts);
    } catch (error) {
        console.error("Error fetching contacts in dashboard :", error);
    }
}

// contact delete logic

const deleteContactById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Contact.deleteOne({ _id: id });
        return res.status(200).json(message = "contact deleted successfully");
    } catch (error) {
        next(error)
        console.error("Error deleting user in dashboard :", error);
    }
}

module.exports = {getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById} ;
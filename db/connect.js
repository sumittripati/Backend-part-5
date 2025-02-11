let mongoose = require('mongoose');
const URL = process.env.MONGODB_URL;

let connect = async () => {
    try {
        await mongoose.connect(URL)
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Database connection failed', error);
    }
}

module.exports = connect;
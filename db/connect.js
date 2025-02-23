// let mongoose = require('mongoose');
// const URL = process.env.MONGODB_URL;

// let connect = async () => {
//     try {
//         await mongoose.connect(URL)
//         console.log('Database connected successfully');
//     } catch (error) {
//         console.log('Database connection failed', error);
//     }
// }

// module.exports = connect;




let mongoose = require('mongoose');
require('dotenv').config(); // Ensure environment variables are loaded

const URL = process.env.MONGODB_URL;

let connect = async () => {
    try {
        await mongoose.connect(URL);
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1); // Stop server if DB connection fails
    }
};

module.exports = connect;

require("dotenv").config();
let express = require('express');
let Routes = require('./routes/routers');
let connect = require('./db/connect');
const app = express();

app.use(express.json());

app.use('/api/backend', Routes);

connect().then(() => {
    console.log('Database connected successfully');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
}).catch((error) => {
    console.log('Database connection failed', error);
})

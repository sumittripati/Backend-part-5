require("dotenv").config();
var cors = require('cors')
let express = require('express');
let Routes = require('./routes/routers');
let connect = require('./db/connect');
const errorHandler = require("./middleware/error-middleware");
const serviceRoute = require("./routes/service-router")
const adminRoute = require("./routes/admin-router");
const app = express();
const PORT = process.env.PORT || 3000;

console.log("PORT", PORT);
// const fetchData
var corsOptions = {
    origin: ['http://localhost:5173'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  
app.use(cors(corsOptions))

app.use(express.json());

app.use('/api/backend', Routes);
app.use("/api/data", serviceRoute)

// admin route

app.use("/api/admin", adminRoute)

app.use(errorHandler)

connect().then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on port, ${PORT}`);
    })
}).catch((error) => {
    console.log('Database connection failed', error);
})

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./database/db");
const cors = require("cors");
const cloudinary = require("cloudinary");
const acceptMultiparty = require("connect-multiparty");
const passwordReset=require('./routes/passwordReset');
const healthInfoRoutes = require('./routes/healthInfoRoutes');
const categoryRoutes=require('./routes/categoryRoutes');


// Making express app
const app = express();

// dotenv config
dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(acceptMultiparty());

// CORS config to accept request from frontend
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.set('view engine', 'ejs')
app.use(express.urlencoded({
  extended: true
}))

// MongoDB connection
connectDB();

// Accepting json
app.use(express.json());
// app.use(bodyParser.json({}));
// app.use(bodyParser.urlencoded({ extended: true }));
// Test route

// app.use(xss());

app.get("/test", (req, res) => {
  res.status(200).send("Hello from server");
});

// User routes
app.use("/api/user", require("./routes/userRoutes"));

app.use("/api/order", require("./routes/orderRoute")); 
app.use("/api/product", require("./routes/productRoutes")); 
app.use("/api/article", require("./routes/articleRoutes")); 
app.use('/api/healthinfo', healthInfoRoutes);
app.use("/api/category", categoryRoutes);
app.use('/api/user', healthInfoRoutes);
app.use("/api/calendar", require('./routes/calendarRoutes'))


// Define port and start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Exporting app
module.exports = app;
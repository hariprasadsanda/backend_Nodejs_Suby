const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoute = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
// const cors = require('cors');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();
// app.use(cors())

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DATABASE CONNECTED SUCCESSFULLY"))
  .catch((error) => console.log("DATABASE CONNECTION ERROR:", error));

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON data
app.use('/uploads', express.static('uploads')); // Serve static files

// Routes
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoute);
app.use('/product', productRoutes);

app.use('/home', (req, res) => {
  res.send("<h1>Welcome to Suby</h1>");
});

// 404 Error Handling
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Server
app.listen(PORT, () => {
  console.log(`Server created and running at ${PORT}`);
});

app.use('/',(res,req)=>{
    res.send("<h1>Welcome to SUBY")
})

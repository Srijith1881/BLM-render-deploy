const bloodRequestRoutes = require('./routes/bloodRequest');
const express = require('express');
const cors = require('cors');
const dbConn = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json());

// const corsconfig = {
//     origin: process.env.CORSURL
//   };
app.use(cors(
  {
    origin: ["http://localhost:5173"],
  }
))

// Routes
app.use('/api/blood-request', bloodRequestRoutes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

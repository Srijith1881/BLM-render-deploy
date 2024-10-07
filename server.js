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
    origin: ["https://blood-report-management.vercel.app/"],
    methods: ["GET","PUT", "POST", "DELETE"],
    credentials: true,
  },
))

// Routes
app.use('/api/blood-request', bloodRequestRoutes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

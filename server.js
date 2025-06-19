const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const MenuRoutes = require('./router/menu');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin:     ["http://localhost:5173","https://frontend-test-i1s2.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

connectDB();
app.use(express.json());


app.use('/api/menu', MenuRoutes);

 
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});


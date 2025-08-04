import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

mongoose.connect('mongodb://localhost:27017/MOMENTUM');

const app = express();
const PORT = 3000;


app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { addUserToDatabase, loggedInUser } from './controllers/userController.js'
import { checkInForm, aiDailyPlan } from './controllers/userCheckInController.js'

dotenv.config();

mongoose.connect('mongodb://localhost:27017/MOMENTUM')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

app.post('/api/signup', addUserToDatabase, (req, res) => {
  res.status(200).json(res.locals.user);
});

app.post('/api/login', loggedInUser, (req, res) => {
  res.status(200).json(res.locals.userInDatabase);
});

app.post('/api/home', checkInForm, aiDailyPlan, (req, res) => {
  res.status(200).json(res.locals.response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

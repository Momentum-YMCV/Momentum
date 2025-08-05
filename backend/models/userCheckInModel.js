import mongoose from 'mongoose';

const userCheckInSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  goal: { type: String, required: true },
  challenge: { type: String, required: true },
  planText: { type: String, required: true }
});

export default mongoose.model('UserCheckIn', userCheckInSchema);
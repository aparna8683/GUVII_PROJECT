import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  role: {
    type: String,
    required: true
  },
  topicsToFocus: {
    type: String,
    required: true 
  },
  experience: {
    type: String,
    required: true
  },
  questions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Question"
  },
  description: {
    type: String
  },
}, {
  timestamps: true
});

const Session = mongoose.model("Session", sessionSchema);
export default Session;
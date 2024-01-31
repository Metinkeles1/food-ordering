// models/About.js
import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,    
  },
  img: {
    type: String,
    required: true,    
  } 
}, { timestamps: true });

export default mongoose.models.About || mongoose.model('About', AboutSchema);

import mongoose from 'mongoose';
import db from '../db.js';

let schema = new mongoose.Schema({
    id: String,
    answers: [{
        message_type: String,
        correct: Number,
        question: String,
        message: String,
        ts: Number,
    }]
});
export default mongoose.model('User', schema);

import mongoose from "mongoose";
const { Schema } = mongoose;

const ContactSchema = new Schema({
    username: { type: String, ref: 'users', required: true },
    feedback: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

export const ContactUser = mongoose.model('Contacts', ContactSchema);
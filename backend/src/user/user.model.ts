import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
    accessToken: { type: String }
})

export default mongoose.model('user', userSchema)
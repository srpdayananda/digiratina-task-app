import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Date, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'user' }
})

export default mongoose.model('book', bookSchema)
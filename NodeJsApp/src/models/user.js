import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('User', userSchema);
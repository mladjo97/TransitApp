import mongoose from 'mongoose';
import { Gender } from './enums';

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
        },
        address: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: Object.values(Gender),
            required: true
        },
        userType: {
            type: Schema.Types.ObjectId,
            ref: 'UserType',
            required: true
        },
        documentImageUrl: {
            type: String,
            required: false,
            default: null
        },
        verifiedDocumentImage: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('User', userSchema);
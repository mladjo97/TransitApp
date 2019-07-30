import { Schema, model } from 'mongoose';
import { Gender } from './enums';


const userSchema = new Schema({
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
            type: Date,
            required: true
        },
        gender: {
            type: Number,
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
        },
        tickets: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Ticket'
            }
        ]
    },
    {
        timestamps: true
    }
);

export default model('User', userSchema);
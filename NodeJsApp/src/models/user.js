import { Gender } from './enums';
import { Schema, model } from 'mongoose';

import Role from '@models/role';
import UserType from '@models/userType';


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
        passwordHash: {
            type: String,
            required: true
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
        role: {
            type: Schema.Types.ObjectId,
            ref: 'Role',
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

/**
 *  Post hook for adding foreign keys 
 */
userSchema.post('save', async (doc, next) => {

    await UserType.findOne({ _id: doc.userType }, (err, res) => {        
        res.users.push(doc._id);
        res.save();
    });

    await Role.findOne({ _id: doc.role }, (err, res) => {       
        res.users.push(doc._id);
        res.save();
    });

    next();
});

export default model('User', userSchema);
import { Schema, model } from 'mongoose';

const userTypeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },

        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

        discounts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'UserTypeDiscount'
            }
        ]
    }
);

export default model('UserType', userTypeSchema);
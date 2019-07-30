import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
        ]
    }
);

export default mongoose.model('UserType', userTypeSchema);
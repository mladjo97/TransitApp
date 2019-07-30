import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
    timeOfPurchase: {
        type: Date,
        default: Date.now
    },
    isValid: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default model('Ticket', ticketSchema);
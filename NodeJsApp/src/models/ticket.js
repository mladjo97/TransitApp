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
        ref: 'User',
        required: true
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'PriceListItem',
        required: true
    }
});

export default model('Ticket', ticketSchema);
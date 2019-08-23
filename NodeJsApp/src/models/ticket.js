import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
    timeOfPurchase: {
        type: Date,
        default: Date.now
    },
    isValid: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'PriceListItem',
        required: true
    },
    order: {
        type: String,
        required: true
    }
});

export default model('Ticket', ticketSchema);
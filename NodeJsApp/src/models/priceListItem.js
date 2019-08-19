import { Schema, model } from 'mongoose';

const priceListItemSchema = new Schema({
    basePrice: {
        type: Number,
        required: true
    },
    ticketType: {
        type: Schema.Types.ObjectId,
        ref: 'TicketType',
        required: true
    },
    priceList: {
        type: Schema.Types.ObjectId,
        ref: 'PriceList',
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    userType: {
        type: Schema.Types.ObjectId,
        ref: 'UserType',
        required: true
    }
});

export default model('PriceListItem', priceListItemSchema);
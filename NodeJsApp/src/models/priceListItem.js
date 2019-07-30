import { Schema, model } from 'mongoose';

const priceListItemSchema = new Schema({
    basePrice: {
        type: Schema.Types.Decimal128,
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
        type: Schema.Types.ObjectId,
        ref: 'UserTypeDiscount',
        required: false,
        default: null
    }
});

export default model('PriceListItem', priceListItemSchema);
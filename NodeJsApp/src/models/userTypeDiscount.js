import { Schema, model } from 'mongoose';

const userTypeDiscountSchema = new Schema({
    discount: {
        type: Schema.Types.Decimal128,
        required: true
    },
    userType: {
        type: Schema.Types.ObjectId,
        ref: 'UserType',
        required: true
    },
    priceListItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'PriceListItem'
        }
    ]
});

export default model('UserTypeDiscount', userTypeDiscountSchema);
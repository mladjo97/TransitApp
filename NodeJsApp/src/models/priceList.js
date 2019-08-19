import { Schema, model } from 'mongoose';

const priceListSchema = new Schema(
    {
        validFrom: {
            type: Date,
            required: true
        },
        validUntil: {
            type: Date,
            required: true
        },
        priceListItems: [
            {
                type: Schema.Types.ObjectId,
                ref: 'PriceListItem'
            }
        ]
    },
    {
        versionKey: 'rowVersion'
    }
);

export default model('PriceList', priceListSchema);
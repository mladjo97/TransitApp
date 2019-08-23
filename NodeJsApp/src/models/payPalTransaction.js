import { Schema, model } from 'mongoose';

const payPalTransactionSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },
        ticket: {
            type: Schema.Types.ObjectId,
            ref: 'Ticket',
            required: true
        },
        payerEmail: {
            type: String,
            required: false,
            default: ''
        },
        payerId: {
            type: String,
            required: false,
            default: ''
        },
        transactionId: {
            type: String,
            required: true
        }
    }
);

export default model('PayPalTransaction', payPalTransactionSchema);
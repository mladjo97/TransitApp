import { Schema, model } from 'mongoose';

const ticketTypeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },

        tickets: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Ticket'
            }
        ]
    }
);

export default model('TicketType', ticketTypeSchema);
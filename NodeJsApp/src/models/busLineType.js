import { Schema, model } from 'mongoose';

const busLineTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    busLines: [
        {
            type: Schema.Types.ObjectId,
            ref: 'BusLine'
        }
    ]
});

export default model('BusLineType', busLineTypeSchema);
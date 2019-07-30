import { Schema, model } from 'mongoose';

const stationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false,
        default: null
    },
    lat: {
        type: Schema.Types.Decimal128,
        required: true
    },
    long: {
        type: Schema.Types.Decimal128,
        required: true
    },
    busLineStations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'BusLineStation'
        }
    ]
});

export default model('Station', stationSchema);
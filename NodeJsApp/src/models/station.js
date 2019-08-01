import { Schema, model } from 'mongoose';

const stationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: false,
        default: null
    },
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
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
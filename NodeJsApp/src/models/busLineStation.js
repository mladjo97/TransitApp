import { Schema, model } from 'mongoose';

const busLineStationSchema = new Schema({
    busLine: {
        type: Schema.Types.ObjectId,
        ref: 'BusLine',
        required: true
    },
    station: {
        type: Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    stopOrder: {
        type: Number,
        required: true
    }
});

export default model('BusLineStation', busLineStationSchema);
import { Schema, model } from 'mongoose';

const busLineSchema = new Schema({
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
    busLineType: {
        type: Schema.Types.ObjectId,
        ref: 'BusLineType'
    },
    busLineStations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'BusLineStation'
        }
    ],
    timetable: [
        {
            type: Schema.Types.ObjectId,
            ref: 'StartTime'
        }
    ]
});

export default model('BusLine', busLineSchema);
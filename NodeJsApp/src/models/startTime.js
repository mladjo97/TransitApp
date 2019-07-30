import { Schema, model } from 'mongoose';
import { DayOfWeek } from './enums';

const startTimeSchema = new Schema({
    time: {
        type: Date,
        required: true
    },
    dayOfWeek: {
        type: Number,
        enum: Object.values(DayOfWeek)
    },
    busLine: {
        type: Schema.Types.ObjectId,
        ref: 'BusLine',
        required: true
    }
});

export default model('StartTime', startTimeSchema);
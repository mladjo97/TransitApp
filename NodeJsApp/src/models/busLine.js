import { Schema, model } from 'mongoose';

const busLineSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: false,
            default: ''
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
    },
    {
        versionKey: 'rowVersion'
    }
);

/**
 *  Post hook for adding references 
 */
// busLineSchema.post('save', async (doc, next) => {    
//     await BusLineType.findOne({ _id: doc.busLineType }, (err, res) => {
//         if(err) return;
        
//         if(!res.busLines.includes(doc._id)) {
//             res.busLines.push(doc._id);
//             res.save();
//         }
//     });

//     next();
// });


export default model('BusLine', busLineSchema);
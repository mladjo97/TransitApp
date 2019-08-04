import mongoose from 'mongoose';

import BusLine from '@models/busLine';
import StartTime from '@models/startTime';
import BusLineStation from '@models/busLineStation';

export const getAllBusLines = async () => {
    const busLines = await BusLine.find()
        .populate('timetable', '_id time dayOfWeek')
        .populate('busLineStations', '_id station stopOrder');

    return busLines;
};

export const getBusLineById = async (id) => {
    const busLine = await BusLine.findById(id)
        .populate('timetable', '_id time dayOfWeek')
        .populate('busLineStations', '_id station stopOrder');

    return busLine;
};

export const createBusLine = async (busLine) => {
    const { timetable, stations } = busLine;

    const newBusLine = new BusLine({
        name: busLine.name,
        description: busLine.description,
        busLineType: busLine.busLineType
    });

    /**
     *  Create a session for multi-document transaction
     */
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        /**
         *  Save the initial BusLine
         */
        const dbBusLine = await newBusLine.save({ session: session }).then(
            busLineDoc => {
                return busLineDoc;
            },
            err => { throw err; }
        );

        /**
         *  Create BusLineStation and Timetable (StartTime) array models
         *  for reference table insertion
         */
        const busLineStations = stations.map(station => {
            return {
                ...station,
                busLine: dbBusLine._id
            };
        });

        const busLineTimetable = timetable.map(time => {
            return {
                ...time,
                busLine: dbBusLine._id
            };
        });

        /**
         *  Note: https://mongoosejs.com/docs/transactions.html
         *  Mongoose doesn't create collections with transactions
         *  so we have to do that manually
         */
        await StartTime.createCollection();
        await BusLineStation.createCollection();

        /**
         *  Save the previously created StartTime and BusLineStation references
         */
        const dbTimetableIds = await StartTime.create(busLineTimetable, { session: session }).then(
            (startTimeDocs) => {
                return startTimeDocs.map(time => time._id);
            },
            err => { throw err; }
        );

        const dbBusLineStationIds = await BusLineStation.create(busLineStations, { session: session }).then(
            (busLineStationDocs) => {
                return busLineStationDocs.map(station => station._id);
            },
            err => { throw err; }
        );

        /**
         *  In the end, update the new BusLine so it has 
         *  ObjectId references to StartTime and BusLineStations
         */
        const createdBusLine = await BusLine.findOne({ _id: dbBusLine._id }).session(session).then(
            async (busLine) => {
                // add the references
                dbTimetableIds.map(id => busLine.timetable.push(id));
                dbBusLineStationIds.map(id => busLine.busLineStations.push(id));

                //save the references
                await busLine.save({ session: session }, async (err) => {
                    if (err) throw err;
                    // commit the transaction to the database
                    await session.commitTransaction();
                });

                return busLine;
            },
            err => { throw err; }
        );

        /**
         *  Populate the newly created BusLine and return it
         */
        await createdBusLine.populate('timetable', '_id time dayOfWeek').execPopulate();
        await createdBusLine.populate('busLineStations', '_id station stopOrder').execPopulate();
        
        return createdBusLine;

    } catch (error) {
        /**
         *  Rollback the transaction if anything fails
         *  and throw an error for further processing
         */
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export const updateBusLine = async (id, busLine) => {
    const updatedBusLine = await BusLine.findByIdAndUpdate(id, busLine, { useFindAndModify: false, new: true });
    if (!updatedBusLine) return null;
    return updatedBusLine;
};

export const deleteBusLine = async (id) => {
    const deleteBusLine = await BusLine.findByIdAndDelete(id);
    return deleteBusLine;
};

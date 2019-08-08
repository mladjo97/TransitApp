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
    const busLine = await BusLine.findOne({ _id: id }).then(
        async busLineDoc => {
            if (!busLineDoc) throw new Error('NotFound');

            await busLineDoc.populate('timetable', '_id time dayOfWeek').execPopulate();
            await busLineDoc.populate('busLineStations', '_id station stopOrder').execPopulate();

            return busLineDoc;
        },
        err => { throw err; }
    );

    return busLine;
};

/**
 *  Service method for inserting new BusLine document
 * @param {*} busLine BusLine object/model
 */
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
        await BusLine.createCollection();
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
                    console.log('[CREATE_BUSLINE] Committing database changes.');
                    await session.commitTransaction();
                    session.endSession();
                    console.log('[CREATE_BUSLINE] Successfully committed database changes.');
                });

                /**
                 *  Populate the newly created BusLine and return it
                 */
                await busLine.populate('timetable', '_id time dayOfWeek').execPopulate();
                await busLine.populate('busLineStations', '_id station stopOrder').execPopulate();

                return busLine;
            },
            err => { throw err; }
        );

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

/**
 * Service method for updating existing BusLine document
 * @param {ObjectId} id BusLine ObjectId
 * @param {*} busLine BusLine object/model
 */
export const updateBusLine = async (id, busLine) => {
    /**
     *  Create a session for multi-document transaction
     */
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        /**
         *  Check if the BusLine exists
         */
        const dbBusLine = await BusLine.findOne({ _id: busLine.id }).session(session).then(
            busLineDoc => {
                if (busLineDoc.rowVersion !== +busLine.rowVersion)
                    throw new Error('DbConcurrencyError');

                return busLineDoc;
            },
            err => { throw err; }
        );

        /**
         *  Delete any old references to the BusLine
         *  and create new reference collections
         */
        await BusLineStation.deleteMany(
            { _id: dbBusLine.busLineStations },
            { session: session },
            (err) => { if (err) throw err; });

        await StartTime.deleteMany(
            { _id: dbBusLine.timetable },
            { session: session },
            (err) => { if (err) throw err; });

        const busLineStations = busLine.stations.map(station => {
            return {
                ...station,
                busLine: dbBusLine._id
            };
        });

        const busLineTimetable = busLine.timetable.map(time => {
            return {
                ...time,
                busLine: dbBusLine._id
            };
        });

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
        const updatedBusLine = await BusLine.findOne({ _id: dbBusLine._id }).session(session).then(
            async (busLineDoc) => {
                /**
                 *  Update data and references
                 */
                busLineDoc.name = busLine.name || busLineDoc.name;
                busLineDoc.description = busLine.description || busLineDoc.description;
                busLineDoc.busLineType = busLine.busLineType || busLineDoc.busLineType;

                while (busLineDoc.timetable.length)
                    busLineDoc.timetable.pop();

                while (busLineDoc.busLineStations.length)
                    busLineDoc.busLineStations.pop();

                dbTimetableIds.map(id => busLineDoc.timetable.push(id));
                dbBusLineStationIds.map(id => busLineDoc.busLineStations.push(id));

                /**
                 *  Save the changes
                 */
                await busLineDoc.save({ session: session }, async (err) => {
                    if (err) throw err;
                    // commit the transaction to the database
                    console.log('[UPDATE_BUSLINE] Committing database changes.');
                    await session.commitTransaction();
                    session.endSession();
                    console.log('[UPDATE_BUSLINE] Successfully committed database changes.');
                });

                /**
                 *  Populate the newly created BusLine and return it
                 */
                await busLineDoc.populate('timetable', '_id time dayOfWeek').execPopulate();
                await busLineDoc.populate('busLineStations', '_id station stopOrder').execPopulate();

                return busLineDoc;
            },
            err => { throw err; }
        );

        return updatedBusLine;

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

export const deleteBusLine = async (id) => {
    await BusLine.findOne({ _id: id }).then(
        async (busLineDoc) => {
            console.log('[DELETE_BUSLINE] Found BusLine with ObjectId: ' + busLineDoc._id);
            await StartTime.deleteMany({ _id: busLineDoc.timetable });
            await BusLineStation.deleteMany({ _id: busLineDoc.busLineStations });
            await BusLine.deleteOne({ _id: busLineDoc._id });
            console.log('[DELETE_BUSLINE] Deleted BusLine with ObjectId: ' + busLineDoc._id);
        },
        err => { throw err; }
    );

    return id;
};

export const getCount = () => {
    return BusLine.countDocuments((err, count) => {
        if (err) throw err;
        return count;
    });
};

export const filterByBusLineId = async (busLineTypeId) => {
    const busLines = await BusLine.find({ busLineType: busLineTypeId })
        .populate('timetable', '_id time dayOfWeek')
        .populate('busLineStations', '_id station stopOrder');

    return busLines;
};

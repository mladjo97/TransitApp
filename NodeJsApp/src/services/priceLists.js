import mongoose from 'mongoose';
import PriceList from '@models/priceList';
import PriceListItem from '@models/priceListItem';

export const getAllPriceLists = async () => {
    const priceLists = await PriceList.find()
        .populate({
            path: 'priceListItems',
            members: 'basePrice discount priceList ticketType userType',
            populate: {
                path: 'ticketType userType',
                members: '_id name'
            }
        });

    return priceLists;
};

export const getPriceListById = async (id) => {
    const priceList = await PriceList.findOne({ _id: id })
        .populate({
            path: 'priceListItems',
            members: 'basePrice discount ticketType userType',
            populate: {
                path: 'ticketType userType',
                members: '_id name'
            }
        });

    return priceList;
};

export const getActivePriceList = async () => {
    const currentDate = new Date();
    const priceList = await PriceList.findOne({
        validFrom: { $lt: currentDate },
        validUntil: { $gt: currentDate }
        })
        .populate({
            path: 'priceListItems',
            members: 'basePrice discount ticketType userType',
            populate: {
                path: 'ticketType userType',
                members: '_id name'
            }
        });

    return priceList;
};

export const createPriceList = async (priceList) => {
    const { priceListItems } = priceList;

    // initial service validation
    if (priceListItems.length < 12)
        throw new Error('BadRequest');

    // date validation
    const isValid = await validatePriceListDate(priceList.validFrom, priceList.validUntil);
    if (!isValid)
        throw new Error('Conflict');

    // initial pricelist document
    const newPriceList = new PriceList({
        validFrom: priceList.validFrom,
        validUntil: priceList.validUntil
    });

    /**
     *  Create a session for multi-document transaction
     */
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        /**
         *  Save the initial PriceList
         */
        await PriceList.createCollection();
        const dbPriceList = await newPriceList.save({ session: session }).then(
            priceListDoc => {
                return priceListDoc;
            },
            err => { throw err; }
        );

        /**
         *  Create PriceListItem array model
         *  for reference table insertion
         */
        const newPriceListItems = priceListItems.map(item => {
            return {
                ticketType: item.ticketTypeId,
                userType: item.userTypeId,
                basePrice: item.basePrice,
                discount: item.discount / 100,
                priceList: dbPriceList._id
            };
        });

        /**
         *  Note: https://mongoosejs.com/docs/transactions.html
         *  Mongoose doesn't create collections with transactions
         *  so we have to do that manually
         */
        await PriceListItem.createCollection();

        /**
        *  Save the previously created PriceListItem references
        */
        const dbPriceListItemIds = await PriceListItem.create(newPriceListItems, { session: session }).then(
            (priceListItemDocs) => {
                return priceListItemDocs.map(item => item._id);
            },
            err => { throw err; }
        );


        /**
         *  In the end, update the new PriceList so it has 
         *  ObjectId references to PriceListItems
         */
        const createdPriceList = await PriceList.findOne({ _id: dbPriceList._id }).session(session).then(
            async (priceListDoc) => {
                // add the references
                dbPriceListItemIds.map(id => priceListDoc.priceListItems.push(id));

                //save the references
                await priceListDoc.save({ session: session }, async (err) => {
                    if (err) throw err;
                    // commit the transaction to the database
                    console.log('[CREATE_PRICELIST] Committing database changes.');
                    await session.commitTransaction();
                    session.endSession();
                    console.log('[CREATE_PRICELIST] Successfully committed database changes.');
                });

                /**
                 *  Populate the newly created PriceList and return it
                 */
                await priceListDoc.populate('priceListItems', '_id ticketType userType discount').execPopulate();

                return priceListDoc;
            },
            err => { throw err; }
        );

        return createdPriceList;


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

export const updatePriceList = async (id, priceList) => {
    const { priceListItems } = priceList;

    // // initial service validation
    // if (priceListItems.length < 12)
    //     throw new Error('BadRequest');

    // date validation
    const isValid = await validatePriceListDate(priceList.validFrom, priceList.validUntil, id);
    if (!isValid)
        throw new Error('Conflict');

    /**
     *  Create a session for multi-document transaction
     */
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        /**
         *  Check if the PriceList exists
         */
        const dbPriceList = await PriceList.findOne({ _id: id }).session(session).then(
            priceListDoc => {
                if (priceListDoc.rowVersion !== +priceList.rowVersion)
                    throw new Error('DbConcurrencyError');

                return priceListDoc;
            },
            err => { throw err; }
        );

        /**
         *  Delete any old references to the PriceListItems
         *  and create new reference collection
         */
        await PriceListItem.deleteMany(
            { _id: dbPriceList.priceListItems },
            { session: session },
            (err) => { if (err) throw err; });

        const newPriceListItems = priceListItems.map(item => {
            return {
                ticketType: item.ticketTypeId,
                userType: item.userTypeId,
                basePrice: item.basePrice,
                discount: item.discount / 100,
                priceList: dbPriceList._id
            };
        });

        const dbPriceListItemIds = await PriceListItem.create(newPriceListItems, { session: session }).then(
            priceListItemDocs => {
                return priceListItemDocs.map(item => item._id);
            },
            err => { throw err; }
        );

        /**
         *  In the end, update the new BusLine so it has 
         *  ObjectId references to StartTime and BusLineStations
         */
        const updatedPriceList = await PriceList.findOne({ _id: dbPriceList._id }).session(session).then(
            async (priceListDoc) => {
                /**
                 *  Update data and references
                 */
                priceListDoc.validFrom = priceList.validFrom || priceListDoc.validFrom;
                priceListDoc.validUntil = priceList.validUntil || priceListDoc.validUntil;

                while (priceListDoc.priceListItems.length)
                    priceListDoc.priceListItems.pop();

                dbPriceListItemIds.map(id => priceListDoc.priceListItems.push(id));

                /**
                 *  Save the changes
                 */
                await priceListDoc.save({ session: session }, async (err) => {
                    if (err) throw err;
                    // commit the transaction to the database
                    console.log('[UPDATE_PRICELIST] Committing database changes.');
                    await session.commitTransaction();
                    session.endSession();
                    console.log('[UPDATE_PRICELIST] Successfully committed database changes.');
                });

                /**
                 *  Populate the newly created PriceList and return it
                 */
                await priceListDoc.populate('priceListItems', '_id ticketType userType discount').execPopulate();

                return priceListDoc;
            },

            err => { throw err; }
        );

        return updatedPriceList;

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

export const deletePriceList = async (id) => {
    await PriceList.findOne({ _id: id }).then(
        async (priceListDoc) => {
            console.log('[DELETE_PRICELIST] Found PriceList with ObjectId: ' + priceListDoc._id);
            await PriceListItem.deleteMany({ _id: priceListDoc.priceListItems });
            await PriceList.deleteOne({ _id: priceListDoc._id });
            console.log('[DELETE_PRICELIST] Deleted PriceList with ObjectId: ' + priceListDoc._id);
        },
        err => { throw err; }
    );

    return id;
};

const validatePriceListDate = async (validFrom, validUntil, id = -1) => {
    validFrom = new Date(validFrom);
    validUntil = new Date(validUntil);

    const priceLists = await PriceList.find();
    let isValid = true;

    for (let i = 0; i < priceLists.length; i++) {
        if (priceLists[i]._id == id) {
            continue;
        }

        const priceListValidFrom = new Date(priceLists[i].validFrom);
        const priceListValidUntil = new Date(priceLists[i].validUntil);

        if (priceListValidFrom <= validFrom && validFrom <= priceListValidUntil) {
            isValid = false;
            break;
        }

        if (priceListValidFrom <= validUntil && validUntil <= priceListValidUntil) {
            isValid = false;
            break;
        }
    }

    return isValid;
};

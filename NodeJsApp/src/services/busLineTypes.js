import BusLineType from '@models/busLineType';

export const getAllBusLineTypes = async () => {
    const busLineTypes = await BusLineType.find();
    return busLineTypes;
};

export const getBusLineTypeById = async (id) => {
    const busLineType = await BusLineType.findById(id);
    return busLineType;
};

export const createBusLineType = async (busLineType) => {
    const newBusLineType = await BusLineType.create(busLineType);
    if (!newBusLineType) throw new Error('BusLineType cannot be created.');
    return newBusLineType;
};

export const updateBusLineType = async (id, busLineType) => {
    const updatedBusLineType = await BusLineType.findByIdAndUpdate(id, busLineType, { useFindAndModify: false, new: true });
    if (!updatedBusLineType) return null;
    return updatedBusLineType;
};

export const deleteBusLineTypeById = async (id) => {
    const deletedBusLineType = await BusLineType.findByIdAndDelete(id);
    return deletedBusLineType;
};

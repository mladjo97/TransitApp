import BusLine from '@models/busLine';

export const getAllBusLines = async () => {
    const busLines = await BusLine.find();
    return busLines;
};

export const getBusLineById = async (id) => {
    const busLine = await BusLine.findById(id);
    return busLine;
};

export const createBusLine = async (busLine) => {
    const newBusLine = await BusLine.create(busLine);
    if (!newBusLine) throw new Error('BusLine cannot be created.');

    return newBusLine;
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

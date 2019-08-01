import Station from '@models/station';

export const getAllStations = async () => {
    const stations = await Station.find();
    return stations;
};

export const getStationById = async (id) => {
    const station = await Station.findById(id);
    return station;
};

export const createStation = async (station) => {
    const newStation = await Station.create(station);
    if (!newStation) throw new Error('Station cannot be created.');
    return newStation;
};

export const updateStation = async (id, station) => {
    const updatedStation = await Station.findByIdAndUpdate(id, station, { useFindAndModify: false, new: true });
    if (!updatedStation) return null;
    return updatedStation;
};

export const deleteStation = async (id) => {
    const deleteStation = await Station.findByIdAndDelete(id);
    return deleteStation;
};
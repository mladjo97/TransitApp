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
    const updatedStation = await Station.findOne({ _id: id }).then(
        async (stationDoc) => {
            if(stationDoc.rowVersion !== +station.rowVersion)
                throw new Error('DbConcurrencyError');

            stationDoc.name = station.name || stationDoc.name;
            stationDoc.address = station.address || stationDoc.address;
            stationDoc.lon = station.lon || stationDoc.lon;
            stationDoc.lat = station.lat || stationDoc.lat;
            stationDoc.rowVersion += 1; // fix: nece auto increment ovde?

            await stationDoc.save((err) => {
                if(err) throw err;
                console.log('[UPDATE_STATION] Successfully updated station.');
            });
            
            return stationDoc;
        },
        err => { throw err; }
    );

    return updatedStation;
};

export const deleteStation = async (id) => {
    const deleteStation = await Station.findByIdAndDelete(id);
    return deleteStation;
};
import Station from '@models/station';
import * as stationsService from '@services/stations';

export const getAllStations = async (req, res, next) => {
    try {
        const stations = await stationsService.getAllStations();
        return res.status(200).json(stations);
    } catch (error) {
        return next(error);
    }
};

export const getStationById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const station = await stationsService.getStationById(id);
        return res.status(200).json(station);
    } catch (error) {
        return next(error);
    }
};

export const postStation = async (req, res, next) => {
    const {
        name,
        description,
        lat,
        lon
    } = req.body;

    const newStation = new Station({
        name: name,
        description: description || '',
        lat: lat,
        lon: lon
    });

    try {
        const dbStation = await stationsService.createStation(newStation);
        return res.status(200).json(dbStation);
    } catch (error) {
        return next(error);
    }
};

export const putStation = async (req, res, next) => {
    const { id } = req.params;

    const {
        name,
        address,
        lat,
        lon,
        rowVersion
    } = req.body;

    const updatedStation = new Station({
        _id: id,
        name: name,
        address: address || '',
        lat: lat,
        lon: lon,
        rowVersion: rowVersion
    });

    try {
        const dbStation = await stationsService.updateStation(id, updatedStation);
        return res.status(200).json(dbStation);
    } catch (error) {
        return next(error);
    }
};

export const deleteStation = async (req, res, next) => {
    const { id } = req.params;

    try {
        await stationsService.deleteStation(id);
        return res.status(200).json({ id: id });
    } catch (error) {
        return next(error);
    }
};
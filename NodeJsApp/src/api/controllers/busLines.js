import * as busLinesService from '@services/busLines';

export const getAllBusLines = async (req, res, next) => {
    try {
        const busLines = await busLinesService.getAllBusLines();
        return res.status(200).json(busLines);
    } catch (error) {
        return next(error);
    }
};

export const getBusLineById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const busLine = await busLinesService.getBusLineById(id);
        return res.status(200).json(busLine);
    } catch (error) {
        return next(error);
    }
};

export const postBusLine = async (req, res, next) => {
    const {
        name,
        description,
        busLineTypeId,
        timetable,
        busLineStations
    } = req.body;

    // todo: automapper za js ?
    const newBusLine = {
        name: name,
        description: description || '',
        busLineType: busLineTypeId,
        timetable: timetable.map(startTime => {
            return {
                time: startTime.time,
                dayOfWeek: +startTime.dayOfWeek
            };
        }),
        stations: busLineStations.map(station => {
            return {
                station: station.stationId,
                stopOrder: station.stopOrder
            };
        })
    };
    
    try {
        const dbBusLine = await busLinesService.createBusLine(newBusLine);
        return res.status(200).json(dbBusLine);
    } catch (error) {
        return next(error);
    }
};

export const putBusLine = async (req, res, next) => {
    const { id } = req.params;

    const {
        name,
        description,
        busLineTypeId,
        timetable,
        busLineStations,
        rowVersion
    } = req.body;

    const updatedBusLine = {
        id: id,
        rowVersion: rowVersion,
        name: name,
        description: description || '',
        busLineType: busLineTypeId,
        timetable: timetable.map(startTime => {
            return {
                time: startTime.time,
                dayOfWeek: +startTime.dayOfWeek
            };
        }),
        stations: busLineStations.map(station => {
            return {
                station: station.stationId,
                stopOrder: station.stopOrder
            };
        })
    };

    try {
        const dbBusLine = await busLinesService.updateBusLine(id, updatedBusLine);
        return res.status(200).json(dbBusLine);
    } catch (error) {
        return next(error);
    }
};

export const deleteBusLine = async (req, res, next) => {
    const { id } = req.params;

    try {
        await busLinesService.deleteBusLine(id);
        return res.status(200).json({ id: id });
    } catch (error) {
        return next(error);
    }
};
import BusLineType from '@models/busLineType';
import * as busLineTypeService from '@services/busLineTypes';

export const getAllBusLineTypes= async (req, res, next) => {
    try {
        const users = await busLineTypeService.getAllBusLineTypes();
        return res.status(200).json(users);
    } catch (error) {
        return next(error);
    }
};

export const getBusLineTypeById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await busLineTypeService.getBusLineTypeById(id);
        return res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};

export const postBusLineType = async (req, res, next) => {  
    const { name } = req.body;

    const newBusLineType = new BusLineType({ name: name });

    try {
        const dbBusLineType = await busLineTypeService.createBusLineType(newBusLineType);
        return res.status(200).json(dbBusLineType);
    } catch (error) {
        return next(error);
    }
};

export const putBusLineType = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    const updatedBusLineType = new BusLineType({ _id: id, name: name });
       
    try {
        const dbBusLineType = await busLineTypeService.updateBusLineType(id, updatedBusLineType);
        return res.status(200).json(dbBusLineType);
    } catch (error) {
        return next(error);
    }
};

export const deleteBusLineType = async (req, res, next) => {
    const { id } = req.params;

    try {
        await busLineTypeService.deleteBusLineTypeById(id);
        return res.status(200).json({ id: id });
    } catch (error) {
        return next(error);
    }
};
import * as ticketTypesService from '@services/ticketTypes';

export const getAllTicketTypes = async (req, res, next) => {
    try {
        const ticketTypes = await ticketTypesService.getAllTicketTypes();
        return res.status(200).json(ticketTypes);
    } catch (error) {
        return next(error);
    }
};

export const getTicketTypeById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const ticketType = await ticketTypesService.getTicketTypeById(id);
        return res.status(200).json(ticketType);
    } catch (error) {
        return next(error);
    }
};

export const postTicketType = async (req, res, next) => {  
    const { name } = req.body;

    const newTicketType = { name: name };

    try {
        const dbTicketType = await ticketTypesService.createTicketType(newTicketType);
        return res.status(200).json(dbTicketType);
    } catch (error) {
        return next(error);
    }
};

export const putTicketType = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    const updatedTicketType = { _id: id, name: name };
       
    try {
        const dbTicketType = await ticketTypesService.updateTicketType(id, updatedTicketType);
        return res.status(200).json(dbTicketType);
    } catch (error) {
        return next(error);
    }
};

export const deleteTicketType = async (req, res, next) => {
    const { id } = req.params;

    try {
        await ticketTypesService.deleteTicketTypeById(id);
        return res.status(200).json({ id: id });
    } catch (error) {
        return next(error);
    }
};

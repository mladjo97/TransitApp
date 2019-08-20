import TicketType from '@models/ticketType';

export const getAllTicketTypes = async () => {
    const ticketTypes = await TicketType.find();
    return ticketTypes;
};

export const getTicketTypeById = async (id) => {
    const ticketType = await TicketType.findOne({ _id: id });
    return ticketType;
};

export const getTicketTypeByName = async (name) => {
    const ticketType = await TicketType.findOne({ name: name }, err => {
        if (err) throw err;
    });
    
    return ticketType;
};

export const createTicketType = async (ticketType) => {
    const newTicketType = await TicketType.create(ticketType);
    if (!newTicketType) throw new Error('TicketType cannot be created.');
    return newTicketType;
};

export const updateTicketType = async (id, ticketType) => {
    const updatedTicketType = await TicketType.findByIdAndUpdate(id, ticketType, { useFindAndModify: false, new: true });
    if (!updatedTicketType) return null;
    return updatedTicketType;
};

export const deleteTicketTypeById = async (id) => {
    const deletedTicketType = await TicketType.findByIdAndDelete(id);
    return deletedTicketType;
};
import Ticket from '@models/ticket';

export const getAllUserTickets = (id) => {
    const tickets = Ticket.find({ user: id })
        .populate('_id isValid')
        .populate('user', '_id firstName lastName email')
        .populate({
            path: 'item',
            select: '_id basePrice ticketType discount',
            populate: {
                path: 'ticketType',
                select: '_id name'
            }
        });

    return tickets;
};

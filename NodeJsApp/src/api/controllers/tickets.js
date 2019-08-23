import * as ticketsService from '@services/tickets';

export const getAllTicketsForUser = async (req, res, next) => {
    const { currentUser } = req.currentUser;

    if (!currentUser)
        return res.status(400).json({ message: 'Bad Request' });

    try {
        const tickets = await ticketsService.getAllUserTickets(currentUser._id);
        const ticketsViewModels = tickets.map(ticket => {
            return {
                ticketId: ticket._id,
                isValid: ticket.isValid,
                ticketType: ticket.item.ticketType.name,
                timeOfPurchase: ticket.timeOfPurchase,
                userFirstName: ticket.user.firstName,
                userLastName: ticket.user.lastName
            };
        });

        return res.status(200).json(ticketsViewModels);
    } catch (error) {
        next(error);
    }
};

export const getTicketById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const ticket = await ticketsService.getTicketById(id);

        const ticketViewModel = {
            ticketId: ticket._id,
            isValid: ticket.isValid,
            ticketType: ticket.item.ticketType.name,
            timeOfPurchase: ticket.timeOfPurchase,
            userFirstName: ticket.user.firstName,
            userLastName: ticket.user.lastName
        };

        return res.status(200).json(ticketViewModel);
    } catch (error) {
        next(error);
    }
};

export const buyTicket = async (req, res, next) => {
    const { orderId, itemId } = req.body;

    try {
        const boughtTicket = await ticketsService.buyTicket(req.currentUser, itemId, orderId);
        return res.status(200).json(boughtTicket);
    } catch (error) {
        next(error);
    }
};

export const buyUnregisteredTicket = async (req, res, next) => {
    const { orderId, itemId } = req.body;

    try {
        const boughtTicket = await ticketsService.buyUnregisteredTicket(itemId, orderId);
        return res.status(200).json(boughtTicket);
    } catch (error) {
        next(error);
    }
};

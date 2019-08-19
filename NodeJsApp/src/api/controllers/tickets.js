import * as ticketsService from '@services/tickets';

export const getAllTicketsForUser = (req, res, next) => {
    const { currentUser } = req.currentUser;

    if (!currentUser)
        return res.status(400).json({ message: 'Bad Request' });

    try {
        const tickets = ticketsService.getAllUserTickets(currentUser._id);
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
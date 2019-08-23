import Ticket from '@models/ticket';
import PayPalTransaction from '@models/payPalTransaction';

import { sendEmail } from '@utils/email';
import payPalClient from '@utils/paypal';
import checkOutPaypalSdk from '@paypal/checkout-server-sdk';

export const getAllUserTickets = async (id) => {
    const tickets = await Ticket.find({ user: id })
        .populate('_id timeOfPurchase isValid')
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

export const getTicketById = async (id) => {
    const ticket = await Ticket.findOne({ _id: id })
        .populate('_id timeOfPurchase isValid')
        .populate('user', '_id firstName lastName email')
        .populate({
            path: 'item',
            select: '_id basePrice ticketType discount',
            populate: {
                path: 'ticketType',
                select: '_id name'
            }
        });

    return ticket;
};

export const buyTicket = async (user, itemId, orderId) => {

    // check if current user is verified
    if (!user.verifiedDocumentImage) {
        throw new Error('BadRequest');
    }

    // check if current user has that ticket
    const userTickets = await Ticket.find({ user: user._id });
    const sameTicket = userTickets.find(ticket => ticket.isValid && ticket.item == itemId);

    if (sameTicket) {
        throw new Error('Conflict');
    }

    // PayPal ordersGetRequest with orderId, check if its valid
    const request = new checkOutPaypalSdk.orders.OrdersGetRequest(orderId);
    const order = await payPalClient.client().execute(request);

    const { result } = order;

    if (result.status !== 'COMPLETED') {
        console.log('BAD STATUS');

        throw new Error('BadRequest');
    }

    // save ticket    
    const newTicket = {
        user: user._id,
        item: itemId,
        order: result.id
    };

    const dbTicket = await Ticket.create(newTicket);
    if (!dbTicket) {
        console.log('no DB TICKET');
        throw new Error('BadRequest');
    }

    // save paypal transaction
    const newPayPalTransaction = {
        user: user._id,
        ticket: dbTicket._id,
        payerEmail: result.payer.email_address,
        payerId: result.payer.payer_id,
        transactionId: result.id
    };

    const dbPayPalTransaction = await PayPalTransaction.create(newPayPalTransaction);
    if (!dbPayPalTransaction) {
        console.log('no DB PAYPAL TRANSACTION');
        throw new Error('BadRequest');
    }

    // send email -- order.payer.email_address
    sendEmail('mldnmilosevic@gmail.com',
        'TransitApp - Successfully purchased a ticket',
        `You have successfully purchased a ticket with id: ${dbTicket._id}`);

    // return ticket
    return dbTicket;
};

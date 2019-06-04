export class PriceListItem {
    BasePrice: number;
    TicketTypeId: number;
    TicketTypeName: string;
    UserTypeId: number;
    UserTypeName: string;
    Discount: number;

    constructor(price: number, ticketTypeId: number, userTypeId: number, discount: number){
        this.BasePrice = price;
        this.TicketTypeId = ticketTypeId;
        this.UserTypeId = userTypeId;
        this.Discount = discount;
    }
}
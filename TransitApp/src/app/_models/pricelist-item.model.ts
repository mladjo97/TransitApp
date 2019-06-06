export class PriceListItem {
    Id: number;
    BasePrice: number;
    TicketTypeId: number;
    TicketTypeName: string;
    UserTypeId: number;
    UserTypeName: string;
    DiscountId: number;
    Discount: number;

    constructor(price: number, ticketTypeId: number, userTypeId: number, discount: number){
        this.BasePrice = price;
        this.TicketTypeId = ticketTypeId;
        this.UserTypeId = userTypeId;
        this.Discount = discount;
    }
}
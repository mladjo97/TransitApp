export class PriceListItem {
    _id: number;
    basePrice: number;
    ticketTypeId: number;
    ticketTypeName: string;
    userTypeId: number;
    userTypeName: string;
    discountId: number;
    discount: number;

    constructor(price: number, ticketTypeId: number, userTypeId: number, discount: number){
        this.basePrice = price;
        this.ticketTypeId = ticketTypeId;
        this.userTypeId = userTypeId;
        this.discount = discount;
    }
}
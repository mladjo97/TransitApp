import { PriceListItem } from './pricelist-item.model';

export class PriceList {
    _id: number;
    validFrom: Date;
    validUntil: Date;
    priceListItems: PriceListItem[];
    rowVersion: any;
}
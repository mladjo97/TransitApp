import { PriceListItem } from './pricelist-item.model';

export class PriceList {
    Id: number;
    ValidFrom: Date;
    ValidUntil: Date;
    PriceListItems: PriceListItem[];
}
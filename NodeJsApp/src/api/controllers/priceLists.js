import * as priceListService from '@services/priceLists';

export const getAllPriceLists = async (req, res, next) => {
    
    try {
        const dbPriceLists = await priceListService.getAllPriceLists();   
        
        // DTO
        const priceListViewModels = dbPriceLists.map(priceList => {
            const priceListItemViewModels = priceList.priceListItems.map(item => {
                return {
                    _id: item._id,
                    basePrice: item.basePrice,
                    discount: item.discount,
                    hasDiscount: item.discount > 0 ? true : false,
                    ticketTypeId: item.ticketType._id,
                    ticketTypeName: item.ticketType.name,
                    userTypeId: item.userType._id,
                    userTypeName: item.userType.name
                };
            });

            return {
                _id: priceList._id,
                validFrom: priceList.validFrom,
                validUntil: priceList.validUntil,
                priceListItems: priceListItemViewModels
            };
        });

        return res.status(200).json(priceListViewModels);
    } catch (error) {
        next(error);
    }
};

export const postPriceList = async (req, res, next) => {
    
    const { validFrom, validUntil, priceListItems } = req.body;
    const priceList = { validFrom, validUntil, priceListItems };

    try {
        const dbPriceList = await priceListService.createPriceList(priceList);    
        return res.status(200).json(dbPriceList);
    } catch (error) {
        next(error);
    }
};
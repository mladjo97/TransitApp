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
                priceListItems: priceListItemViewModels,
                rowVersion: priceList.rowVersion
            };
        });

        return res.status(200).json(priceListViewModels);
    } catch (error) {
        next(error);
    }
};


export const getPriceListById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const dbPriceList = await priceListService.getPriceListById(id);

        // DTO
        const priceListItemViewModels = dbPriceList.priceListItems.map(item => {
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

        const priceListViewModel = {
            _id: dbPriceList._id,
            validFrom: dbPriceList.validFrom,
            validUntil: dbPriceList.validUntil,
            priceListItems: priceListItemViewModels,
            rowVersion: dbPriceList.rowVersion
        };

        return res.status(200).json(priceListViewModel);
    } catch (error) {
        next(error);
    }
};

export const getActivePriceList = async (req, res, next) => {
    try {
        const dbPriceList = await priceListService.getActivePriceList();

        if(!dbPriceList)
            return res.status(200); // or 404 ?

        // DTO
        const priceListItemViewModels = dbPriceList.priceListItems.map(item => {
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

        const priceListViewModel = {
            _id: dbPriceList._id,
            validFrom: dbPriceList.validFrom,
            validUntil: dbPriceList.validUntil,
            priceListItems: priceListItemViewModels,
            rowVersion: dbPriceList.rowVersion
        };

        return res.status(200).json(priceListViewModel);
    } catch (error) {
        next(error);
    }
};

export const getTicketTypePrice = async (req, res, next) => {
    const { ticketTypeId } = req.params;
    const { userType } = req.currentUser;

    try {
        const ticketTypePrice = await priceListService.getTicketTypePrice(ticketTypeId, userType._id.toString());

        return res.status(200).json(ticketTypePrice);
    } catch (error) {
        next(error);
    }
};

export const getRegularPrice = async (req, res, next) => {
    const { ticketTypeId } = req.params;

    try {
        const ticketPrice = await priceListService.getRegularPrice(ticketTypeId);

        return res.status(200).json(ticketPrice);
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

export const putPriceList = async (req, res, next) => {
    const { _id, rowVersion, validFrom, validUntil, priceListItems } = req.body;
    const { id } = req.params;
    const priceList = { validFrom, validUntil, priceListItems, _id, rowVersion };

    try {
        const dbPriceList = await priceListService.updatePriceList(id, priceList);

        // DTO
        const priceListItemViewModels = dbPriceList.priceListItems.map(item => {
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

        dbPriceList.priceListItems = priceListItemViewModels;

        return res.status(200).json(dbPriceList);
    } catch (error) {
        next(error);
    }
};

export const deletePriceList = async (req, res, next) => {
    const { id } = req.params;

    try {
        await priceListService.deletePriceList(id);
        return res.status(200).json({ id: id });
    } catch (error) {
        return next(error);
    }
};
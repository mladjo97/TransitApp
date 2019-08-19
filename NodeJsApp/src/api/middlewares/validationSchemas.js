import Joi from 'joi';

/**
 *  User validation models
 */
export const userSchemas = {
    postUserBindingModel: Joi.object().keys({
        firstName: Joi.string().max(256).required(),
        lastName: Joi.string().max(256).required(),
        password: Joi.string().max(256).required(),
        address: Joi.string().max(256).required(),
        dateOfBirth: Joi.string().max(256).required(),
        gender: Joi.number().min(0).max(1).required(),
        userTypeId: Joi.string().max(256).required(),
        documentImageUrl: Joi.string().max(256),
        image: Joi.binary(),
        email: Joi.string().max(256).email({ minDomainAtoms: 2 }).required()
    }),

    putUserBindingModel: Joi.object().keys({
        _id: Joi.string().required(),
        firstName: Joi.string().max(256).required(),
        lastName: Joi.string().max(256).required(),
        password: Joi.any(),
        address: Joi.string().max(256).required(),
        dateOfBirth: Joi.string().max(256).required(),
        gender: Joi.number().min(0).max(1).required(),
        userTypeId: Joi.string().max(256).required(),
        documentImageUrl: Joi.string().max(256),
        email: Joi.string().max(256).email({ minDomainAtoms: 2 }).required()
    }),

    loginUserBindingModel: Joi.object().keys({
        email: Joi.string().max(256).email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().max(256).required()
    }),

    changePasswordBindingModel: Joi.object().keys({
        oldPassword: Joi.string().max(256).required(),
        newPassword: Joi.string().max(256).required()
    }),

    userIdBindingModel: Joi.object().keys({
        id: Joi.string().max(256).required()
    })

};

/**
 *  UserType validation models
 */
export const userTypeSchemas = {
    userTypeBindingModel: Joi.object().keys({
        name: Joi.string().max(256).required()
    }),

    userTypeIdBindingModel: Joi.object().keys({
        id: Joi.string().max(256).required()
    })
};

/**
 *  StartTime validation models
 */
export const startTimeSchemas = {
    startTimeBindingModel: Joi.object().keys({
        time: Joi.date().required(),
        dayOfWeek: Joi.number().min(0).max(6).required(),
        day: Joi.string().max(20)
    })
};

/**
 *  BusLine validation models
 */
export const busLineSchemas = {
    postBusLineBindingModel: Joi.object().keys({
        name: Joi.string().max(256).required(),
        description: Joi.string().max(256).required(),
        busLineTypeId: Joi.string().max(256).required(),
        timetable: Joi.array().items(startTimeSchemas.startTimeBindingModel),
        busLineStations: Joi.array()
    }),

    putBusLineBindingModel: Joi.object().keys({
        _id: Joi.string().max(256).required(),
        name: Joi.string().max(256).required(),
        description: Joi.string().max(256).required(),
        busLineTypeId: Joi.string().max(256).required(),
        timetable: Joi.array(),
        busLineStations: Joi.array(),
        rowVersion: Joi.number().min(0).required()
    }),

    busLineIdBindingModel: Joi.object().keys({
        id: Joi.string().max(256).required()
    }),

    filterBusLinesBindingModel: Joi.object().keys({
        busLineTypeId: Joi.string().max(256).required()
    })
};

/**
 *  BusLineType validation models
 */
export const busLineTypeSchemas = {
    busLineTypeBindingModel: Joi.object().keys({
        name: Joi.string().max(256).required()
    }),

    busLineTypeIdBindingModel: Joi.object().keys({
        id: Joi.string().max(256).required()
    })
};

/**
 *  TicketType validation models
 */
export const ticketTypeSchemas = {
    tickeTypeBindingModel: Joi.object().keys({
        name: Joi.string().max(256).required()
    }),

    ticketTypeIdBindingModel: Joi.object().keys({
        id: Joi.string().max(256).required()
    })
};

/**
 *  PriceList validation models
 */
export const priceListSchemas = {
    postPriceListBindingModel: Joi.object().keys({
        validFrom: Joi.date().required(),
        validUntil: Joi.date().required(),
        priceListItems: Joi.array()
    }),
    putPriceListBindingModel: Joi.object().keys({
        validFrom: Joi.date().required(),
        validUntil: Joi.date().required(),
        priceListItems: Joi.array(),
        rowVersion: Joi.number().min(0).required()
    }),
};

/**
 *  Ticket validation models
 */
export const ticketSchemas = {
    ticketValidationBindingModel: Joi.object().keys({
        time: Joi.date().required(),
        dayOfWeek: Joi.number().min(0).max(6).required(),
        day: Joi.string().max(20)
    })
};

/**
 *  Station validation models
 */
export const stationSchemas = {
    postStationBindingModel: Joi.object().keys({
        name: Joi.string().max(256).required(),
        address: Joi.string().max(256).required(),
        lat: Joi.number().required(),
        lon: Joi.number().required()
    }),

    putStationBindingModel: Joi.object().keys({
        _id: Joi.string().max(256).required(),
        name: Joi.string().max(256).required(),
        address: Joi.string().max(256).required(),
        lat: Joi.number().required(),
        lon: Joi.number().required(),
        rowVersion: Joi.number().min(0).required()
    }),

    stationIdBindingModel: Joi.object().keys({
        id: Joi.string().max(256).required()
    })
};

/**
 *  General validation models such as Id validation
 */
export const generalSchemas = {
    idBindingModel: Joi.object().keys({
        id: Joi.string().max(256).required()
    })
};


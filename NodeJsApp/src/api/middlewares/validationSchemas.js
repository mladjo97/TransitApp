import Joi from 'joi';

export const userSchemas = {
    postUserBindingModel: Joi.object().keys({
        firstName: Joi.string().max(256).required(),
        lastName: Joi.string().max(256).required(),
        username: Joi.string().max(256).required(),
        email: Joi.string().max(256).email({ minDomainAtoms: 2 }).required()
    }),

    putUserBindingModel: Joi.object().keys({
        _id: Joi.string().required(),
        firstName: Joi.string().max(256).required(),
        lastName: Joi.string().max(256).required(),
        username: Joi.string().max(256).required(),
        email: Joi.string().max(256).email({ minDomainAtoms: 2 }).required()
    }),

    userIdBindingModel: Joi.object().keys({
        id: Joi.string().max(256).required()
    })

};

import Joi from 'joi';

export const userSchemas = {
    userPOST: Joi.object().keys({
        firstName: Joi.string().max(256).required(),
        lastName: Joi.string().max(256).required(),
        username: Joi.string().max(256).required(),
        email: Joi.string().max(256).email({ minDomainAtoms: 2 }).required()
    })
};

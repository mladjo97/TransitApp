import Joi from 'joi';

const validationMiddleware = (schema, property) => {
    return (req, res, next) => {
        const { error } = Joi.validate(req[property], schema);        
        const valid = error == null;

        if (valid) { 
            next(); 
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            return res.status(400).json({ error: message });
        }
    }
}

export default validationMiddleware;
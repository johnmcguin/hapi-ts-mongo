import * as Joi from 'Joi';

export const authPayload = {
    payload: {
        username: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string().min(6).max(40)
    }
}

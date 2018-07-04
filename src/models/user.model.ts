import * as Joi from 'joi';
import { BaseModel, baseValidation } from "./base.model";

export type User = BaseModel & {
    username?: string,
    password: string,
    email: string
}

export const userValidation = baseValidation.keys({
    username: Joi.string().optional(),
    password: Joi.string().min(6).max(25),
    email: Joi.string().email()
});
import * as Joi from 'joi';
export const envValidationSchema = Joi.object({
    FB_TOKEN: Joi.string().required(),
    SECRET:Joi.string().required()
});

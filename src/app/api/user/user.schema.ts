import * as Joi from 'joi';

// Auth schemas
export const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
});

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
});

export const verifyEmailOTPSchema = Joi.object({
  otp: Joi.string().length(6).required(),
});

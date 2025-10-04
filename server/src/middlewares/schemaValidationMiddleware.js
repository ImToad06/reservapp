import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  birthdate: Joi.date().max("now").required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.number(),
});

export const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

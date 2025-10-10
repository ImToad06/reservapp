import Joi from "joi";

export const validateEmployee = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    type: Joi.string().valid("admin", "manager").required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

export const validateTable = (req, res, next) => {
  const schema = Joi.object({
    capacity: Joi.number().min(2).max(8).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

export const validateReserve = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    persons: Joi.number().min(1).required(),
    table: Joi.number().required(),
    date: Joi.date().min("now").max(Joi.ref("$maxDate")).required().messages({
      "date.min": "Reservation date cannot be in the past",
      "date.max": "Reservation date cannot be more than 30 days ahead",
    }),
  });
  let maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const { error } = schema.validate(req.body, {
    context: { maxDate },
  });
  if (error) {
    return res.status(400).json({
      message: "Date not valid",
      err,
    });
  }
};

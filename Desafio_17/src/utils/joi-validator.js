import joi from "joi";

const product = joi.object({
  title: joi.string().min(3).max(40).required(),
  description: joi.string().min(3).max(120).required(),
  thumbnail: joi.string().min(3).max(500).required(),
  code: joi.string().min(1).max(15).required(),
  price: joi.number().required(),
  stock: joi.number().required(),
  timestamp: joi.string().required(),
});

export const JOI_VALIDATOR = { product };

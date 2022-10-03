import joi from "joi";

const gamesSchema = joi.object({
  name: joi.string().trim().min(1).required(),
  image: joi.string().uri().required(),
  stockTotal: joi.number().integer().min(1).required(),
  pricePerDay: joi.number().integer().min(1).required(),
  categoryId: joi.number().integer().required(),
});

export { gamesSchema };

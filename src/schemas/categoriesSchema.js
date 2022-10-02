import joi from "joi";

const categorieSchema = joi.object({
  name: joi.string().trim().min(1).required(),
});

export { categorieSchema };

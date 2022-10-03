import joi from "joi";

const customersSchema = joi.object({
  name: joi.string().trim().min(1).required(),
  phone: joi
    .string()
    .trim()
    .min(10)
    .max(11)
    .pattern(new RegExp("[0-9]"))
    .required(),
  cpf: joi
    .string()
    .trim()
    .min(11)
    .max(11)
    .pattern(new RegExp("[0-9]"))
    .required(),
  birthday: joi.date().required(),
});

export { customersSchema };

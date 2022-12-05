const Joi = require("joi");
const mongoose = require("mongoose");
const scrapSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      default: "",
    },
    quantity: {
      type: Number,
      default: "",
    },

    status: {
      type: String,
      default: "",
    },
    userId: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: 0,
    },
    price: {
      type: Number,
      defautl: 0,
    },
  },
  { timestamps: true }
);

const Scrap = mongoose.model("Scrap", scrapSchema);

function validateAddScrap(body) {
  let schema = Joi.object({
    scrap: Joi.object({
      description: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number().required(),
      address: Joi.string().required(),
      category: Joi.string().required(),
    }).required(),
  });

  return schema.validate(body);
}
function validateUpdateScrap(body) {
  let schema = Joi.object({
    scrap: Joi.object({
      description: Joi.string().required(),
      quantity: Joi.number(),
      price: Joi.number(),
      address: Joi.string().required(),
      category: Joi.string(),
    }),
  }).required();

  return schema.validate(body);
}

module.exports = { Scrap, validateAddScrap, validateUpdateScrap };

const Joi = require("joi");
const mongoose = require("mongoose");
const scrapSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      default: "",
    },
    type: {
      type: String,
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
  },
  { timestamps: true }
);

const Scrap = mongoose.model("Scrap", scrapSchema);

function validateAddScrap(body) {
  let schema = Joi.object({
    quantity: Joi.number().required(),
    type: Joi.string().required(),
  });

  return schema.validate(body);
}
function validateUpdateScrap(body) {
  let schema = Joi.object({
    quantity: Joi.number(),
    type: Joi.string(),
  });

  return schema.validate(body);
}

module.exports = { Scrap, validateAddScrap, validateUpdateScrap };

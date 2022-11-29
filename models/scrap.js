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
    location: {
      latitude: 0.0,
      longitude: 0.0,
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
      type: Joi.string().required(),
      location: Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }).required(),
    }).required(),
  });

  return schema.validate(body);
}
function validateUpdateScrap(body) {
  let schema = Joi.object({
    scrap: Joi.object({
      description: Joi.string().required(),
      quantity: Joi.number(),
      type: Joi.string(),
      location: Joi.object({
        latitude: Joi.number(),
        longitude: Joi.number(),
      }),
    }),
  }).required();

  return schema.validate(body);
}

module.exports = { Scrap, validateAddScrap, validateUpdateScrap };

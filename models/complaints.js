const Joi = require("joi");
const mongoose = require("mongoose");

const complainSchema = new mongoose.Schema({
  subject: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  userId: {
    type: String,
    default: "",
  },
});

const Complain = mongoose.model("Complains", complainSchema);

function validateComplains(body) {
  let schema = Joi.object({
    description: Joi.string().required(),
    subject: Joi.string().required(),
  });

  return schema.validate(body);
}

module.exports = { Complain, validateComplains };

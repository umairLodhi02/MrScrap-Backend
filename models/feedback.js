const Joi = require("joi");
const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema(
  {
    text: {
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

const Feedback = mongoose.model("Feedback", feedbackSchema);

function validateFeedback(body) {
  let schema = Joi.object({
    text: Joi.string().required(),
  });

  return schema.validate(body);
}

module.exports = { Feedback, validateFeedback };

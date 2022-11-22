const Joi = require("joi");
const PORT = 5000;
const TOKEN_KEY = "MR.Scrap.GoGreen";

function validateObjectId(id) {
  const ObjectId = Joi.object({
    _id: Joi.binary().length(24),
  });

  return ObjectId.validate(id);
}
module.exports = { PORT, TOKEN_KEY, validateObjectId };

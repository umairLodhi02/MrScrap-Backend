const { User } = require("../models/user");

const { Feedback, validateFeedback } = require("../models/feedback");
const { ObjectID } = require("bson");

module.exports = {
  giveFeedback: async function (req, res) {
    const { error } = validateFeedback(req.body);

    if (error) {
      res.status(401).send({
        success: false,
        message: error.details[0].message,
        data: {},
      });
    } else {
      const { text } = req.body;
      const feedback = await Feedback.create({
        text: text,
        userId: req.userId,
      });
      if (feedback) {
        res.status(200).send({
          success: true,
          message: "Feedback given successfully!",
          data: {},
        });
      }
    }
  },
};

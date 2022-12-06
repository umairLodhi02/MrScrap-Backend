const { Complain, validateComplains } = require("../models/complaints");

module.exports = {
  giveComplain: async function (req, res) {
    const { error } = validateComplains(req.body);

    if (error) {
      res.status(401).send({
        success: false,
        message: error.details[0].message,
        data: {},
      });
    } else {
      const { subject, description } = req.body;
      const complain = await Complain.create({
        subject: subject,
        description: description,
        userId: req.userId,
      });
      if (complain) {
        const complainsList = await Complain.find({ userId: req.userId }).sort({
          createdAt: -1,
        });

        if (complainsList)
          res.status(200).send({
            success: true,
            message: "Complain given successfully!",
            data: { complains: complainsList },
          });
      }
    }
  },

  fetchComplainsByUserId: async function (req, res) {
    const complains = await Complain.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    if (complains) {
      res.status(200).send({
        success: true,
        message: "Complain Fetched Successfully",
        data: {
          complains,
        },
      });
    }
  },
  deleteComplainUser: async function (req, res) {
    const currentComplain = req.complain;

    let complain = await Complain.deleteOne({ _id: currentComplain._id });
    console.log(complain);
    if (complain.acknowledged && complain.deletedCount === 1) {
      let complains = await Complain.find({
        userId: currentComplain.userId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).send({
        success: true,
        message: "Complain Deleted Successfully!",
        data: { complains },
      });
    }
  },
};

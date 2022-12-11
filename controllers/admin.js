const { Scrap, validateScrapStatus } = require("../models/scrap");

const { User } = require("../models/user");
const { Complain } = require("../models/complaints");
const { Feedback } = require("../models/feedback");

module.exports = {
  getScraps: async function (req, res) {
    const data = await Scrap.find({}).sort({ createdAt: -1 });
    if (data) {
      res.status(200).send({
        success: true,
        message: "Scraps Fetched Successfully",
        data: {
          data,
        },
      });
    }
  },
  getUsers: async function (req, res) {
    const data = await User.find({}).sort({ createdAt: -1 });
    if (data) {
      res.status(200).send({
        success: true,
        message: "Users Fetched Successfully",
        data: {
          users: data,
        },
      });
    }
  },
  getComplains: async function (req, res) {
    const data = await Complain.find({}).sort({ createdAt: -1 });
    if (data) {
      res.status(200).send({
        success: true,
        message: "Complains Fetched Successfully",
        data: {
          complains: data,
        },
      });
    }
  },
  getFeedbacks: async function (req, res) {
    const data = await Feedback.find({}).sort({ createdAt: -1 });
    if (data) {
      res.status(200).send({
        success: true,
        message: "feedbacks Fetched Successfully",
        data: {
          feedbacks: data,
        },
      });
    }
  },
  changeStatus: async function (req, res) {
    const currentScrap = req.scrap;

    const { error } = validateScrapStatus(req.body);

    if (error) {
      res.status(401).send({
        success: false,
        message: error.details[0].message,
        data: {},
      });
    } else {
      currentScrap.status = req.body.status;

      const updatedScrap = await currentScrap.save();

      if (updatedScrap) {
        const user = await User.findOne({ _id: updatedScrap.userId });
        let scrapp = {
          ...updatedScrap,
          userName: user.username,
          userEmail: user.email,
        };
        if (scrapp) {
          res.status(200).send({
            success: true,
            message: "Scrap Updated Successfully",
            data: {
              scrap: scrapp,
            },
          });
        }
      }
    }
  },
};

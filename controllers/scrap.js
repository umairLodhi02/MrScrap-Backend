const { ObjectId } = require("mongodb");
const { validateObjectId } = require("../config/config");
const {
  Scrap,
  validateAddScrap,
  validateUpdateScrap,
} = require("../models/scrap");

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
  getSrapsByUserId: async function (req, res) {
    const data = await Scrap.find({ userId: req.providedUserId }).sort({
      createdAt: -1,
    });
    if (data.length !== 0) {
      res.status(200).send({
        success: true,
        message: "Scraps Fetched Successfully",
        data: {
          data,
        },
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Oops! Somthing went wrong!",
        data: {},
      });
    }
  },
  addScrap: async function (req, res) {
    const { error } = validateAddScrap(req.body);
    if (error) {
      res.status(401).send({
        success: false,
        message: error.details[0].message,
        data: {},
      });
    } else {
      const { scrap } = req.body;

      const newScrap = await Scrap.create({
        description: scrap.description,
        type: scrap.type,
        quantity: scrap.quantity,
        userId: req.userId,
        location: {
          latitude: scrap.location.latitude,
          longitude: scrap.location.longitude,
        },
      });

      if (newScrap) {
        const scraps = await Scrap.find({
          userId: new ObjectId(req.userId),
        }).sort({ createdAt: -1 });
        if (scraps.length !== 0) {
          res.status(200).send({
            success: true,
            message: "Scrap Added Successfully!",
            data: {
              scraps: scraps,
              newScrap: newScrap,
            },
          });
        }
      }
    }
  },

  updateScrap: async function (req, res) {
    const currentScrap = req.scrap;

    const { error } = validateUpdateScrap(req.body);
    if (error) {
      res.status(401).send({
        success: false,
        message: error.details[0].message,
        data: {},
      });
    } else {
      const { scrap } = req.body;

      currentScrap.description = scrap.description
        ? scrap.description
        : currentScrap.description;
      currentScrap.type = scrap.type ? scrap.type : currentScrap.type;
      currentScrap.quantity = scrap.quantity
        ? scrap.quantity
        : currentScrap.quantity;
      currentScrap.location.latitude = scrap.location.latitude;
      currentScrap.location.longitude = scrap.location.longitude;

      const updatedScrap = await currentScrap.save();

      res.status(200).send({
        success: true,
        message: "Scrap Updated Successfully",
        data: {
          scrap: {
            updatedScrap,
          },
        },
      });
    }
  },

  deleteScrap: async function (req, res) {
    const currentScrap = req.scrap;

    let scrap = await Scrap.deleteOne({ _id: currentScrap._id });
    if (scrap.acknowledged && scrap.deletedCount === 1) {
      let scraps = await Scrap.find({ userId: currentScrap.userId }).sort({
        createdAt: -1,
      });

      res.status(200).send({
        success: true,
        message: "Scrap Deleted Successfully!",
        data: { scraps },
      });
    }
  },
};
